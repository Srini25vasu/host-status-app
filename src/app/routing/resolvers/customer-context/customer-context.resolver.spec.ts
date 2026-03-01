import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomerContextResolver } from './customer-context.resolver';

describe('CustomerContextResolver', () => {
  let resolver: CustomerContextResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    resolver = TestBed.inject(CustomerContextResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
