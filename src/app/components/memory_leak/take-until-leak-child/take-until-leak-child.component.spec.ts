import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeUntilLeakChildComponent } from './take-until-leak-child.component';

describe('TakeUntilLeakChildComponent', () => {
  let component: TakeUntilLeakChildComponent;
  let fixture: ComponentFixture<TakeUntilLeakChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeUntilLeakChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeUntilLeakChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
