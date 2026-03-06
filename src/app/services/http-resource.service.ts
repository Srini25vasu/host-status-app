import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { z } from 'zod';

@Injectable({
  providedIn: 'root'
})
export class HttpResourceService {

  constructor() { }
 // https://stackblitz.com/edit/angular-resource-zod-blog?file=src%2Fmain.ts
  getPersonResource(userId: () => string | undefined) {
    return httpResource(
      () => {
        const id = userId();
        if (!id) {
          return undefined;
        }
        return { url: `https://swapi.dev/api/people/${id}` };
      },
      { parse: (value) => swPersonResourceSchema.parse(value) }
    );
  }
}
const swPersonResourceSchema = z.object({
  name: z.string(),
  height: z.coerce.number(),
  edited: z.string(),
  films: z.array(z.string()),
});
