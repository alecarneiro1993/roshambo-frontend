import { Injectable } from '@angular/core';

@Injectable()
export class WinnerService {
  private winner: string | null;

  constructor() {
    this.winner = null;
  }

  getWinner() {
    return this.winner;
  }

  setWinner(winner: string) {
    this.winner = winner;
  }
}
