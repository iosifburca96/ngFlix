import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { ShowItemComponent } from "../../components/show-item/show-item.component";
import { InputTextModule} from "primeng/inputtext";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shows-list',
  standalone: true,
    imports: [ShowItemComponent,
        CommonModule,
        InputTextModule,
        FormsModule
    ],
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.scss'
})
export class ShowsListComponent implements OnInit {

    showsList$: Observable<Movie[]> | null = null;
    searchValue: string = '';

    constructor(private moviesService: MoviesService) { }

    ngOnInit(): void {
        this.getPagedShows(1);
    }

    getPagedShows(page: number = 1, searchKey?: string): void {
        this.showsList$ = this.moviesService.searchMovies(1, this.searchValue);
    }

    searchChanged() {
        this.getPagedShows(1, this.searchValue);
    }
}
