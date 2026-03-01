import { TestBed } from '@angular/core/testing';

import { TakeUntilLeakChildService } from './take-until-leak-child.service';

describe('TakeUntilLeakChildService', () => {
  let service: TakeUntilLeakChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeUntilLeakChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
