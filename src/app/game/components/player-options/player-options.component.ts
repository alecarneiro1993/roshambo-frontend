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
  @Input() isAbleToPlay: boolean;

  @Output() setPlayerChoice: EventEmitter<{ type: string; value: string }> =
    new EventEmitter<{ type: string; value: string }>();

  constructor() {
    this.playerType = '';
    this.currentChoice = '';
    this.options = [];
    this.isAbleToPlay = true;
  }

  handleChoice(type: string, value: string) {
    if (this.playerType !== 'player') return; // guard clause

    this.setPlayerChoice.emit({
      type,
      value,
    });
  }
}
