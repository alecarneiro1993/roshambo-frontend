import { Component, Input } from '@angular/core';

import { IPlayer } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.sass'],
})
export class PlayerAvatarComponent {
  @Input() player: IPlayer | null;

  constructor() {
    this.player = null;
  }
}
