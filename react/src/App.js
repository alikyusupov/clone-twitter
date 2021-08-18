import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Timeline from "./pages/timeline/Timeline";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{user ? <Home></Home> : <Login></Login>}
				</Route>
				<Route path="/login">
					{user ? <Redirect to="/"></Redirect> : <Login></Login>}
				</Route>
				<Route path="/register">
					{user ? <Redirect to="/"></Redirect> : <Register></Register>}
				</Route>
				<Route path="/messenger">
					{!user ? <Redirect to="/"></Redirect> : <Messenger></Messenger>}
				</Route>
				<Route path="/timeline">
					{!user ? <Redirect to="/"></Redirect> : <Timeline></Timeline>}
				</Route>
				<Route path="/profile/:username">
					{!user ? <Redirect to="/"></Redirect> : <Profile></Profile>}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
