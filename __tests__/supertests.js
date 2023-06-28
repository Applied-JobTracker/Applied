const supertest = require('supertest');
const app = require('../server/server');
const request = supertest(app);

describe('Server Tests', () => {
  xdescribe('Invalid Enpoint', () => {
    test('Should respond with status 404', async () => {
      request.get('/invalid').expect(404);
    });
  });

  xdescribe('Get apps', () => {
    test('Should respond with status 200', async () => {
      request.get('/apps/1').expect('Content-Type', /json/).expect(200);
    });
  });

  xdescribe('Add app', () => {
    test('Should respond with status 200 and JSON object', async () => {
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

  xdescribe('Update app', () => {
    test('Should respond with status 200 and JSON object', async () => {
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
    test('Should respond with status 204', async () => {
      request.delete('/apps/1').expect(204);
    });
  });
});
