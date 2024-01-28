import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesDto } from '../types/movie';


@Injectable({
    providedIn: 'root',
})
export class MoviesService {

    private apiUrl = 'https://api.themoviedb.org/3';
    private apiKey = '58494b0eb3cff0eb979e392f3d18aef2';

    constructor(private http: HttpClient) { }

    getPopularMovies() {
        return this.http.get<MoviesDto>(
            `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
        );
    }

    getUpcomingMovies() {
        return this.http.get<MoviesDto>(
            `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`
        );
    }
}
