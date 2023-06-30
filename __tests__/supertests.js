const supertest = require('supertest');
const app = require('../server/server');
const request = supertest(app);

describe('Server Tests', () => {
  xdescribe('Invalid Enpoint', () => {
    test('Should respond with status 404', () => {
      request.get('/invalid').expect(404);
    });
  });

  //should have an empty body when retrieving apps for an account that has no apps and a 200 status
  describe('Get apps', () => {
    test('Should respond with status 200 and undefined body', async () => {
      const response = await request.get('/apps/22');
      expect(response.body[0]).toBeUndefined();
    });
  });

  //should have a json object and 200 status when retrieving apps for an account that has apps saved
  describe('Get apps', () => {
    test('Should respond with status 200', () => {
      request.get('/apps/1').expect('Content-Type', /json/).expect(200);
    });
  });

  describe('Add app', () => {
    test('Should respond with status 200 and JSON object', () => {
      request
        .post('/apps')
        .send({
          company_name: 'whatever',
          date: '06/28/2023',
          app_form: 'codesmith',
          stack: 'full',
          progress: 'no response',
          user_id: '1',
        })
        .expect(201);
    });
  });

  describe('Update app', () => {
    test('Should respond with status 200 and JSON object', () => {
      request
        .post('/apps/1')
        .send({
          company_name: 'whatever',
          date: '06/28/2022',
          app_form: 'codesmith',
          stack: 'backend',
          progress: 'no response',
          user_id: '1',
        })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Delete app', () => {
    test('Should respond with status 204', () => {
      request.delete('/apps/1').expect(204);
    });
  });

  //should successfully create an account with unique username
  describe('Successful sign Up', () => {
    test('Should respond with status 200 and JSON object', () => {
      request
        .post('/user/create')
        .send({
          username: 'testSignUp',
          password: 'Testpassword1!',
        })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  //should fail to create an account since username is already taken and password does not meet the requirements
  describe('Unsuccessful sign Up', () => {
    test('Should respond with status 406', () => {
      request
        .post('/user/create')
        .send({
          username: 'testSignUp',
          password: 'testpassword',
        })
        .expect(406);
    });
  });

  //should succesfully login when provided with correct login credentials
  describe('Successful login', () => {
    test('Should respond with status 200 and JSON object', () => {
      request
        .post('/user/login')
        .send({
          username: 'testSignUp',
          password: 'Testpassword1!',
        })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Unsuccessful login (no password)', () => {
    test('Should respond with status 401', () => {
      request
        .post('/user/login')
        .send({
          username: 'testSignUp',
          password: '',
        })
        .expect(401);
    });
  });
});
