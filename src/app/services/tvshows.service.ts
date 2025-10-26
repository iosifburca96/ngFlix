import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreditsDto } from '../types/credits';
import { ImagesDto } from '../types/image';
import { TvShow, TvShowsDto } from '../types/tvshow';
import { VideoDto } from '../types/video';

@Injectable({
	providedIn: 'root'
})
export class TvshowsService {
	private apiUrl = environment.tmdbApiUrl;
	private apiKey = environment.tmdbApiKey;

	constructor(private http: HttpClient) {}

	getTvShowsByType(type: string, count = 20) {
		return this.http
			.get<TvShowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
			.pipe(map(data => data.results.slice(0, count)));
	}

	getTvShowById(id: string) {
		return this.http.get<TvShow>(`${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`);
	}

	getTvShowVideos(id: string) {
		return this.http
			.get<VideoDto>(`${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
			.pipe(map(data => data.results));
	}

	getTvShowImages(id: string) {
		return this.http
			.get<ImagesDto>(`${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`)
			.pipe(map(data => data.backdrops));
	}

	getTvShowCast(id: string) {
		return this.http
			.get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
			.pipe(map(data => data.cast));
	}

	getTvShowSimilar(id: string) {
		return this.http
			.get<TvShowsDto>(`${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
			.pipe(map(data => data.results.slice(0, 12)));
	}
}
