import { TestBed } from '@angular/core/testing';

import { WinnerService } from './winner.service';

describe('WinnerService', () => {
  let service: WinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinnerService],
    });
    service = TestBed.inject(WinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
