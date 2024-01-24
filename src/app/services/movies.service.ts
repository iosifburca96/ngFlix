import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesDto } from '../types/movie';


@Injectable({
    providedIn: 'root',
})
export class MoviesService {

    constructor(private http: HttpClient) { }

    getPopularMovies() {
        return this.http.get<MoviesDto>('https://api.themoviedb.org/3/movie/popular?api_key=58494b0eb3cff0eb979e392f3d18aef2');
    }
}
