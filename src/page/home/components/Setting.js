import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Button,
	FormControl,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
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

function Setting({ getPosts, query, setQuery, timeFrame, setTimeFrame }) {
  const classes = useStyles();
  const handleChange = (event) => {
    setTimeFrame(event.target.value);
  };

	return (
		<div className={classes.search}>
			<TextField
				label="Query"
				variant="outlined"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				style={{ gridColumn: "span 8" }}
			/>
			<FormControl
				className={classes.formControl}
				style={{ gridColumn: "span 4" }}
			>
				{/* <InputLabel id="time-select-helper-label">Time</InputLabel> */}
				<Select
					// labelId="time-select-helper-label"
					// id="time-select-helper"
					value={timeFrame}
          onChange={handleChange}
          variant="outlined"
				>
					<MenuItem value="all">All Time</MenuItem>
					<MenuItem value="qbr:h">Past Hour</MenuItem>
					<MenuItem value="qbr:d">Past 24 Hour</MenuItem>
					<MenuItem value="qbr:w">Past Week</MenuItem>
					<MenuItem value="qbr:m">Past Month</MenuItem>
					<MenuItem value="qbr:y">Past Year</MenuItem>
				</Select>
			</FormControl>
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