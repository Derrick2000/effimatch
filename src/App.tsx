import React from 'react';

// style
import './styles/index.less'

// components
import Home from './screens/Home'

// router
import { BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
			<Switch>
				<Route 
					exact={true}
					path="/"
					component={Home}
				/>
			</Switch>
			
    </BrowserRouter>
  );
}

export default App;
