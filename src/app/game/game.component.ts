import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IPlayer, IChoice } from '../shared/interfaces';
import { Option } from '../shared/types';
import { GameService, IResponse } from './services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  public players: Record<string, IPlayer>;
  public options: Option[];
  public choices: IChoice;
  public message: string;
  public isAbleToPlay: boolean;

  constructor(private gameService: GameService, private router: Router) {
    this.players = {
      player: { name: '', type: '', image: '', health: 0 },
      computer: { name: '', type: '', image: '', health: 0 },
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
      [`${type}Choice`]: value as Option,
    };
  }

  resetGame() {
    this.gameService.resetGame().subscribe(({ data }) => {
      this.setPlayers(data['players'] as IPlayer[]);
      this.router.navigate(['/']);
    });
  }

  submit() {
    this.isAbleToPlay = false;
    this.handleMessage('Attacking');
    setTimeout(() => {
      this.gameService
        .resolveGameTurn(this.choices.playerChoice as string)
        .subscribe(({ data }) => {
          this.handleChoice({
            type: 'computer',
            value: data['computerChoice'] as string,
          });

          setTimeout(() => {
            this.setPlayers(data['players'] as IPlayer[]);
            this.showTurnOutcome(
              data['turnResult'] as number,
              data['damageTaken'] as number
            );
          }, 2000);
        });
    }, 1000);
  }

  private showTurnOutcome(turnResult: number, damage: number) {
    const { player, computer } = <{ player: IPlayer; computer: IPlayer }>(
      this.players
    );
    this.setTurnMessage(turnResult, damage);
    setTimeout(() => {
      if (!this.isGameOver()) {
        return this.resetTurn();
      }
      this.router.navigate(['/outcome'], {
        queryParams: {
          winner: (computer.health == 0 ? player : computer).name,
        },
      });
    }, 2000);
  }

  private resetTurn() {
    setTimeout(() => {
      this.choices = { playerChoice: null, computerChoice: null };
      this.handleMessage('');
      this.isAbleToPlay = true;
    }, 1000);
  }

  private prepare() {
    this.gameService
      .getPlayerOptions()
      .subscribe(
        ({ data }: IResponse) => (this.options = data['options'] as Option[])
      );
    this.gameService.getPlayers().subscribe(({ data }: IResponse) => {
      this.setPlayers(data['players'] as IPlayer[]);
    });
  }

  private handleMessage(msg: string) {
    this.message = msg;
  }

  private setTurnMessage(turnResult: number, damage: number) {
    let message = 'DRAW: NO ONE TOOK DAMAGE';

    if (turnResult != 0) {
      message =
        turnResult == 1
          ? `WIN: YOU'VE DEALT ${damage} damage to the enemy`
          : `LOST: YOU'VE TAKEN ${damage} from the enemy`;
    }
    this.handleMessage(message);
  }

  private isGameOver() {
    return Object.keys(this.players).some(
      (type) => this.players[type].health == 0
    );
  }

  private setPlayers(players: IPlayer[]) {
    players.forEach((player: IPlayer) => {
      this.players[player.type] = player;
    });
  }
}
