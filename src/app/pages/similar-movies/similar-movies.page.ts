import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.page.html',
  styleUrls: ['./similar-movies.page.scss'],
})
export class SimilarMoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  baseId: any;
  imageBaseUrl = environment.imgPath;

  constructor(
    private movieService: MovieService,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.baseId = params.get('id');
      this.loadSimilarMovies();
    });
  }
  
  async loadSimilarMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'Loading movies...',
      spinner: 'crescent'
    });
    await loading.present();

    this.movieService.getSimilarMovies(this.baseId, this.currentPage).subscribe((res) => {
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
    this.loadSimilarMovies(customEvent);
    /* setTimeout(() => {
      customEvent.target.complete();
    }, 500); */
  }


}
