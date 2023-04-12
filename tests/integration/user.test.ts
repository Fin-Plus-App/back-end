import app, { init } from '@/app';
import { conflictError } from '@/errors';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /user', () => {
  it('should respond with status 400 when body is not sent', async () => {
    const response = await server.post('/user');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/user').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it('should respond with status 409 when there is an user with given email', async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post('/user').send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(conflictError('There is already an user with given email!'));
    });

    it('should respond with status 201 and user data', async () => {
      const body = generateValidBody();

      const response = await server.post('/user').send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: body.email,
      });
    });
  });
});
