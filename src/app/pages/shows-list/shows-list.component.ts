import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { MoviesService } from '../../services/movies.service';
import { MoviesDto } from '../../types/movie';

@Component({
	selector: 'app-shows-list',
	standalone: true,
	imports: [ShowItemComponent, CommonModule, InputTextModule, FormsModule, PaginatorModule],
	templateUrl: './shows-list.component.html',
	styleUrl: './shows-list.component.scss'
})
export class ShowsListComponent implements OnInit {
	showsList$: Observable<MoviesDto> | null = null;
	searchValue: string = '';

	constructor(private moviesService: MoviesService) {}

	ngOnInit(): void {
		this.getPagedShows(1);
	}

	getPagedShows(page: number = 1, searchKey?: string): void {
		this.showsList$ = this.moviesService.searchMovies(page, searchKey);
	}

	searchChanged() {
		this.getPagedShows(1, this.searchValue);
    }

    onPageChange(event: PaginatorState) {
        const page = event.page ? event.page + 1 : 1;

        this.getPagedShows(page, this.searchValue);
    }
}
