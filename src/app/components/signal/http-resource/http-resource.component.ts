import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HttpResourceService } from '../../../services/http-resource.service';

@Component({
  selector: 'app-http-resource',
  imports: [JsonPipe],
  templateUrl: './http-resource.component.html',
  styleUrl: './http-resource.component.scss'
})
export class HttpResourceComponent {
  httpResourceService = inject(HttpResourceService);
  id = signal(1);
  personResource = this.httpResourceService.getPersonResource(() => String(this.id()));
}


