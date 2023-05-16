import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GameComponent } from './game.component';
import { PlayerAvatarComponent, PlayerOptionsComponent } from './components';

@NgModule({
  declarations: [GameComponent, PlayerAvatarComponent, PlayerOptionsComponent],
  imports: [CommonModule, MatButtonToggleModule],
})
export class GameModule {}
