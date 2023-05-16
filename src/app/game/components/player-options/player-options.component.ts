import { Component, Input, EventEmitter, Output } from '@angular/core';

export enum PlayerOptions {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissor = 'Scissor',
}

@Component({
  selector: 'app-player-options',
  templateUrl: './player-options.component.html',
  styleUrls: ['./player-options.component.sass'],
})
export class PlayerOptionsComponent {
  public options: Array<string>;

  @Input() playerType: string;
  @Input() currentChoice: string;

  @Output() setPlayerChoice: EventEmitter<{ type: string; value: string }> =
    new EventEmitter<{ type: string; value: string }>();

  constructor() {
    this.options = Object.keys(PlayerOptions);
    this.playerType = '';
    this.currentChoice = '';
  }

  handleChoice(value: string) {
    if (this.playerType === 'computer') return; // guard clause

    this.setPlayerChoice.emit({
      type: this.playerType,
      value,
    });
  }
}
