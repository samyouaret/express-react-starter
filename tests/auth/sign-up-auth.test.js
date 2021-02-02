const connection = require('../../app/sequelize');
const UserRepository = require('../../app/repositories/UserRepository');
const userRepo = new UserRepository();
const fakeUser = require('../fakers/user');
const redisClient = require('../../app/redis-client');

beforeAll((done) => {
    app.init();
    done();
});

afterAll(async () => {
    await connection.close();
    // setTimeout(() => process.exit(), 1000)
    redisClient.quit();
});

describe('signing up a new user actions', () => {

    it('should signup a new user', (done) => {
        const user = {
            firstname: fakeUser.firstName,
            lastname: fakeUser.lastName,
            email: "testemail@mail.com",
            password: fakeUser.password,
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/home')
            .end(function (err, res) {
                // res.should.have.status(200);
                // let cookie = res.headers['set-cookie'];
                expect(err).toBeNull();
                userRepo.findByEmail(fakeUser.email)
                    .then(user => {
                        expect(user).not.toBeNull();
                        done();
                    });
            });
    });

    it('should fail signup a with taken user', (done) => {
        const user = {
            firstname: fakeUser.firstName,
            lastname: fakeUser.lastName,
            email: fakeUser.email,
            password: fakeUser.password,
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/home')
            .end(function (err, res) {
                expect(err).not.toBeNull();
                done();
            });
    });

    it('should fail signup with empty fields', (done) => {
        const user = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });

    it('should fail signup with invalid email', (done) => {
        const user = {
            firstname: fakeUser.firstName,
            lastname: fakeUser.lastName,
            email: 'invalidemail',
            password: fakeUser.password,
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });
    it('should fail signup when passowrd length less than 8', (done) => {
        const user = {
            firstname: fakeUser.firstName,
            lastname: fakeUser.lastName,
            email: fakeUser.lastName,
            password: 'abc123',
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });
});