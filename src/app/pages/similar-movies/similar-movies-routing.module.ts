import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimilarMoviesPage } from './similar-movies.page';

const routes: Routes = [
  {
    path: '',
    component: SimilarMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimilarMoviesPageRoutingModule {}
