import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie';
import { ShowItemComponent } from '../show-item/show-item.component';

@Component({
	selector: 'app-banner',
	standalone: true,
	imports: [ShowItemComponent, CommonModule],
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss'
})
export class BannerComponent {
	@Input() shows: Movie[] = [];
	@Input() title: string = '';
	@Input() showsType: 'tv' | 'movie' = 'movie';
}
