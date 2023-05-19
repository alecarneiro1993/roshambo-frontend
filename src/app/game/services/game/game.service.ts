import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IResponse {
  data: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getPlayerOptions(): Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:8080/api/game/options');
  }

  getPlayers(): Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:8080/api/game/players');
  }

  resolveGameTurn(playerChoice: string): Observable<IResponse> {
    return this.http.post<IResponse>('http://localhost:8080/api/game/resolve', {
      playerChoice,
    });
  }
  resetGame(): Observable<IResponse> {
    return this.http.post<IResponse>(
      'http://localhost:8080/api/game/reset',
      {}
    );
  }
}
