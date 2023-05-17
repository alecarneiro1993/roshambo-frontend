import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IResponse {
  data: string[] | object;
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

  getComputerChoice(): Observable<IResponse> {
    return this.http.get<IResponse>(
      'http://localhost:8080/api/game/computer/choice'
    );
  }
}
