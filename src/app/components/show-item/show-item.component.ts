import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { imagesBaseUrl } from '../../constants/image-sizes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {
    @Input() showItem: Movie | null = null;

    imageBaseUrl = imagesBaseUrl;
}
