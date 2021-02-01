import React from 'react';

// style
import './styles/index.less';

// components
import GuestHome from './screens/GuestHome/GuestHome';
import NavBar from './components/NavBar/NavBar';
import JsHome from './screens/JsHome/JsHome';
import Search from './screens/Search/Search';

import { enquireScreen } from 'enquire-js';

// router
import { BrowserRouter, Route, Switch} from 'react-router-dom';

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

			</BrowserRouter>
		</>
  );
}

export default App;
