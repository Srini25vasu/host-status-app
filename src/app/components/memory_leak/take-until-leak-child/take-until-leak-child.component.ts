import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TakeUntilLeakChildService } from '../../../services/take-until-leak-child.service';
import { finalize, mergeMap, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-take-until-leak-child',
  imports: [],
  templateUrl: './take-until-leak-child.component.html',
  styleUrl: './take-until-leak-child.component.scss',
  standalone: true
})
export class TakeUntilLeakChildComponent implements OnInit, OnDestroy {

  counterA$;
  counterB$;

  destroySubject = new Subject();

  private readonly takeUntilLeakChildService = inject(TakeUntilLeakChildService);

  constructor() {
    this.counterA$ = this.takeUntilLeakChildService.counterA$;
    this.counterB$ = this.takeUntilLeakChildService.counterB$;
  }

  ngOnInit(): void {
    this.counterA$.pipe(
      mergeMap(() => this.counterB$),
      takeUntil(this.destroySubject),
      finalize(() => console.log('Counter A completed'))

    ).subscribe(value => console.log('Counter A:', value));
    this.counterB$.pipe(
      takeUntil(this.destroySubject),
      mergeMap(() => this.counterA$),
      finalize(() => console.log('Counter B completed'))
    ).subscribe(value => console.log('Counter B:', value));
  }

  ngOnDestroy(): void {
    console.log('Child component destroyed');
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
}




