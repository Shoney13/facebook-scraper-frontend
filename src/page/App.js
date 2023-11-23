import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Loading } from "components";
import Home from "./home";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		position: "relative",
		display: "flex",
	},
	content: {
		flexGrow: 1,
		overflowY: "auto",
		backgroundColor: theme.palette.type === "dark" ? "#191919" : "#fafafa",
		padding: theme.spacing(3),
		paddingLeft: "max(5%,(100% - 900px)/2)",
		paddingRight: "max(5%,(100% - 900px)/2)",
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		height: 48,
	},
}));

function App() {
	const classes = useStyles();

  
	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				{/* <AppBar {..._useToggle}/>
        <Drawer{..._useToggle}/> */}

				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Suspense fallback={<Loading />}>
						<Home />
					</Suspense>
				</main>
			</div>
		</Router>
	);
}

export default App;
