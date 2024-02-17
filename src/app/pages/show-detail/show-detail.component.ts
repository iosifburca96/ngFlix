import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable, map } from 'rxjs';
import { Movie } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { TabViewModule } from 'primeng/tabview';
import { IMAGE_SIZES } from '../../constants/image-sizes';
import { Video } from '../../types/video';
import { Image } from '../../types/image';
import { VideoEmbedComponent } from "../../components/video-embed/video-embed.component";
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { Actor } from '../../types/credits';
import { BannerComponent } from '../../components/banner/banner.component';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovie, mapToMovies } from '../../types/tvshow';
@Component({
    selector: 'app-show-detail',
    standalone: true,
    templateUrl: './show-detail.component.html',
    styleUrl: './show-detail.component.scss',
    imports: [CommonModule, SliderComponent, TabViewModule, VideoEmbedComponent, ImageModule, CarouselModule, BannerComponent]
})
export class ShowDetailComponent implements OnInit {

    showId = '';
    showType: 'tv' | 'movie' = 'movie';

    show$: Observable<Movie> | null = null;
    showVideos$: Observable<Video[]> | null = null;
    showImages$: Observable<Image[]> | null = null;
    showCast$: Observable<Actor[]> | null = null;
    similarShows$: Observable<Movie[]> | null = null;

    imageSizes = IMAGE_SIZES;

    constructor(
        private router: ActivatedRoute, private moviesService: MoviesService,
        private tvService: TvshowsService
    ) { }

    ngOnInit() {
        // this.router.params.subscribe(params => {
        //     console.log(params);
        //     this.showId = params['id']
        // });

        this.showId = this.router.snapshot.params['id'];
        this.showType = this.router.snapshot.params['type'];

        if (this.showType === 'movie') {
            this.show$ = this.moviesService.getMovieById(this.showId);
            this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
            this.showImages$ = this.moviesService.getMovieImages(this.showId);
            this.showCast$ = this.moviesService.getMovieCast(this.showId);
            this.similarShows$ = this.moviesService.getMovieSimilar(this.showId);
        }
        if (this.showType === 'tv') {
            this.show$ = this.tvService
              .getTvShowById(this.showId)
              .pipe(map(mapToMovie));
            this.showVideos$ = this.tvService.getTvShowVideos(this.showId);
            this.showImages$ = this.tvService.getTvShowImages(this.showId);
            this.showCast$ = this.tvService.getTvShowCast(this.showId);
            this.similarShows$ = this.tvService
              .getTvShowSimilar(this.showId)
              .pipe(map(mapToMovies));
          }
    }
}
