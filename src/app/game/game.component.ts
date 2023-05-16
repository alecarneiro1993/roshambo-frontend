import { Component, Input } from '@angular/core';

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
  @Input() gameChoices: GameChoices;

  constructor() {
    this.gameChoices = { player: null, computer: null };
  }

  handlePlayerChoice(event: { type: string; value: string }): void {
    const { type, value } = event;
    this.gameChoices = { ...this.gameChoices, [type]: value };
  }
}
