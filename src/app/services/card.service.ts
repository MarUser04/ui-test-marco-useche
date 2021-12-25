import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Environment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  fetchData() {
    return this.http.get(environment.API_URL);
  }

  vote(id: string, voteStatus: string) {
    return this.http.post(`http://localhost:4000/api/controversial/vote/${id}`, { voteStatus });
  }
}
