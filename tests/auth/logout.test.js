const connection = require('../../app/sequelize');
const fakeUser = require('../fakers/user');
let redisClient = require('../../app/redis-client');

beforeAll((done) => {
    app.init();
    done();
});

afterAll(async () => {
    await connection.close();
    // setTimeout(() => process.exit(), 1000)
    redisClient.quit();
});

describe('logout actions', () => {
    it('should logout user', (done) => {
        let user = Object.assign({}, fakeUser);
        const credentials = {
            email: user.email,
            password: user.password
        };
        request.agent(app.getServer())
            .post('/signin')
            .send(urlencode(credentials))
            .expect(302)
            .expect('Location', '/home')
            .end((err, res) => {
                expect(err).toBeNull();
                let loginCookie = res.headers['set-cookie'];
                request.agent(app.getServer())
                    .post('/logout')
                    .set('cookie', loginCookie)
                    .expect(302)
                    .expect('Location', '/')
                    .end((error, response) => {
                        let resCookie = response.headers['set-cookie'];
                        expect(error).toBeNull();
                        expect(resCookie).toBeUndefined();
                        done();
                    });
            });
    });
    
    it('should redirect guest to signin page', (done) => {
        request.agent(app.getServer())
            .post('/logout')
            .expect(302)
            .expect('Location', '/signin')
            .end((err, res) => {
                expect(err).toBeNull();
                done();
            });
    });

});
