import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { TabViewModule } from 'primeng/tabview';
import { IMAGE_SIZES } from '../../constants/image-sizes';
import { Video } from '../../types/video';
import { VideoEmbedComponent } from "../../components/video-embed/video-embed.component";

@Component({
    selector: 'app-show-detail',
    standalone: true,
    templateUrl: './show-detail.component.html',
    styleUrl: './show-detail.component.scss',
    imports: [CommonModule, SliderComponent, TabViewModule, VideoEmbedComponent]
})
export class ShowDetailComponent implements OnInit {

    showId = '';

    show$: Observable<Movie> | null = null;
    showVideos$: Observable<Video[]> | null = null;
    imageSizes = IMAGE_SIZES;

    constructor(private router: ActivatedRoute, private moviesService: MoviesService) { }

    ngOnInit() {
        this.router.params.subscribe(params => {
            console.log(params);
            this.showId = params['id']
        });

        // this.showId = this.router.snapshot.params['id']; ==> alternative to subscribe

        this.show$ = this.moviesService.getMovieById(this.showId);
        this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
    }
}
