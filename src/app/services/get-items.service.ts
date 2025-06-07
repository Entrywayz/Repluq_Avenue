import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories, CategoryItem, NewItem, CategoryItems, AllItems } from '../models/models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {
  private readonly url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getNewItems(): Observable<NewItem[]> {
    return this.http.get<NewItem[]>(`${this.url}/new-items`);
  }

  getItemsInCategory(categoryId: number): Observable<CategoryItems[]> {
    return this.http.get<CategoryItems[]>(`${this.url}/items`).pipe(
      map(items => items.filter(item => item.category_id === categoryId))
    );
  }

  getCategory(id: number): Observable<CategoryItem> {
    return this.http.get<CategoryItem>(`${this.url}/${id}`);
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}/categories`);
  }

  getAllItems(): Observable<AllItems[]> {
    return this.http.get<AllItems[]>(`${this.url}/all`)
  }
}
