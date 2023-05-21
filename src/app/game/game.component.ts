import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { IPlayer, IChoice } from '../shared/interfaces';
import { Option } from '../shared/types';
import { WinnerService } from '../shared/services';
import { GameService } from './services';

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

  constructor(
    private gameService: GameService,
    private _router: Router,
    private _ngZone: NgZone,
    private winnerService: WinnerService
  ) {
    this.players = {};
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
    this.gameService.resetGame().subscribe((response) => {
      if (!('data' in response)) {
        return this.goToHomePage();
      }

      this.setPlayers(response.data['players'] as IPlayer[]);
      this.goToHomePage();
    });
  }

  submit() {
    this.isAbleToPlay = false;
    this.handleMessage('Attacking');
    setTimeout(() => {
      this.gameService
        .resolveGameTurn(this.choices.playerChoice as string)
        .subscribe((response) => {
          if (!('data' in response)) {
            setTimeout(() => {
              this.handleMessage('Something went wrong, resetting...');

              setTimeout(() => {
                this.resetTurn();
              }, 2000);
            }, 2000);
            return;
          }

          const { data } = response;
          this.handleChoice({
            type: 'computer',
            value: data['computerChoice'] as string,
          });

          setTimeout(() => {
            this.setPlayers(data['players'] as IPlayer[]);
            this.showTurnOutcome(
              data['message'] as string,
              data['gameOver'] as boolean
            );
          }, 2000);
        });
    }, 1000);
  }

  private showTurnOutcome(message: string, gameOver: boolean) {
    const { player, computer } = <{ player: IPlayer; computer: IPlayer }>(
      this.players
    );
    this.handleMessage(message);
    this.winnerService.setWinner(
      (computer.health == 0 ? player : computer).name
    );

    setTimeout(() => {
      if (!gameOver) {
        return this.resetTurn();
      }

      this._router.navigate(['/outcome']);
    }, 2000);
  }

  private resetTurn() {
    setTimeout(() => {
      this.choices = { playerChoice: null, computerChoice: null };
      this.handleMessage('');
      this.isAbleToPlay = true;
    }, 1000);
  }

  private fetchOptions() {
    this.gameService.getPlayerOptions().subscribe((response) => {
      if (!('data' in response)) {
        return this.goToHomePage();
      }

      this.options = response.data['options'] as Option[];
    });
  }

  private fetchPlayers() {
    this.gameService.getPlayers().subscribe((response) => {
      if (!('data' in response)) {
        return this.goToHomePage();
      }

      this.setPlayers(response.data['players'] as IPlayer[]);
    });
  }

  private prepare() {
    this.fetchOptions();
    this.fetchPlayers();
  }

  private handleMessage(msg: string) {
    this.message = msg;
  }

  private setPlayers(players: IPlayer[]) {
    players.forEach((player: IPlayer) => {
      this.players[player.type] = player;
    });
  }

  private goToHomePage() {
    this._ngZone.run(() => {
      this._router.navigate(['/']);
    });
  }
}
