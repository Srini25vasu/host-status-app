import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card [title]="title" [subtitle]="subtitle" [cardClass]="cardClass"
              [headerClass]="headerClass" [bodyClass]="bodyClass" [footerClass]="footerClass">
      <div card-header>Custom Header Content</div>
      <div card-body>Test Body Content</div>
      <div card-footer>Test Footer Content</div>
    </app-card>
  `
})
class TestHostComponent {
  title: string = '';
  subtitle: string = '';
  cardClass: string = '';
  headerClass: string = '';
  bodyClass: string = '';
  footerClass: string = '';
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, TestHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Basic Component', () => {
    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render basic card structure', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('.card')).toBeTruthy();
      expect(compiled.querySelector('.card-header')).toBeTruthy();
      expect(compiled.querySelector('.card-body')).toBeTruthy();
      expect(compiled.querySelector('.card-footer')).toBeTruthy();
    });
  });

  describe('Title and Subtitle', () => {
    it('should render title when provided', () => {
      hostComponent.title = 'Test Card Title';
      hostFixture.detectChanges();

      const titleElement = hostFixture.nativeElement.querySelector('.card-title');
      expect(titleElement).toBeTruthy();
      expect(titleElement.textContent.trim()).toBe('Test Card Title');
    });

    it('should render subtitle when provided', () => {
      hostComponent.subtitle = 'Test Card Subtitle';
      hostFixture.detectChanges();

      const subtitleElement = hostFixture.nativeElement.querySelector('.card-subtitle');
      expect(subtitleElement).toBeTruthy();
      expect(subtitleElement.textContent.trim()).toBe('Test Card Subtitle');
    });

    it('should render both title and subtitle together', () => {
      hostComponent.title = 'Main Title';
      hostComponent.subtitle = 'Secondary Title';
      hostFixture.detectChanges();

      const titleElement = hostFixture.nativeElement.querySelector('.card-title');
      const subtitleElement = hostFixture.nativeElement.querySelector('.card-subtitle');

      expect(titleElement.textContent.trim()).toBe('Main Title');
      expect(subtitleElement.textContent.trim()).toBe('Secondary Title');
    });

    it('should not render title element when title is not provided', () => {
      hostComponent.title = '';
      hostFixture.detectChanges();

      const titleElement = hostFixture.nativeElement.querySelector('.card-title');
      expect(titleElement).toBeFalsy();
    });
  });

  describe('Content Projection', () => {
    it('should project header content', () => {
      hostFixture.detectChanges();

      const headerContent = hostFixture.nativeElement.querySelector('[card-header]');
      expect(headerContent).toBeTruthy();
      expect(headerContent.textContent.trim()).toBe('Custom Header Content');
    });

    it('should project body content', () => {
      hostFixture.detectChanges();

      const bodyContent = hostFixture.nativeElement.querySelector('[card-body]');
      expect(bodyContent).toBeTruthy();
      expect(bodyContent.textContent.trim()).toBe('Test Body Content');
    });

    it('should project footer content', () => {
      hostFixture.detectChanges();

      const footerContent = hostFixture.nativeElement.querySelector('[card-footer]');
      expect(footerContent).toBeTruthy();
      expect(footerContent.textContent.trim()).toBe('Test Footer Content');
    });
  });

  describe('CSS Classes', () => {
    it('should apply custom card class', () => {
      hostComponent.cardClass = 'custom-card-class';
      hostFixture.detectChanges();

      const cardElement = hostFixture.nativeElement.querySelector('.card');
      expect(cardElement.classList.contains('custom-card-class')).toBeTruthy();
    });

    it('should apply custom header class', () => {
      hostComponent.headerClass = 'custom-header-class';
      hostFixture.detectChanges();

      const headerElement = hostFixture.nativeElement.querySelector('.card-header');
      expect(headerElement.classList.contains('custom-header-class')).toBeTruthy();
    });

    it('should apply custom body class', () => {
      hostComponent.bodyClass = 'custom-body-class';
      hostFixture.detectChanges();

      const bodyElement = hostFixture.nativeElement.querySelector('.card-body');
      expect(bodyElement.classList.contains('custom-body-class')).toBeTruthy();
    });

    it('should apply custom footer class', () => {
      hostComponent.footerClass = 'custom-footer-class';
      hostFixture.detectChanges();

      const footerElement = hostFixture.nativeElement.querySelector('.card-footer');
      expect(footerElement.classList.contains('custom-footer-class')).toBeTruthy();
    });
  });

  describe('Input Properties', () => {
    it('should accept title input', () => {
      component.title = 'Input Title Test';
      expect(component.title).toBe('Input Title Test');
    });

    it('should accept subtitle input', () => {
      component.subtitle = 'Input Subtitle Test';
      expect(component.subtitle).toBe('Input Subtitle Test');
    });

    it('should accept all CSS class inputs', () => {
      component.cardClass = 'card-test';
      component.headerClass = 'header-test';
      component.bodyClass = 'body-test';
      component.footerClass = 'footer-test';

      expect(component.cardClass).toBe('card-test');
      expect(component.headerClass).toBe('header-test');
      expect(component.bodyClass).toBe('body-test');
      expect(component.footerClass).toBe('footer-test');
    });
  });

  describe('Conditional Rendering', () => {
    it('should show ng-container when title or subtitle is provided', () => {
      hostComponent.title = 'Test Title';
      hostFixture.detectChanges();

      const ngContainer = hostFixture.debugElement.query(By.css('ng-container'));
      expect(ngContainer).toBeTruthy();
    });

    it('should handle empty title and subtitle gracefully', () => {
      hostComponent.title = '';
      hostComponent.subtitle = '';
      hostFixture.detectChanges();

      const titleElement = hostFixture.nativeElement.querySelector('.card-title');
      const subtitleElement = hostFixture.nativeElement.querySelector('.card-subtitle');

      expect(titleElement).toBeFalsy();
      expect(subtitleElement).toBeFalsy();
    });
  });
});
