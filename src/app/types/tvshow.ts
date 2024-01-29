import { Movie } from "./movie";


export type TvShow = {
    id: number,
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    original_language: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    original_name: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    name: string,
    first_air_date: string
};

export type TvShowsDto = {
    page: number,
    results: TvShow[],
    total_pages: number,
    total_results: number
};

export function mapToMovies(tvshows: TvShow[]): Movie[] {
    return tvshows.map((tvshow: TvShow)=> {
        return {
            ...tvshow,
            title: tvshow.name,
            original_title: tvshow.original_name
        }
    });
}