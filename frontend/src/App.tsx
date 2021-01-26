import React from 'react';

// style
import './styles/index.less'

// components
import GuestHome from './screens/GuestHome/GuestHome'

// router
import { BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
			<Switch>
				<Route 
					exact={true}
					path="/"
					component={GuestHome}
				/>
			</Switch>
			
    </BrowserRouter>
  );
}

export default App;
