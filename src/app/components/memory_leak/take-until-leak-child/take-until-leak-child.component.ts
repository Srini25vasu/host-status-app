import { Component, OnDestroy, OnInit } from '@angular/core';
import { TakeUntilLeakChildService } from '../../../services/take-until-leak-child.service';
import { BehaviorSubject, mergeMap, Observable, Subject, takeUntil } from 'rxjs';

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

  constructor(private readonly takeUntilLeakChildService: TakeUntilLeakChildService) {
    this.counterA$ = this.takeUntilLeakChildService.counterA$;
    this.counterB$ = this.takeUntilLeakChildService.counterB$;
  }

  ngOnInit(): void {
    this.counterA$.pipe(
      mergeMap((value) => { return this.counterB$ }),
      takeUntil(this.destroySubject)
    ).subscribe(value => console.log('Counter A:', value));
    this.counterB$.pipe(
      takeUntil(this.destroySubject),
      mergeMap((value) => { return this.counterA$ }),
    ).subscribe(value => console.log('Counter B:', value));
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}




