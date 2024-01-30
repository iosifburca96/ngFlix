import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imagesBaseUrl } from '../../constants/image-sizes';
import { Movie } from '../../types/movie';

@Component({
    selector: 'app-slider',
    standalone: true,
    imports: [HttpClientModule, CommonModule],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss',
    animations: [
        trigger('slideFade', [
            state('void', style({opacity: 0})),
            transition('void <=> *', [animate('1.5s')])
        ])
    ]
})
export class SliderComponent implements OnInit 
{
    @Input() slides : Movie[] = [];
    @Input() isHeader = false;


    //movies: unknown;

    constructor() { }

    // ngOnInit(): void {
    //     this.getPopularMovies();
    // }
    // getPopularMovies() {
    //     this.moviesService.getPopularMovies()
    //         .subscribe(data => {
    //             this.movies = data;
    //         });
    // }

    //movies observable
    //movies$ = this.moviesService.getMoviesByType('popular');

    slideIndex = 0;

    imagesBaseUrl = imagesBaseUrl;
    
    ngOnInit() {
        if(!this.isHeader) {
            this.changeSlide();
        }
    }
    changeSlide() {
        setInterval(() => {
            this.slideIndex += 1;
            if(this.slideIndex > 10) {
                this.slideIndex = 0;
            }
        }, 5000);
    }
}
