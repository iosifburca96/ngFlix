import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { imagesBaseUrl } from '../../constants/image-sizes';
import { Movie } from '../../types/movie';

@Component({
	selector: 'app-show-item',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './show-item.component.html',
	styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {
	@Input() showItem: Movie | null = null;
	@Input() showType: 'tv' | 'movie' = 'movie';
	imageBaseUrl = imagesBaseUrl;
}
