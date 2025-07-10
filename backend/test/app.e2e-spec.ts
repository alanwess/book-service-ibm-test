import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET ping)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('pong');
  });

  it('/healthcheck', () => {
    type responseHealthCheck = {
      status: string;
      uptime: number;
      timestamp: string;
    }

    request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect((res) => {
        const response = res.body as responseHealthCheck
        
        expect(response.status).toBe('ok');
      });
  })
});
