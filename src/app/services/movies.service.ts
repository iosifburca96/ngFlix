import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreditsDto } from '../types/credits';
import { ImagesDto } from '../types/image';
import { Movie, MoviesDto } from '../types/movie';
import { VideoDto } from '../types/video';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	private apiUrl = environment.tmdbApiUrl;
	private apiKey = environment.tmdbApiKey;

	constructor(private http: HttpClient) {}

	getMoviesByType(type: string, count = 20) {
		return this.http
			.get<MoviesDto>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`)
			.pipe(map(data => data.results.slice(0, count)));
	}

	getMovieById(id: string) {
		return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
	}

	getMovieVideos(id: string) {
		return this.http
			.get<VideoDto>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
			.pipe(map(data => data.results));
	}

	getMovieImages(id: string) {
		return this.http
			.get<ImagesDto>(`${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`)
			.pipe(map(data => data.backdrops));
	}

	getMovieCast(id: string) {
		return this.http
			.get<CreditsDto>(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
			.pipe(map(data => data.cast));
	}

	getMovieSimilar(id: string) {
		return this.http
			.get<MoviesDto>(`${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
			.pipe(map(data => data.results.slice(0, 12)));
	}

	searchMovies(page: number, searchValue?: string) {
		const uri = searchValue ? 'search/movie' : 'movie/popular';

		return this.http
			.get<MoviesDto>(
				`${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
			);
	}
}
