import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutcomeComponent } from './outcome.component';
import { WinnerService } from '../shared/services';

@NgModule({
  providers: [WinnerService],
  declarations: [OutcomeComponent],
  imports: [CommonModule],
})
export class OutcomeModule {}
