import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface IResponse {
  data: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getPlayerOptions(): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .get<IResponse>('http://localhost:8080/api/game/options')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      );
  }

  getPlayers(): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .get<IResponse>('http://localhost:8080/api/game/players')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      );
  }

  resolveGameTurn(
    playerChoice: string
  ): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .post<IResponse>('http://localhost:8080/api/game/resolve', {
        playerChoice,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      );
  }
  resetGame(): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .post<IResponse>('http://localhost:8080/api/game/reset', {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      );
  }
}
