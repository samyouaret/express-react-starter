const connection = require('../../app/sequelize');
const UserRepository = require('../../app/repositories/UserRepository');
const userRepo = new UserRepository();
const VerifyEmailRepository = require('../../app/repositories/VerifyEmailRepository');
const VerifyEmailRepo = new VerifyEmailRepository();
const fakeUser = require('../fakers/user');
const faker = require('../../utils/faker');

beforeAll((done) => {
    app.init();
    done();
});

afterAll(async () => {
    await connection.close();
    // setTimeout(() => process.exit(), 1000)
});

describe('verify email actions', () => {

    it('should create verification token for given email', (done) => {
        let userData = Object.assign({}, fakeUser);
        delete userData.id;
        userData.email = faker.email();
        userData.email_confirmed = 0;
        userRepo.create(userData).then(async (user) => {
            let data = await VerifyEmailRepo.createToken(user.email);
            expect(data.token).toBeDefined();
            expect(data.signature).toBeDefined();
            done();
        });
    });

    it('should verify email after registering user', (done) => {
        let userData = Object.assign({}, fakeUser);
        delete userData.id;
        userData.email = faker.email();
        userData.email_confirmed = 0;
        userRepo.create(userData).then(async (user) => {
            let data = await VerifyEmailRepo.createToken(user.email);
            expect(data.token).toBeDefined();
            expect(data.signature).toBeDefined();
            let message = await VerifyEmailRepo
                .verifyToken(data.token, data.signature);
            expect(message).toEqual({
                message: "account verified successfully"
            });
            let instance = await connection.models.VerifyEmail.findOne({
                where: {
                    token: data.token,
                    email: userData.email
                }
            });
            expect(instance).toBeNull();
            done();
        });
    });

    it('should fail to verify email with empty token', (done) => {
        let userData = Object.assign({}, fakeUser);
        delete userData.id;
        userData.email = faker.email();
        userData.email_confirmed = 0;
        userRepo.create(userData).then(async (user) => {
            let data = await VerifyEmailRepo.createToken(user.email);
            VerifyEmailRepo.verifyToken("", data.signature)
                .catch((message) => {
                    expect(message).toEqual({
                        message: "invalid token provided"
                    });
                });
            let instance = await connection.models.VerifyEmail.findOne({
                where: {
                    token: data.token,
                    email: userData.email
                }
            });
            expect(instance).not.toBeNull();
            done();
        });
    });


});