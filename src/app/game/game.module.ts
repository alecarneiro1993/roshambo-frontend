import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';
import {
  PlayerAvatarComponent,
  PlayerOptionsComponent,
  HealthBarComponent,
} from './components';

@NgModule({
  declarations: [
    GameComponent,
    PlayerAvatarComponent,
    PlayerOptionsComponent,
    HealthBarComponent,
  ],
  imports: [CommonModule],
})
export class GameModule {}
