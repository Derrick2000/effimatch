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

import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';

// testing-screens
import Popup from './screens/PopUpTest/PopUpTest';

import { enquireScreen } from 'enquire-js';

// router
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Signup from './screens/SignUp/SignUp';

function App() {
	const [ isMobile, setIsMobile ] = React.useState(false);

	React.useEffect(() => {
			// responsive to mobile screen
			enquireScreen((mobileState: boolean) => {
					setIsMobile(mobileState);
				});
	}, [])

  return (
		<>
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

			</BrowserRouter>
		</>
  );
}

export default App;
