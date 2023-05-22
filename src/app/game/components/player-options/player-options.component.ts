import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Component that displays the available options
 * as buttons of the values ROCK, PAPER and SCISSOR.
 */
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

  /**
   * Constructor
   * Initializes variables
   */
  constructor() {
    this.playerType = '';
    this.currentChoice = '';
    this.options = [];
    this.isAbleToPlay = true;
  }

  /**
   * Function that emits an event with the player's choice
   * to the "father component" GameComponent
   *
   * @param type - either 'player' or 'computer''
   * @param value - one of the available Options.
   */
  handleChoice(type: string, value: string) {
    if (this.playerType !== 'player') return;

    this.setPlayerChoice.emit({
      type,
      value,
    });
  }
}
