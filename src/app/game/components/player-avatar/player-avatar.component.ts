import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.sass'],
})
export class PlayerAvatarComponent {
  @Input() src: string | undefined;
  @Input() playerName: string | undefined;
  @Input() playerHealth: string | undefined;
}
