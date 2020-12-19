const crypto = require('crypto');
const sequelize = require('../sequelize');

class VerifyEmailRepository {

    async createToken(email, minutes = 60) {
        return new Promise(async (resolve, reject) => {
            let token = crypto.createHash('sha1')
                .update(Math.floor(Math.random() * 1000) + "").digest('hex');
            try {
                await sequelize.models.VerifyEmail.create({
                    email,
                    token,
                    expireAt: new Date(Date.now() + minutes * 60000).toString()
                });
                resolve({
                    token,
                    signature: Buffer.from(email).toString('hex')
                })
            } catch (err) {
                reject(err);
            }
        });
    }

    async verifyToken(token = "", signature = "") {
        return new Promise(async (resolve, reject) => {
            if (token == "" || signature == "") {
                return reject({
                    message: "invalid token provided"
                });
            }
            let email = Buffer.from(signature, 'hex').toString('utf8');
            let instance = await sequelize.models.VerifyEmail.findOne({
                where: {
                    email,
                    token
                }
            });
            if (instance) {
                try {
                    // date comparison  as strings??
                    if (new Date(Date.now()).toString() > instance.expireAt.toString()) {
                        return reject({
                            message: "time expired"
                        });
                    }
                    await instance.destroy();
                    await sequelize.models.User.update({
                        email_confirmed: true
                    }, {
                        where: {
                            email
                        }
                    });
                    resolve({
                        message: "account verified successfully"
                    });
                } catch (err) {
                    reject(err);
                }
            } else {
                reject({
                    message: "cannot verify account or account already verified"
                });
            }
        });
    }

}

module.exports = VerifyEmailRepository;