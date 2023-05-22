import { Injectable } from '@angular/core';

/**
 * Service that records who was the winner of the game
 *
 * Initially, the winner was done by queryParams but
 * later switched to this option to prevent finishing the game
 * by tampering with the queryParams in the url.
 *
 * The winner is set in GameComponent, during the
 * resolve of a Turn, provided that the game has ended
 */
@Injectable()
export class WinnerService {
  private winner: string | null;

  constructor() {
    this.winner = null;
  }

  /**
   * Getter
   */
  getWinner() {
    return this.winner;
  }

  /**
   * Setter
   */
  setWinner(winner: string) {
    this.winner = winner;
  }
}
