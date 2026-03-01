import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePlaceholders'
})
export class ReplacePlaceholdersPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
