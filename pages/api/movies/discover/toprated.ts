import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethods } from '../../../../src/types/http/HttpMethods';
import { HttpCodeStatus } from '../../../../src/types/http/HttpCodeStatus';
import { ResponsePaginatedMovies } from '../../../../src/types/themoviedb/queries/ResponsePaginatedMovies';
import { getTopRatedMovies } from '../../../../src/queries/themoviedb';

/**
 * @swagger
 * /api/movies/discover/toprated:
 *   get:
 *     tags: [Discover]
 *     description: Returns top rated movies
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *           example: 2
 *         description: Page number
 *     responses:
 *       200:
 *         description: Success Response
 *       500:
 *         description: Impossible to get toprated movies
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const page: number = parseInt(req.query.page as string, 5) || 1;

	let errorMessage: string;
	let response: ResponsePaginatedMovies;
	switch (req.method) {
		case HttpMethods.GET:
			try {
				response = await getTopRatedMovies(page);
			} catch (e) {
				const errorMessage: string = 'Impossible to get toprated movies';
				console.error(`ERROR: ${errorMessage} -> ${e instanceof Error ? e.message : e}`);
				return res.status(HttpCodeStatus.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
			}

			return res.status(HttpCodeStatus.OK).json(response);
		default:
			errorMessage = 'Method Not Allowed';
			console.error('ERROR: ' + errorMessage);
			return res.status(HttpCodeStatus.METHOD_NOT_ALLOWED).json({ error: errorMessage });
	}
}
