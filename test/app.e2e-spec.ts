import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/');
    expect(result.status).toBe(404);
  });

  it('/game (POST)', async () => {
    const result = await request(app.getHttpServer()).post('/game');
    expect(result.status).toBe(201);
  });

  it('/game/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/game');
    expect(result.status).toBe(200);
  });

  it('/game/id (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/game/21');
    expect(result.status).toBe(200);
  });

  it('/game/id (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/game/22');
    expect(result.status).toBe(204);
  });

  it('/game/id (GET) - should throws bad request when pass invalid query params', async () => {
    const result = await request(app.getHttpServer()).get(
      '/game/?limit=11&offset=0',
    );
    expect(result.status).toBe(400);
  });
});
