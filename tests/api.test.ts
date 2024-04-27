import request from 'supertest';
import { app, server } from "../src/index";
import { failedConstraintsDescription } from '../src/controllers/MixController';

describe('POST /mix', () => {
  afterAll(() => {
    server.close();
  })

  it('should mix jugs and return result', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 2, jugY: 10, targetVolume: 4 });
    expect(response.status).toBe(200);
  });

  it('should return 400 if jugX capacity is zero', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 0, jugY: 10, targetVolume: 4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(failedConstraintsDescription);
  });

  it('should return 400 if jugX capacity is negative', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: -1, jugY: 10, targetVolume: 4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(failedConstraintsDescription);
  });

  it('should return 400 if jugY capacity is zero', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 2, jugY: 0, targetVolume: 4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(failedConstraintsDescription);
  });

  it('should return 400 if jugY is negative', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 2, jugY: -1, targetVolume: 4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(failedConstraintsDescription);
  });

  it('should return 400 if targetVolume is zero', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 2, jugY: 10, targetVolume: 0 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(failedConstraintsDescription);
  });

  it('should return 400 if targetVolume is negative', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 2, jugY: 10, targetVolume: -1 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(failedConstraintsDescription);
  });
});
