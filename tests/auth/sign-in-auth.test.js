const connection = require('../../app/sequelize');
const fakeUser = require('../fakers/user');

beforeAll((done) => {
    app.init();
    done();
});

afterAll(done => {
    connection.close();
    done()
});

describe('authentication actions', () => {
    it('should authenticate user', (done) => {
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
                done();
            });
    });

    it('should fail to authenticate with invalid credentials', (done) => {
        const credentials = {
            email: "",
            password: ''
        };
        request.agent(app.getServer())
            .post('/signin')
            .send(urlencode(credentials))
            .expect(302)
            // this back location 
            .expect('Location', '/')
            .end((err, res) => {
                expect(err).toBeNull();
                done();
            });
    });

});