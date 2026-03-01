import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TakeUntilLeakChildService {
  counterA$ = interval(2000)
  counterB$ = interval(1000)

  constructor() { }
}
