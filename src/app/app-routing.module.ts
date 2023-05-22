import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { GameComponent } from './game';
import { OutcomeComponent } from './outcome';

/**
 * Route Map of the application
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'game', component: GameComponent },
  { path: 'outcome', component: OutcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
