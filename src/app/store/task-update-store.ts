import { inject, Injectable } from "@angular/core";
import { TaskUpdateService } from "../services/updates/task-update.service";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TaskUpdateStore {
  readonly taskService = inject(TaskUpdateService);

}
