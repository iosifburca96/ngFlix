import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss'
})
export class ShowDetailComponent implements OnInit {

    showId = '';

    show$: Observable<Movie> | null = null;

    constructor(private router: ActivatedRoute, private moviesService: MoviesService) { }

    ngOnInit() {
        this.router.params.subscribe(params => {
            console.log(params);
            this.showId = params['id']
        });

        // this.showId = this.router.snapshot.params['id']; ==> alternative to subscribe

        this.show$ = this.moviesService.getMovieById(this.showId);
    }
}
