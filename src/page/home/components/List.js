import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import {
	Avatar,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import classNames from "classnames";
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
		padding: "10px 0px",
	},
	content: {
		flex: "1 0 auto",
	},
	controls: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		flexWrap: "wrap",
		width: "100%",
		padding: theme.spacing(2),
		gap: 15,
		[theme.breakpoints.up("xs")]: {
			justifyContent: "flex-start",
		},
	},
	cardLink: {
		textDecoration: "none",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		color: "#fff",
	},
	comments: {
		display: "none",
		"&.commentsVisible": {
			display: "flex",
		},
		borderTop: "1px solid white",
	},
	commentsVisible: {
		display: "flex",
		flexDirection: "column",
		// gap: 5,
	},
	comment: {
		padding: "5px 10px",
		borderTop: "1px solid black",
		borderBottom: "1px solid black",
	},
}));

function List({
	post = {
		author: {
			name: "Shone",
			avatar:
				"https://lh3.googleusercontent.com/a-/AFdZucronlTUV-NozkEp8kLRRch8n8eg1kH0jPaPyDpqLNs=s96-c",
			link: "https://lh3.googleusercontent.com/a-/AFdZucronlTUV-NozkEp8kLRRch8n8eg1kH0jPaPyDpqLNs=s96-c",
		},
		body: "In 1984, India's Prime Minister Indira Gandhi was assassinated by members of her security detail. #todayinhistory\n\nThe fatal shooting came months after she had ordered a deadly assault on the Golden Temple, the prominent pilgrimage site for Sikhs, to remove separatists.",
		comments: [
			{
				author: "Author",
				dateCreated: "2019-10-31T05:56:03-0700",
				text: "India endured Indira's end.",
			},
			{
				author: "Author",
				dateCreated: "2019-10-31T15:28:47-0700",
				text: "                  Pradip Majumdar ",
			},
			{
				author: "Steven Cullen",
				dateCreated: "2019-10-31T09:01:52-0700",
				text: "I remember the history......",
			},
			{
				author: "Author",
				dateCreated: "2019-10-31T07:27:40-0700",
				text: "I remember that day vividly. I was a high-school student in Calcutta at the time. We were in the chemistry laboratory when our professor gave us the news and told us all classes were suspended for the rest of the day. Some students were more excited about getting the rest of the day off rather than being concerned that our Prime Minister had just been assassinated by her own bodyguards.",
			},
			{
				author: "Author",
				dateCreated: "2019-10-31T06:38:52-0700",
				text: "the way it should be",
			},
			{
				author: "Author",
				dateCreated: "2019-10-31T06:00:07-0700",
				text: "You mean \u2018Hindustan\u2019, right? But even that is not enough to justify that country\u2019s treatment of Sikhs - before or after 1984.",
			},
		],
		date_created: "2019-10-31T05:51:07-0700",
		headline: "NPR - In 1984, India's Prime Minister Indira Gandhi was...",
		keywords: "Golden,Minister,Indira,Gandhi,Prime",
		num_comments: 10,
		num_likes: 121,
		num_shares: 27,
		url: "https://www.facebook.com/story.php?story_fbid=10158548679826756&id=10643211755",
	},
}) {
	const classes = useStyles();
	const [showComments, setShowComments] = useState(false);
	// const imgLink = `./cover/${imgTitle}`;

	async function handleComments() {
		setShowComments((prev) => !prev);
	}

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
					{post?.author?.name ? (
						<>
							<Avatar alt={post?.author?.name} src={post?.author?.avatar} />
							<Typography
								variant="subtitle1"
								component="a"
								href={post?.author?.link}
								target="_blank"
								rel="noopener noreferrer"
								color="textSecondary"
							>
								{post?.author?.name}
							</Typography>
						</>
					) : (
						<></>
					)}
					<Typography
						variant="subtitle2"
						color="textSecondary"
						style={{ marginRight: "auto" }}
					>
						{new Date(post.date_created).toLocaleDateString()}
					</Typography>
					<div className={classes.cardLink}>
						<ThumbUpIcon />{" "}
						<Typography variant="subtitle1">{post.num_likes}</Typography>
					</div>
					<IconButton
						classes={{ label: classes.cardLink }}
						onClick={handleComments}
					>
						<CommentIcon />{" "}
						<Typography variant="subtitle1">{post.num_comments}</Typography>
					</IconButton>
					<div className={classes.cardLink}>
						<ShareIcon />{" "}
						<Typography variant="subtitle1">{post.num_shares}</Typography>
					</div>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={post.url}
						className={classes.cardLink}
					>
						<OpenInNewIcon />{" "}
						<Typography variant="subtitle1">View Post</Typography>
					</a>
				</div>
				<div
					className={classNames(classes.comments, {
						[classes.commentsVisible]: showComments,
					})}
				>
					<Typography variant="h5" align="center">
						Comments
					</Typography>
					{post.comments.map((comment) => (
						<div className={classes.comment}>{comment.text}</div>
					))}
				</div>
			</div>
		</Card>
	);
}

export default React.memo(List);
