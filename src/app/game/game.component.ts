import { Component, Input } from '@angular/core';

import { Player, PlayerOptions } from '../models';

interface GameChoices {
  player: string | null;
  computer: string | null;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent {
  public player: Player;
  public computer: Player;

  @Input() gameChoices: GameChoices;

  constructor() {
    this.gameChoices = { player: null, computer: 'Rock' }; // value for computer set for testing
    this.player = new Player('Player 1 (You)', 'player', 'ryu.png');
    this.computer = new Player('CPU', 'computer', 'sagat.png');
  }

  handlePlayerChoice(event: { type: string; value: string }): void {
    const { type, value } = event;
    this.gameChoices = { ...this.gameChoices, [type]: value };
  }

  submit() {
    if (!this.areChoicesValid()) return;

    this.computer.takeHit();
  }

  private areChoicesValid() {
    const values = Object.values(this.gameChoices);
    const possibleOptions = Object.keys(PlayerOptions);
    return values.every(
      (value) =>
        value !== null && value !== '' && possibleOptions.includes(value)
    );
  }
}
