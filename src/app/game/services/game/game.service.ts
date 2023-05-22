import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface IResponse {
  data: Record<string, unknown>;
}

/**
 * Service that sends game related requests to the API
 * with prefix "/api/game/*"
 */
@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  /**
   * GET Request made when first preparing the Game to fetch
   * available options
   */
  getPlayerOptions(): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .get<IResponse>('http://localhost:8080/api/game/options')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      );
  }

  /**
   * GET Request made when first preparing the Game to fetch
   * players
   */
  getPlayers(): Observable<IResponse | HttpErrorResponse> {
    return this.http
      .get<IResponse>('http://localhost:8080/api/game/players')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      );
  }

  /**
   * POST Request made every time the user chooses an option and
   * clicks on the "FIGHT" button
   */
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

  /**
   * POST Request made when the user clicks on the "RESET" button
   */
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
