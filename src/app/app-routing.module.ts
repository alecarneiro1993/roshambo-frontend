import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { GameComponent } from './game';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
