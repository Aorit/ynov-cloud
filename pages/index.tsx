import React, { useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { MovieDiscoverType } from '../src/types/themoviedb/MovieTypes';
import Title from '../src/components/Title';
import MovieList from '../src/components/movies/MovieList';
import { getMovies } from '../src/queries/api/movies';

export default function Home(): React.JSX.Element {
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [movies, setMovies] = useState<MovieDiscoverType[]>([]);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const getData = () => {
		setLoading(true);
		getMovies(page)
			.then(data => {
				if (data) {
					setMovies(data.results);
				} else {
					console.warn('Movies not found');
				}
			})
			.catch(e => {
				console.error(e);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getData();
	}, [page]);

	return (
		<>
			<Title />
			<Box height="97vh" width="100%">
				<Box height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
					<MovieList movies={movies} loading={loading} />
					<Pagination count={10} onChange={handleChange} color="secondary" shape="rounded" disabled={loading} />
				</Box>
			</Box>
		</>
	);
}
