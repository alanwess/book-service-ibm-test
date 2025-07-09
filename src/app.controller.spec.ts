import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockHealthCheck = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('ping service', () => {
    it('return "pong"', () => {
      expect(appController.ping()).toBe('pong');
    });
  });

  describe('healthcheck service', () => {
    it('return healthcheck status', () => {
      type responseHealthCheck = {
        status: string;
        uptime: number;
        timestamp: string;
      }

      const response = appController.healthcheck() as responseHealthCheck
     
      expect(response.status).toBe(mockHealthCheck.status);
    });
  });
});
