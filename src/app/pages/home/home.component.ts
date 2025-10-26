import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BannerComponent } from '../../components/banner/banner.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovies } from '../../types/tvshow';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SliderComponent, BannerComponent, CommonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	popularMovies$ = this.movieService.getMoviesByType('popular', 12);
	upcomingMovies$ = this.movieService.getMoviesByType('upcoming', 12);
	topRatedMovies$ = this.movieService.getMoviesByType('top_rated', 12);
	popularTvShows$ = this.tvshowsService.getTvShowsByType('popular', 12).pipe(map(mapToMovies));

	constructor(
		private movieService: MoviesService,
		private tvshowsService: TvshowsService,
		private router: Router
	) {}

	onShowDetail(event: { id: number; type: 'movie' | 'tv' }) {
		this.router.navigate(['/detail', event.id, event.type]);
	}
}
