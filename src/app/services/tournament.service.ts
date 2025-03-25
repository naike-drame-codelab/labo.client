import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  httpClient = inject(HttpClient);

  constructor() { }

  create(form: any){
    return this.httpClient.post(environment.baseApiUrl + '/tournament', form);
  }

  getAll(){
    return this.httpClient.get(`${environment.baseApiUrl}/tournament`);
  }

  getById(id: number){
    return this.httpClient.get(`${environment.baseApiUrl}/tournament/${id}`);
  }

  delete(id: number){
    return this.httpClient.delete(`${environment.baseApiUrl}/tournament/${id}`);
  }
}
