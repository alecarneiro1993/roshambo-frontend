import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IPlayerOptionsResponse {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getPlayerOptions(): Observable<IPlayerOptionsResponse> {
    return this.http.get<IPlayerOptionsResponse>(
      'http://localhost:8080/api/game/options'
    );
  }
}
