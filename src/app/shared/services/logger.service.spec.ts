import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  describe('logging methods', () => {
    const msg = 'msg';

    it('logs a message', () => {
      const spy = spyOn(console, 'log');
      service.log(msg);
      expect(spy).toHaveBeenCalledWith(msg);
    });

    it('logs a warning', () => {
      const spy = spyOn(console, 'warn');
      service.warn(msg);
      expect(spy).toHaveBeenCalledWith(msg);
    });

    it('logs an error', () => {
      const spy = spyOn(console, 'error');
      service.error(msg);
      expect(spy).toHaveBeenCalledWith(msg);
    });
  });
});
