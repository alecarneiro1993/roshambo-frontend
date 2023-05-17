import { Component } from '@angular/core';

import { Player } from '../models';
import { TurnResolverService } from './services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent {
  public player: Player;
  public computer: Player;

  constructor(private turnService: TurnResolverService) {
    this.player = new Player('Player 1 (You)', 'player', 'ryu.png');
    this.computer = new Player('CPU', 'computer', 'sagat.png');
  }

  handlePlayerChoice(event: { type: string; value: string }): void {
    const { type, value } = event;

    if (type === 'player') {
      this.player.choice = value;
    } else {
      this.computer.choice = value;
    }
  }

  submit() {
    this.computer.choice = 'Rock';
    this.turnService.resolve(this.player, this.computer);
    this.resetTurn();
  }

  private resetTurn() {
    this.player.choice = '';
    this.computer.choice = '';
  }
}
