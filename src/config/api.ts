import { HttpMethods } from '../types/http/HttpMethods';
import { fetchJsonByUrl } from '../queries/fetch';

const API = {
	BASEURL: '/api',
	URIS: {
		MOVIES: {
			BASE_URI: '/movies',
			SUB_URIS: {},
		},
	},
};

const doAPIDataFromUrl = async (url: string, infoText: string, options: RequestInit) => {
	const result = await fetchJsonByUrl(url, options);
	console.info('INFO: ' + infoText);
	return result;
};

const getAPIDataFromUrl = async (url: string, infoText: string) => {
	const options: RequestInit = {
		method: HttpMethods.GET,
		headers: {
			accept: 'application/json',
		},
	};
	return await doAPIDataFromUrl(url, infoText, options);
};



export { API, getAPIDataFromUrl };
