import React from 'react';

// style
import './styles/index.less';

// screens
import GuestHome from './screens/GuestHome/GuestHome';
import NavBar from './components/NavBar/NavBar';
import JsHome from './screens/JsHome/JsHome';
import Search from './screens/Search/Search';
import Referers from './screens/Referers/Referers';
import postDetails from './screens/post-details/post-details';
import getReferredSingle from './screens/get-referred-single/get-referred-single';
import OnBoard from './screens/OnBoard/OnBoard'
import RHomeSignedIn from './screens/R-Home-Signed-In/RHomeSignedIn';
import RHomeDetails from './screens/RHomeDetails/RHomeDetails';

import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';

// testing-screens
import Popup from './screens/PopUpTest/PopUpTest';

import { enquireScreen } from 'enquire-js';

// import redux stuff
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { Provider } from 'react-redux'

// router
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory()

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// if the user have not set his role
	// if (decoded.authorities.length === 0 && history.location.pathname !== '/onboard') {
	// 	window.location.href = '/onboard'
	// }

	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds

	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
	}
}

function App() {
	const [ isMobile, setIsMobile ] = React.useState(false);

	React.useEffect(() => {
			// responsive to mobile screen
			enquireScreen((mobileState: boolean) => {
					setIsMobile(mobileState);
				});
	}, [])

  return (
		<Provider store={store}>
			<NavBar
				isMobile={isMobile}
			/>
			<BrowserRouter>

				<Switch>
					<Route
						exact={true}
						path="/"
						component={GuestHome}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/js-home"
						component={JsHome}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/search"
						component={Search}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/referers"
						component={Referers}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/post-details"
						component={postDetails}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/get-referred-single"
						component={getReferredSingle}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/popup-test"
						component={Popup}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/sign-in"
						component={SignIn}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/sign-up"
						component={SignUp}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/RHomeSignedIn"
						component={RHomeSignedIn}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/onboard"
						component={OnBoard}
					/>
				</Switch>

				<Switch>
					<Route
						exact={true}
						path="/RHomeDetails"
						component={RHomeDetails}
					/>
				</Switch>

			</BrowserRouter>
		</Provider>
  );
}

export default App;
