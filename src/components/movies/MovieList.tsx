import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { MovieDiscoverType } from '../../types/themoviedb/MovieTypes';
import Skeleton from '@mui/material/Skeleton';
import MovieItem from './MovieItem';
import { TMDB_MOVIES } from '../../config/themoviedb';

export interface MoviesListProperties {
	movies: MovieDiscoverType[];
	loading: boolean;
}
export default function MovieList(props: MoviesListProperties): React.JSX.Element {
	const imageSize = {
		height: 150,
	};
	return (
		<ImageList sx={{ width: 'auto', height: 700, margin: 2 }} cols={4}>
			{props.movies &&
				props.movies.map((movie: MovieDiscoverType, key: number) =>
					props.loading ? (
						<ImageListItem key={key}>
							<Skeleton
								key={key}
								variant="rectangular"
								height={`${imageSize.height}px`}
							/>
						</ImageListItem>
					) : (
						<MovieItem
							key={key}
							title={movie.title}
							releaseDate={movie.release_date}
							imagePath={`${TMDB_MOVIES.IMAGEURL}/w500${movie.backdrop_path}`}
							imageHeight={imageSize.height}
						/>
					),
				)}
		</ImageList>
	);
}
