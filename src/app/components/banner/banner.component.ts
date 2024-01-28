import { Component } from '@angular/core';
import { ShowItemComponent } from '../show-item/show-item.component';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ShowItemComponent, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

    upcomingMovies$ = this.movieService.getUpcomingMovies();

    constructor(private movieService: MoviesService) {
        
        
    }
}
