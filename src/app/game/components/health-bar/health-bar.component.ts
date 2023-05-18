import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.sass'],
})
export class HealthBarComponent {
  @Input() currentHealth: string;

  constructor() {
    this.currentHealth = '';
  }
}
