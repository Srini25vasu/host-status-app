import { Component, computed, signal, viewChild } from '@angular/core';
import { SignalConfigPanelComponent } from '../../components/config/signal-config-panel/signal-config-panel.component';
import { CardComponent } from "../../shared/components/ui/card/card.component";

//https://www.codemag.com/Article/2511041/Angular-Signals-in-the-Real-World-Smarter-Inputs-and-Reactive-Routing
@Component({
  selector: 'app-dashboard',
  imports: [SignalConfigPanelComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  protected theme = signal<'light' | 'dark'>('light');
  protected userRole = signal('user');
  protected region = signal('EU');
  protected featureFlags = signal('featureX');

  configPanel = viewChild(SignalConfigPanelComponent);

  hasConfigPanel = computed(() => !!this.configPanel);
}
