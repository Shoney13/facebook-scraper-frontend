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
	const [posts, setPosts] = useState([]);

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
