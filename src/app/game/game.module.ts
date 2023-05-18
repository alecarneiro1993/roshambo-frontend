import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';
import {
  PlayerAvatarComponent,
  PlayerOptionsComponent,
  HealthBarComponent,
} from './components';
import { OutcomeComponent } from './components/outcome/outcome.component';

@NgModule({
  declarations: [
    GameComponent,
    PlayerAvatarComponent,
    PlayerOptionsComponent,
    HealthBarComponent,
    OutcomeComponent,
  ],
  imports: [CommonModule],
})
export class GameModule {}
