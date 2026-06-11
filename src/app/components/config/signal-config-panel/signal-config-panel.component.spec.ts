import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalConfigPanelComponent } from './signal-config-panel.component';

describe('SignalConfigPanelComponent', () => {
  let component: SignalConfigPanelComponent;
  let fixture: ComponentFixture<SignalConfigPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalConfigPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
