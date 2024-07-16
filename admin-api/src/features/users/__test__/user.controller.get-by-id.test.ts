import request from 'supertest';
import { app } from '#root/app';
import testUtils from '#test/test.utils';
import testApiUtils from '#test/test-api.utils';

describe('AuthController', () => {
  beforeAll(async () => {
    await testUtils.setupTestUsers();
  });

  afterAll(async () => {
    await testUtils.deleteAllTestUsers()
  });

  describe('GET /users', () => {
    const apiEndpoint = '/api/users';

    it('should not return any sensitive information for a user', async () => {
      const authorizationHeaderValue = await testApiUtils.loginWithTestUser();
      const response = await request(app)
        .get(apiEndpoint)
        .set('Authorization', authorizationHeaderValue)
        .expect(200);

      expect(response.body[0]?._id).toBeUndefined();
      expect(response.body[0]?.password).toBeUndefined();
    });
  });
});
