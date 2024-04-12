import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, ImageListItem, ImageListItemBar, Typography} from '@mui/material';

export interface MoviesItemProperties {
	title: string;
	releaseDate: Date;
	imagePath: string;
	imageHeight: number;
}


export default function MovieItem(props: MoviesItemProperties): React.JSX.Element {
	return (
		<Card sx={{ maxWidth: 400 , height: 400}}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="250"
					image={props.imagePath}
					alt={props.title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{props.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{`Released in ${props.releaseDate}`}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
