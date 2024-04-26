import request from 'supertest';
import { app, server } from "../src/index";

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

  it('should return 400 if jugX is negative', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: -5, jugY: 3, targetVolume: 4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'JugX, jugY, and targetVolume must be positive numbers' });
  });

  it('should return 400 if jugY is negative', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 5, jugY: -3, targetVolume: 4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'JugX, jugY, and targetVolume must be positive numbers' });
  });

  it('should return 400 if targetVolume is negative', async () => {
    const response = await request(app)
      .post('/mix')
      .send({ jugX: 5, jugY: 3, targetVolume: -4 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'JugX, jugY, and targetVolume must be positive numbers' });
  });
});
