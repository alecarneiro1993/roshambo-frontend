import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.sass'],
})
export class OutcomeComponent implements OnInit {
  public winner: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.winner = route.snapshot.queryParams['winner'];
  }

  ngOnInit() {
    !this.winner && this.router.navigate(['/']);
  }

  restartGame() {
    this.router.navigate(['/']);
  }
}
