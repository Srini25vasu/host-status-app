import { TestBed } from '@angular/core/testing';

import { HttpResourceService } from './http-resource.service';

describe('HttpResourceService', () => {
  let service: HttpResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
