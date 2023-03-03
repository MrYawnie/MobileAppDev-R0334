import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.imgPath;

  constructor(
    private movieService: MovieService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'Loading movies...',
      spinner: 'crescent'
    });
    await loading.present();

    this.movieService.getPopularMovies(this.currentPage).subscribe((res) => {
      console.log(res);
      loading.dismiss();
      this.movies.push(...res.results);

      event?.target.complete();
      if (event) {
        event.target.disabled = this.currentPage === res.total_pages;
      }
    },
    (error) => {
      console.log(error);
      loading.dismiss();
    });
  }

  loadMore(ev: Event) {
    this.currentPage++;
    const customEvent = ev as InfiniteScrollCustomEvent;
    this.loadMovies(customEvent);
    /* setTimeout(() => {
      customEvent.target.complete();
    }, 500); */
  }

}
