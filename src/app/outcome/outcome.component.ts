import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WinnerService } from '../shared/services';

/**
 * Component that shows the Winner of the game
 * and prompts the user to play again
 */
@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.sass'],
})
export class OutcomeComponent implements OnInit {
  public winner: string | null;

  /**
   * Constructor
   * Initializes the winner variable through the WinnerService
   */
  constructor(private router: Router, private winnerService: WinnerService) {
    this.winner = winnerService.getWinner();
  }

  /**
   * Redirects the user to the homepage in case he tries to access /outcome
   * without a winner being defined
   */
  ngOnInit() {
    !this.winner && this.router.navigate(['/']);
  }

  /**
   * Redirects the user to the homepage
   */
  restartGame() {
    this.router.navigate(['/']);
  }
}
