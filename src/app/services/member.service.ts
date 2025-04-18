import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  httpClient = inject(HttpClient);

  constructor() { }

  getAll(){
    return this.httpClient.get(environment.baseApiUrl + '/member');
  }

  register(form: any){
    return this.httpClient.post(environment.baseApiUrl + '/member', form);
  }

  exists(email: string) {
    return this.httpClient.head(environment.baseApiUrl + '/member', {
      params: { email }
    })
  }

   delete(id: number){
      return this.httpClient.delete(`${environment.baseApiUrl}/member/${id}`);
    }
}
