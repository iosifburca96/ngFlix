import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesDto } from '../types/movie';
import { map } from 'rxjs';
import { TvShowsDto } from '../types/tvshow';

@Injectable({
    providedIn: 'root'
})
export class TvshowsService {

    private apiUrl = 'https://api.themoviedb.org/3';
    private apiKey = '58494b0eb3cff0eb979e392f3d18aef2';

    constructor(private http: HttpClient) { }

    getTvShowsByType(type: string, count = 20) {
        return this.http
            .get<TvShowsDto>(
                `${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`
            ).pipe(map((data) => data.results.slice(0, count)));
    }
}
