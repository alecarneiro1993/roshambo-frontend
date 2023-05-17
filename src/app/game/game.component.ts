import { Component, OnInit } from '@angular/core';

import { IPlayer, IChoice } from '../shared/interfaces';
import { PlayerOption } from '../shared/types';
import { GameService, IResponse } from './services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  public player: IPlayer;
  public computer: IPlayer;
  public options: PlayerOption[];
  public choices: IChoice;

  constructor(private gameService: GameService) {
    this.player = {
      name: '',
      type: '',
      health: 100,
      image: '',
    };
    this.computer = {
      name: '',
      type: '',
      health: 100,
      image: '',
    };
    this.options = [];
    this.choices = { playerChoice: null, computerChoice: null };
  }

  ngOnInit() {
    this.prepare();
  }

  handlePlayerChoice({ value }: { value: string }): void {
    this.choices = { ...this.choices, playerChoice: value as PlayerOption };
  }

  submit() {
    this.resetTurn();
  }

  private resetTurn() {}

  private prepare() {
    this.gameService
      .getPlayerOptions()
      .subscribe(
        ({ data }: IResponse) => (this.options = data as PlayerOption[])
      );
    this.gameService.getPlayers().subscribe(({ data }: IResponse) => {
      const [player, computer] = data as IPlayer[];
      this.player = player;
      this.computer = computer;
    });
  }
}
