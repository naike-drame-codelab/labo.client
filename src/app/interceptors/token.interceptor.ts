import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { catchError, from, mergeMap, of, tap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  
  let token = sessionService.session().token
  if(!token) {
    return next(req);
  }

  if(sessionService.session().exp < new Date()) {
    // from transformer une promise en observable
    return from(fetch('http://localhost:5166/api/refreshToken?token=' + token)
      .then(res => res.json())
    ).pipe(
      // side effect (opération supplémnetaire)
      tap(({token}) => sessionService.startSession(token)),
      // capturer une erreur de la requète de rafraichissement
      catchError(() => {
        sessionService.clearSession();
        return of()
      }),
      // effectuer une requete supplementaire
      mergeMap(({token}) => {
        const clone = req.clone({ setHeaders: {
          Authorization: 'Bearer ' + token
        } });
        return next(clone);
      })
    )
  }
  else {
    const clone = req.clone({ setHeaders: {
      Authorization: 'Bearer ' + sessionService.session().token
    } });
    return next(clone);
  }
};
