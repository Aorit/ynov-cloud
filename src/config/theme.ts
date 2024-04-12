import { Roboto } from 'next/font/google';
import { createTheme, Theme } from '@mui/material/styles';
import { NextFont } from 'next/dist/compiled/@next/font';

const roboto: NextFont = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
// Create a theme instance.
const theme: Theme = createTheme({
	palette: {
		primary: {
			main: '#ff6000',
		},
		secondary: {
			main: '#ffb400',
		},
		error: {
			main: '#b60404',
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
});
export default theme;
