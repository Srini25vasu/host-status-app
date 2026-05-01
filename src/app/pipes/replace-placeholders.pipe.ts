import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacePlaceholders'
})
export class ReplacePlaceholdersPipe implements PipeTransform {

  transform(): unknown {
    return null;
  }

}
