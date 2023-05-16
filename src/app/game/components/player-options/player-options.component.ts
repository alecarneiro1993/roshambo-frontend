import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player-options',
  templateUrl: './player-options.component.html',
  styleUrls: ['./player-options.component.sass'],
})
export class PlayerOptionsComponent {
  public options: Array<string>;

  @Input() playerType: string;
  @Input() currentChoice: string;

  @Output() sendChoice: EventEmitter<{ type: string; value: string }> =
    new EventEmitter<{ type: string; value: string }>();

  constructor() {
    this.options = ['Rock', 'Paper', 'Scissor'];
    this.playerType = '';
    this.currentChoice = '';
  }

  handleChoice(value: string) {
    if (this.playerType === 'computer') return; // guard clause

    this.sendChoice.emit({
      type: this.playerType,
      value,
    });
  }
}
