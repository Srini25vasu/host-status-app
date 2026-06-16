import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnChanges, OnDestroy {
  @Input() visible = false;
  @Input() title = 'Notification';
  @Input() message = '';
  @Input() timestamp = 'now';
  @Input() autohide = true;
  @Input() delay = 3000;

  @Output() closed = new EventEmitter<void>();

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if ('visible' in changes || 'delay' in changes || 'autohide' in changes) {
      this.scheduleAutoHide();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  onClose(): void {
    this.visible = false;
    this.clearTimer();
    this.closed.emit();
  }

  private scheduleAutoHide(): void {
    this.clearTimer();

    if (!this.visible || !this.autohide || this.delay <= 0) {
      return;
    }

    this.hideTimer = setTimeout(() => {
      this.onClose();
    }, this.delay);
  }

  private clearTimer(): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

}
