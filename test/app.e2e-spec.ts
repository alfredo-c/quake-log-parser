import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
  });

  it('/game/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/game')
      .expect(200)
  });

  it('/game/id (GET)', () => {
    return request(app.getHttpServer())
      .get('/game/21')
      .expect(200)
  });

  it('/game/id (GET)', () => {
    return request(app.getHttpServer())
      .get('/game/22')
      .expect(204)
  });
});
