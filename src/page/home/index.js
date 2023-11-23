import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { List, Setting } from "./components";
import { Loading } from "components";

const listLayout = {
	xs: 12,
	sm: 12,
	md: 12,
	lg: 12,
	xl: 12,
};

function Home() {
	const axiosCancelSource = axios.CancelToken.source();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");

	/** @type {[Posts[], React.Dispatch<Posts>]} */ // TODO: Remove
	const [posts, setPosts] = useState([
		{
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
	]);

	const getPosts = useCallback(async () => {
		if (!query.trim()) return;
		try {
			setLoading(true);

			const response = await axios.get(
				"https://fbscraper.pankajbaranwal.com/search",
				{
					params: {
						query: query.trim(),
						page,
					},
					cancelToken: axiosCancelSource.token,
				}
			);

			setPosts(response.data.posts);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	}, [axiosCancelSource.token, page, query]);

	const handlePageChange = useCallback(async (value) => {
		setPage((prev) => prev + value);
	}, []);

	useEffect(() => {
		getPosts();

		return () => {
			axiosCancelSource.cancel();
		};
	}, [page]);

	return (
		<>
			<Setting getPosts={getPosts} query={query} setQuery={setQuery} />
			<Grid container spacing={4}>
				{loading ? (
					<Loading />
				) : posts.length ? (
					posts.map((post) => (
						<Grid item key={post.url} {...listLayout}>
							<List post={post} />{" "}
						</Grid>
					))
				) : (
					<Typography
						variant="h2"
						align="center"
						style={{ marginTop: 40, width: "100%" }}
					>
						No Posts Found
					</Typography>
				)}
				<Grid container item style={{ justifyContent: "center", gap: 5 }}>
					{/* TODO: track total pages */}
					{/* <Pagination count={10} page={page} onChange={handlePageChange} /> */}
					{page > 1 ? (
						<Button
							startIcon={<ArrowBackIosIcon />}
							variant="contained"
							onClick={() => handlePageChange(-1)}
						>
							Prev
						</Button>
					) : (
						<></>
					)}
					{posts.length ? (
						<Button
							endIcon={<ArrowForwardIosIcon />}
							variant="contained"
							onClick={() => handlePageChange(1)}
						>
							Next
						</Button>
					) : (
						<></>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default Home;

/**
 * Represents the response from an API call using axios.
 *
 * @typedef {Object} Posts
 * @property {Array<Object>} proxy_posts - An array of proxy posts.
 *
 * @property {string} proxy_posts[].body - The body of the post.
 * @property {string} proxy_posts[].date_created - The date when the post was created.
 * @property {string} proxy_posts[].headline - The headline of the post.
 * @property {string} proxy_posts[].keywords - Keywords associated with the post.
 * @property {number} proxy_posts[].num_comments - The number of comments on the post.
 * @property {number} proxy_posts[].num_likes - The number of likes on the post.
 * @property {number} proxy_posts[].num_shares - The number of shares of the post.
 * @property {string} proxy_posts[].url - The URL of the post.
 */
