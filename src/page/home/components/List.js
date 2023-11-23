import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Card, CardContent, Typography } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import LazyLoad from "react-lazyload";
// import ImageZoom from "react-medium-image-zoom";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		position: "relative",
		transition: `all 0.2s ease-in-out`,
		height: "100%",
		backgroundColor: theme.palette.type === "dark" ? "#333" : "#fff",
	},
	cardMedia: {
		flexShrink: 0,
		width: 0,
		[theme.breakpoints.up("sm")]: {
			width: 256,
		},
		height: 350,
		transition: `all 0.5s ease-in-out`,
		"&:hover": {
			transform: `scale(1.1)`,
		},
		cursor: "pointer",
	},
	details: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	summary: {
		margin: 0,
		overflowY: "auto",
		textAlign: "justify",
    borderTop: "1px solid black",
    padding:"10px 0px",
	},
	content: {
		flex: "1 0 auto",
	},
	controls: {
		display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width:"100%",
		padding: theme.spacing(2),
		gap: 15,
	},
	cardLink: {
		textDecoration: "none",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		color: "#fff",
	},
}));

function List({
	post = {
		body: 'Brazilian President Jair Bolsonaro said he was "very well" and again advocated the use of the controversial drug hydroxychloroquine.\n#Brazil #coronavirus',
		date_created: "2020-07-10T00:43:01-0700",
		headline: "India Today - Brazilian President Jair Bolsonaro said he...",
		keywords: "Bolsonaro,President,controversial,advocated,Jair",
		num_comments: 1,
		num_likes: 46,
		num_shares: 1,
		url: "https://www.facebook.com/story.php?story_fbid=10160020915247119&id=23230437118&locale=pt_BR",
	},
}) {
	const classes = useStyles();
	// const imgLink = `./cover/${imgTitle}`;

	return (
		<Card className={classes.card}>
			{/* <LazyLoad once={true} height={200} offset={[100, 0]} overflow={true}>
				<ImageZoom
					defaultStyles={{
						overlay: {
							backgroundColor:
								theme.palette.type === "dark" ? "#212121" : "#fff",
						},
					}}
					image={{
						src: imgLink,
						alt: imgTitle,
						className: classes.cardMedia,
					}}
				/>
			</LazyLoad> */}
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography variant="h5">{post.headline}</Typography>

					<Typography variant="subtitle1">
						Keywords - {post.keywords.replace(/,/g, ", ")}
					</Typography>


					<section className={classes.summary}>
						<Typography variant="body1" color="textSecondary">
							{post.body}
						</Typography>
					</section>
				</CardContent>
        <div className={classes.controls}>
        <Typography variant="subtitle2" color="textSecondary" style={{marginRight:"auto"}}>
						{new Date(post.date_created).toLocaleDateString()}
					</Typography>
					<div className={classes.cardLink}>
						<ThumbUpIcon /> {post.num_likes}
					</div>
					<div className={classes.cardLink}>
						<CommentIcon /> {post.num_comments}
					</div>
					<div className={classes.cardLink}>
						<ShareIcon /> {post.num_shares}
					</div>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={post.url}
						className={classes.cardLink}
					>
						<OpenInNewIcon /> View Post
					</a>
				</div>
			</div>
		</Card>
	);
}

export default React.memo(List);
