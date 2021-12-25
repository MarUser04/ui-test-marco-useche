import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  fetchData() {
    return this.http.get('assets/data.json');
  }
}
