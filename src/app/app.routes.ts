import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { ShowsListComponent } from './pages/shows-list/shows-list.component';
import { GenresComponent } from './pages/genres/genres.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'list',
		component: ShowsListComponent
	},
	{
		path: 'detail/:id/:type',
		component: ShowDetailComponent
    },
    {
        path: 'genres',
        component: GenresComponent
    }
];
