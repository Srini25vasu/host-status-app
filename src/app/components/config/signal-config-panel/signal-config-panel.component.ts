import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CardComponent } from '../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-signal-config-panel',
  imports: [CardComponent],
  templateUrl: './signal-config-panel.component.html',
  styleUrl: './signal-config-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalConfigPanelComponent {
  showAdvanced = input<boolean>(false);
  theme = input<'light' | 'dark'>();
  userRole = input<string>();
  region = input<string>();
  featureFlags = input<string>();

  readonly isAdminView = computed(() => this.userRole() === 'admin');

  readonly isDarkTheme = computed(() => this.theme() === 'dark');

  readonly showExperimental = computed(() => this.showAdvanced() && this.userRole() === 'admin');

  readonly regionSupportsFeatureX = computed(() => this.featureFlags()?.includes('featureX') && this.region() === 'EU');



}
