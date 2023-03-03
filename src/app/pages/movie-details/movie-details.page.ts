import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imageBaseUrl = environment.imgPath;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe((res) => {
      console.log(res);
      this.movie = res;
    });
  }

  openHomePage(URL: any) {
    window.open(URL, '_blank');
  }

  openSimilarMoviesPage(id: any) {
    window.open(`/similar-movies/${id}`, '_blank');
  }

  openTrailer(URL: any) {
    window.open(URL, '_blank');
  }

}
