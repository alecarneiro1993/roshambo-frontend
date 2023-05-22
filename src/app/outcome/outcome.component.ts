import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WinnerService } from '../shared/services';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.sass'],
})
export class OutcomeComponent implements OnInit {
  public winner: string | null;

  constructor(private router: Router, private winnerService: WinnerService) {
    this.winner = winnerService.getWinner();
  }

  ngOnInit() {
    !this.winner && this.router.navigate(['/']);
  }

  restartGame() {
    this.router.navigate(['/']);
  }
}
