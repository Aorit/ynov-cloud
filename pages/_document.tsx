import * as React from 'react';
import { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { documentGetInitialProps, DocumentHeadTags, DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import theme from '../src/config/theme';

export default function Document(props: React.JSX.IntrinsicAttributes & DocumentHeadTagsProps) {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content={theme.palette.primary.main} />
				<meta name="emotion-insertion-point" content="" />
				<link
					id="favicon"
					rel="shortcut icon"
					href="https://cdn.icon-icons.com/icons2/3053/PNG/512/netflix_macos_bigsur_icon_189917.png"
					type="image/png"
				/>
				<DocumentHeadTags {...props} />
			</Head>
			<body style={{ margin: 0 }}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

Document.getInitialProps = async (ctx: DocumentContext) => {
	return await documentGetInitialProps(ctx);
};
