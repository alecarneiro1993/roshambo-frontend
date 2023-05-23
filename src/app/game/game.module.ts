import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameComponent } from './game.component';
import { PlayerAvatarComponent, PlayerOptionsComponent } from './components';
import { LoggerService, WinnerService } from '../shared/services';

@NgModule({
  providers: [WinnerService, LoggerService],
  declarations: [GameComponent, PlayerAvatarComponent, PlayerOptionsComponent],
  imports: [CommonModule],
})
export class GameModule {}
