import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpResourceComponent } from './http-resource.component';

describe('HttpResourceComponent', () => {
  let component: HttpResourceComponent;
  let fixture: ComponentFixture<HttpResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
