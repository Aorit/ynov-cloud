import { NextApiRequest, NextApiResponse } from 'next';
import { HttpCodeStatus } from '../../../src/types/http/HttpCodeStatus';
import { HttpMethods } from '../../../src/types/http/HttpMethods';
import { ResponsePaginatedMovies } from '../../../src/types/themoviedb/queries/ResponsePaginatedMovies';
import { getSearchMovies } from '../../../src/queries/themoviedb';

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     tags: [Movies]
 *     description: Search a movie
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: dune
 *         description: Search input
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *           example: 3
 *         description: Page number
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: No movie was found with '${query}'
 *       500:
 *         description: Impossible to search movies
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const query: string = (req.query.query as string) || '';
	const page: number = parseInt(req.query.page as string, 5) || 1;

	let errorMessage: string;
	let warnMessage: string;
	let response: ResponsePaginatedMovies;
	switch (req.method) {
		case HttpMethods.GET:
			try {
				response = await getSearchMovies(query, page);
			} catch (e) {
				const errorMessage: string = 'Impossible to search movies';
				console.error(`ERROR: ${errorMessage} -> ${e instanceof Error ? e.message : e}`);
				return res.status(HttpCodeStatus.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
			}

			if (response.results && !response.results.length) {
				warnMessage = `No movie was found with '${query}'`;
				console.warn('WARN: ' + warnMessage);
				return res.status(HttpCodeStatus.NOT_FOUND).json({ message: warnMessage });
			}

			return res.status(HttpCodeStatus.OK).json(response);
		default:
			errorMessage = 'Method Not Allowed';
			console.error('ERROR: ' + errorMessage);
			return res.status(HttpCodeStatus.METHOD_NOT_ALLOWED).json({ error: errorMessage });
	}
}
