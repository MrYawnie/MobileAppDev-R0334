import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.apiUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}`);
  }

  getPopularMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  getSimilarMovies(id: any, page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.apiUrl}/movie/${id}/similar?api_key=${environment.apiKey}&page=${page}`);
  }

  getMovieDetails(id: any): Observable<any> {
    return this.http.get<ApiResult>(`${environment.apiUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }

}
