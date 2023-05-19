import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public message: string;
  public isAbleToPlay: boolean;

  constructor(private gameService: GameService, private router: Router) {
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
    this.message = '';
    this.isAbleToPlay = true;
  }

  ngOnInit() {
    this.prepare();
  }

  handleChoice({ type, value }: { type: string; value: string }): void {
    if (!this.isAbleToPlay && type == 'player') return;
    this.choices = {
      ...this.choices,
      [`${type}Choice`]: value as PlayerOption,
    };
  }

  submit() {
    this.isAbleToPlay = false;
    this.handleMessage('Attacking');
    setTimeout(() => {
      this.gameService
        .resolveGameTurn(this.choices.playerChoice as string)
        .subscribe(({ data }) => {
          const players = data['players'] as IPlayer[];
          this.handleChoice({
            type: 'computer',
            value: data['computerChoice'] as string,
          });

          setTimeout(() => {
            this.showTurnOutcome(
              data['turnResult'] as number,
              data['damageTaken'] as number
            );
            players.forEach((player: IPlayer) => {
              if (player.type === 'player') this.player = player;
              else this.computer = player;
            });
          }, 2000);
        });
    }, 1000);
  }

  private showTurnOutcome(turnResult: number, damage: number) {
    this.setTurnMessage(turnResult, damage);
    setTimeout(() => {
      if (!this.isGameOver()) {
        return this.resetTurn();
      }

      const winner = this.computer.health == 0 ? this.player : this.computer;
      this.router.navigate(['/outcome'], {
        queryParams: {
          winner: winner.name,
        },
      });
    }, 2000);
  }

  private resetTurn() {
    this.choices = { playerChoice: null, computerChoice: null };
    this.handleMessage('Resetting Turn');
    setTimeout(() => {
      this.handleMessage('');
      this.isAbleToPlay = true;
    }, 1000);
  }

  private prepare() {
    this.gameService
      .getPlayerOptions()
      .subscribe(
        ({ data }: IResponse) =>
          (this.options = data['options'] as PlayerOption[])
      );
    this.gameService.getPlayers().subscribe(({ data }: IResponse) => {
      const [player, computer] = data['players'] as IPlayer[];
      this.player = player;
      this.computer = computer;
    });
  }

  private handleMessage(msg: string) {
    this.message = msg;
  }

  private setTurnMessage(turnResult: number, damage: number) {
    let message: string;

    if (turnResult == 0) {
      message = 'DRAW: NO ONE TOOK DAMAGE';
    } else if (turnResult == 1) {
      message = `WIN: YOU'VE DEALT ${damage} damage to the enemy`;
    } else {
      message = `LOST: YOU'VE TAKEN ${damage} from the enemy`;
    }
    this.handleMessage(message);
  }

  private isGameOver() {
    const { health } = this.player;
    const { health: computerHealth } = this.computer;
    return health == 0 || computerHealth == 0;
  }
}
