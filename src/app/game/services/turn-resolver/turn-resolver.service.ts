import { Injectable } from '@angular/core';

import { Player, PlayerOptions } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class TurnResolverService {
  constructor() {
    // do nothing
  }

  resolve(player: Player, computer: Player): void {
    // Make API call to check who won and how much dmg it received
    if (!this.areChoicesValid([player.choice, computer.choice])) return;
    const dmgAmount = Math.ceil(Math.random() * (100 - 1) + 1);
    console.log(dmgAmount);
    computer.takeHit(dmgAmount.toString());
  }

  private areChoicesValid(choices: Array<string>) {
    const possibleOptions = Object.keys(PlayerOptions);
    return choices.every(
      (choice) =>
        choice !== null && choice !== '' && possibleOptions.includes(choice)
    );
  }
}
