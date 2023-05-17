import { Component, OnInit } from '@angular/core';

import { Player } from '../models';
import { GameService, IPlayerOptionsResponse } from './services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  public player: Player;
  public computer: Player;
  public options: string[];

  constructor(private gameService: GameService) {
    this.player = new Player('Player 1 (You)', 'player', 'ryu.png');
    this.computer = new Player('CPU', 'computer', 'sagat.png');
    this.options = [];
  }

  ngOnInit() {
    this.gameService
      .getPlayerOptions()
      .subscribe(({ data }: IPlayerOptionsResponse) => (this.options = data));
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
    this.resetTurn();
  }

  private resetTurn() {
    this.player.choice = '';
    this.computer.choice = '';
  }
}
