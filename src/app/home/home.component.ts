import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component that welcomes the user to the game
 * Shows a prompt to press ENTER to start the game
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private _router: Router) {}

  /**
   * Redirects the user to the GameComponent
   * if the user presses down ENTER key
   */
  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown() {
    this._router.navigate(['game']);
  }
}
