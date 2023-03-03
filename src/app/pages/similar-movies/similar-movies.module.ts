import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimilarMoviesPageRoutingModule } from './similar-movies-routing.module';

import { SimilarMoviesPage } from './similar-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimilarMoviesPageRoutingModule
  ],
  declarations: [SimilarMoviesPage]
})
export class SimilarMoviesPageModule {}
