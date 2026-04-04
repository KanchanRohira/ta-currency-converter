import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API info object', () => {
      const result = appController.getApiInfo();
      expect(result).toHaveProperty('status', 'success');
      expect(result).toHaveProperty('message', 'Currency Converter API is running');
      expect(result).toHaveProperty('version', '1.0.0');
      expect(result).toHaveProperty('endpoints');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('health', () => {
    it('should return health status', () => {
      const result = appController.getHealth();
      expect(result).toHaveProperty('status', 'healthy');
      expect(result).toHaveProperty('service', 'currency-converter-api');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('timestamp');
    });
  });
});
