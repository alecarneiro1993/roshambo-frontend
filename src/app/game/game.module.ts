import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';
import { PlayerAvatarComponent, PlayerOptionsComponent } from './components';

@NgModule({
  declarations: [GameComponent, PlayerAvatarComponent, PlayerOptionsComponent],
  imports: [CommonModule],
})
export class GameModule {}
