import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		marginBottom: 10,
		width: "auto",
		display: "grid",
		gridTemplateRows: "repeat(3, 1fr)",
		gridTemplateColumns: "repeat(12, 1fr)",
		justifyContent: "center",
		gap: 10,
		[theme.breakpoints.down("xs")]: {
			gridTemplateRows: "repeat(4, 1fr)",
		},
	},
	query: {
		gridColumn: "span 12",
	},
	filter: {
		gridColumn: "span 6",
		[theme.breakpoints.down("xs")]: {
			gridColumn: "span 12",
		},
	},
	button: {
		gridColumn: "5 /span 4",
		[theme.breakpoints.down("xs")]: {
			gridColumn: "4 /span 6",
		},
	},
}));

function Setting({ getPosts,query, setQuery }) {
	const classes = useStyles();

	return (
		<div className={classes.search}>
			<TextField
				label="Query"
				variant="outlined"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				style={{ gridColumn: "span 12" }}
			/>
			<Button
				startIcon={<Search />}
				variant="contained"
				className={classes.button}
				size="large"
				onClick={getPosts}
			>
				Search
			</Button>
		</div>
	);
}


export default Setting;