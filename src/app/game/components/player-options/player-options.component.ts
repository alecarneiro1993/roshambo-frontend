import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player-options',
  templateUrl: './player-options.component.html',
  styleUrls: ['./player-options.component.sass'],
})
export class PlayerOptionsComponent {
  @Input() playerType: string;
  @Input() currentChoice: string;
  @Input() options: string[];

  @Output() setPlayerChoice: EventEmitter<{ value: string }> =
    new EventEmitter<{ value: string }>();

  constructor() {
    this.playerType = '';
    this.currentChoice = '';
    this.options = [];
  }

  handleChoice(value: string) {
    if (this.playerType === 'computer') return; // guard clause

    this.setPlayerChoice.emit({
      value,
    });
  }
}
