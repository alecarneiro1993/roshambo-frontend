import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameTitleComponent } from './components';

@NgModule({
  declarations: [GameTitleComponent],
  exports: [GameTitleComponent],
  imports: [CommonModule],
})
export class SharedModule {}
