import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { GetItemsService } from '../services/get-items.service';
import { CategoryItems } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class BrandResolver implements Resolve<CategoryItems[]> {
  constructor(private brandService: GetItemsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoryItems[]> {
    const id = +route.params['id'];

    if (isNaN(id)) {
      this.router.navigate(['categories']);
      return EMPTY;
    }

    return this.brandService.getItemsInCategory(id).pipe(
      catchError(() => {
        this.router.navigate(['categories']);
        return EMPTY;
      })
    );
  }
}
