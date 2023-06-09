import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { IPlayer, IChoice } from '../shared/interfaces';
import { Option } from '../shared/types';
import { WinnerService, LoggerService } from '../shared/services';
import { GameService } from './services';
import { delay, forkJoin, of, tap } from 'rxjs';

/**
 * Component that handles the Game and its playthrough
 * with the help of its child components
 * Handles all game related logic and API responses.
 */
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

  /**
   * Constructor
   * Injects the necessary services when initialized
   * as well as initializing the view data
   */
  constructor(
    private gameService: GameService,
    private router: Router,
    private ngZone: NgZone,
    private winnerService: WinnerService,
    private logger: LoggerService
  ) {
    this.players = {};
    this.options = [];
    this.choices = { playerChoice: null, computerChoice: null };
    this.message = '';
    this.isAbleToPlay = true;
  }

  /**
   * Prepares the game, making requests to fetch
   * the options and the players information
   */
  ngOnInit() {
    this.prepare();
  }

  /**
   * Updates the player or computer choice for the turn
   * The player's choice is handled via Event transmission
   * in the `PlayerOptionsComponent`, while the computer's choice
   * is handled when the API replies with the data.
   *
   * @param event - contains type (string) and value (string)
   *    @param type - either 'player' or 'computer''
   *    @param value - one of the available Options.
   */
  handleChoice({ type, value }: { type: string; value: string }): void {
    if (!this.isAbleToPlay && type == 'player') return;

    this.choices = {
      ...this.choices,
      [`${type}Choice`]: value as Option,
    };
  }

  /**
   * Makes a request to the API to reset the players health
   * In case the API is unreachable, returns to the home page
   */
  resetGame() {
    this.gameService.resetGame().subscribe((response) => {
      if (!('data' in response)) {
        this.logger.error('Something went wrong: redirecting to HomePage');
        return this.goToHomePage();
      }

      this.logger.log('** Resetting Game **');
      this.setPlayers(response.data['players'] as IPlayer[]);
      this.goToHomePage();
    });
  }

  /**
   * Makes a request to the API to resolve the Turn, provided
   * the player has selected one of the options
   *
   * Upon response from the API, shows the player
   * the computer's choice, the turn outcome,
   * a message displaying how much damage was taken or given.
   *
   * If the game is over, redirects to `/outcome`
   *
   * In case API is unreachable, resets the turn
   */
  submit() {
    this.logger.log('** Resolving Turn **');
    this.isAbleToPlay = false;
    this.message = 'Attacking';
    this.gameService
      .resolveGameTurn(this.choices.playerChoice as string)
      .pipe(
        delay(1000),
        tap((response) => {
          if ('data' in response) {
            const { data } = response;
            this.handleChoice({
              type: 'computer',
              value: data['computerChoice'] as string,
            });

            this.setPlayers(data['players'] as IPlayer[]);
            this.showTurnOutcome(
              data['message'] as string,
              data['gameOver'] as boolean
            );
          } else {
            this.logger.error('Something went wrong: redirecting to HomePage');
            this.goToHomePage();
          }
        })
      )
      .subscribe();
  }

  /**
   * Handles the response from `/resolve`
   *
   * If the game isn't over, resets the turn
   * otherwise, it ends the game.
   */
  private showTurnOutcome(message: string, gameOver: boolean) {
    const { player, computer } = <{ player: IPlayer; computer: IPlayer }>(
      this.players
    );
    this.message = message;
    this.winnerService.setWinner(
      (computer.health == 0 ? player : computer).name
    );

    of(null)
      .pipe(delay(2000))
      .subscribe(() => {
        !gameOver ? this.resetTurn() : this.endGame();
      });
  }

  /**
   * Redirects the user to the outcome page
   */
  private endGame() {
    this.logger.log('** We have a WINNER! END OF GAME! **');
    this.router.navigate(['/outcome']);
  }

  /**
   * Resets the Turn after a given time
   * by setting all necessary variables
   * back to their initial values.
   */
  private resetTurn() {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => {
        this.logger.log('** Turn Processed - Resetting **');
        this.choices = { playerChoice: null, computerChoice: null };
        this.message = '';
        this.isAbleToPlay = true;
      });
  }

  /**
   * Prepares the game by making the initial requests
   */
  private prepare() {
    this.logger.log('** Preparing the Game **');
    forkJoin([
      this.gameService.getPlayerOptions(),
      this.gameService.getPlayers(),
    ]).subscribe((responses) => {
      const [optionsResponse, playersResponse] = responses;
      if ('data' in optionsResponse && 'data' in playersResponse) {
        this.options = optionsResponse.data['options'] as Option[];
        this.setPlayers(playersResponse.data['players'] as IPlayer[]);
        this.logger.log('** Game Ready - ENJOY **');
      } else {
        this.logger.error('Something went wrong: redirecting to HomePage');
        this.goToHomePage();
      }
    });
  }

  /**
   * Setter for players
   */
  private setPlayers(players: IPlayer[]) {
    players.forEach((player: IPlayer) => {
      this.players[player.type.toLowerCase()] = player;
    });
  }

  /**
   * Redirects user to the initial page
   */
  private goToHomePage() {
    this.ngZone.run(() => {
      this.router.navigate(['/']);
    });
  }
}
