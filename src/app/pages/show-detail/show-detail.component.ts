import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { BannerComponent } from '../../components/banner/banner.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { VideoEmbedComponent } from '../../components/video-embed/video-embed.component';
import { IMAGE_SIZES } from '../../constants/image-sizes';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { Actor } from '../../types/credits';
import { Image } from '../../types/image';
import { Movie } from '../../types/movie';
import { mapToMovie, mapToMovies } from '../../types/tvshow';
import { Video } from '../../types/video';

@Component({
	selector: 'app-show-detail',
	standalone: true,
	templateUrl: './show-detail.component.html',
	styleUrl: './show-detail.component.scss',
	imports: [
		CommonModule,
		SliderComponent,
		TabViewModule,
		VideoEmbedComponent,
		ImageModule,
		CarouselModule,
		BannerComponent
	]
})
export class ShowDetailComponent implements OnInit, OnDestroy {
	// Observables for template
	show$: Observable<Movie> | null = null;
	showVideos$: Observable<Video[]> | null = null;
	showImages$: Observable<Image[]> | null = null;
	showCast$: Observable<Actor[]> | null = null;
	similarShows$: Observable<Movie[]> | null = null;

	// Component state
	showType: 'tv' | 'movie' = 'movie';
	imageSizes = IMAGE_SIZES;

	// Subscription management
	private destroy$ = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private moviesService: MoviesService,
		private tvService: TvshowsService
	) {}

	ngOnInit(): void {
		this.subscribeToRouteChanges();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	/**
	 * Subscribes to route parameter changes and loads show data accordingly
	 */
	private previousShowId: string | null = null;
	private previousShowType: 'tv' | 'movie' | null = null;

	private subscribeToRouteChanges(): void {
		this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
			const showId = params['id'];
			const showType = params['type'] as 'tv' | 'movie';

			if (showId !== this.previousShowId || showType !== this.previousShowType) {
				this.showType = showType;
				this.loadShowData(showId, showType);
				this.previousShowId = showId;
				this.previousShowType = showType;
			}
		});
	}

	/**
	 * Loads all data for a show based on its ID and type
	 * @param showId - The ID of the show to load
	 * @param showType - The type of show ('movie' or 'tv')
	 */
	private loadShowData(showId: string, showType: 'tv' | 'movie'): void {
		if (showType === 'movie') {
			this.loadMovieData(showId);
		} else {
			this.loadTvShowData(showId);
		}
	}

	/**
	 * Loads all movie-related data
	 * @param movieId - The ID of the movie
	 */
	private loadMovieData(movieId: string): void {
		this.show$ = this.moviesService.getMovieById(movieId);
		this.showVideos$ = this.moviesService.getMovieVideos(movieId);
		this.showImages$ = this.moviesService.getMovieImages(movieId);
		this.showCast$ = this.moviesService.getMovieCast(movieId);
		this.similarShows$ = this.moviesService.getMovieSimilar(movieId);
	}

	/**
	 * Loads all TV show-related data and maps it to Movie type
	 * @param tvShowId - The ID of the TV show
	 */
	private loadTvShowData(tvShowId: string): void {
		this.show$ = this.tvService.getTvShowById(tvShowId).pipe(map(mapToMovie));
		this.showVideos$ = this.tvService.getTvShowVideos(tvShowId);
		this.showImages$ = this.tvService.getTvShowImages(tvShowId);
		this.showCast$ = this.tvService.getTvShowCast(tvShowId);
		this.similarShows$ = this.tvService.getTvShowSimilar(tvShowId).pipe(map(mapToMovies));
	}
}
