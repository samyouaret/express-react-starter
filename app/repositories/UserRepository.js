const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');

class UserRepository {

    async hash(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async create(user) {
        let hash = await this.hash(user.password);
        user.password = hash;
        return sequelize.models.User.create(user);
    }

    async authenticate(email, password) {
        return new Promise(async (resolve, reject) => {
            const user = await this.findByEmail(email);
            if (user) {
                try {
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        return resolve(user);
                    }
                    // wrong password
                    return reject({
                        error: "error with credentials given"
                    });
                } catch (err) {
                    reject({
                        error: "something went wrong"
                    });
                    // this error should be logged to developer
                    console.log(err);
                }
            } else {
                // user not found
                return reject({
                    error: "error with credentials given"
                });
            }
        });
    }

    // fix user is created even if email exists
    async findOrCreate({
        firstname,
        lastname,
        email,
        password
    }) {

        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.findByEmail(email)
                if (user) {
                    reject({
                        error: "email elready taken",
                    });
                    return;
                }
            } catch (err) {
                reject({
                    error: "oops something wrong happen",
                })
                return;
            }
            this.create({
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    password: password,
                    email_confirmed: 0
                }).then(resolve)
                .catch(reject);
        });
    }

    async findByEmail(email) {
        return sequelize.models.User.findOne({
            where: {
                email
            },
            raw: true
        });
    }

    async findById(id) {
        return sequelize.models.User.findOne({
            where: {
                id
            }
        });
    }
}

module.exports = UserRepository;