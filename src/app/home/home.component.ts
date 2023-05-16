import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private _router: Router) {}

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown() {
    this._router.navigate(['game']);
  }
}
