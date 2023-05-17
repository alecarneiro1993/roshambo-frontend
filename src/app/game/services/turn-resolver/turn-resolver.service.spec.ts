import { TestBed } from '@angular/core/testing';

import { TurnResolverService } from './turn-resolver.service';

describe('TurnResolverService', () => {
  let service: TurnResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
