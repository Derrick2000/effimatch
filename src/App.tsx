import './styles/index.less';
import {getOwnInformationUsingGet} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import {enquireScreen} from 'enquire-js';
import {createBrowserHistory} from 'history';
import jwt_decode from 'jwt-decode';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Review from 'screens/Review/Review';
import ReviewDetails from 'screens/ReviewDetails/ReviewDetails';
import {logoutUser, setCurrentUser} from './actions/authAction';
import NavBar from './components/NavBar/NavBar';
import NewJob from './screens/NewJob/NewJob';
import getReferredSingle from './screens/get-referred-single/get-referred-single';
import Home from './screens/Home';
import RHomeDetails from './screens/Home/RHomeDetails/RHomeDetails';
import OnBoard from './screens/OnBoard/OnBoard';
import Popup from './screens/PopUpTest/PopUpTest';
import postDetails from './screens/post-details/post-details';
import Referers from './screens/Referers/Referers';
import Search from './screens/Search/Search';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import store from './store';
import setAuthToken from './utils/setAuthToken';

function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  const history = createBrowserHistory();

  const [checkIfNeedsRedirection] = useRequest(getOwnInformationUsingGet, {
    onSuccess: r => {
      const finishedInitialSettings = r.data.finishedInitialSettings;
      if (!finishedInitialSettings) window.location.href = '/onboard';
    },
  });

  React.useEffect(() => {
    // responsive to mobile screen
    enquireScreen((mobileState: boolean) => {
      setIsMobile(mobileState);
    });

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
      if (
        decoded !== null &&
        decoded.authorities.length === 0 &&
        history.location.pathname !== '/onboard' &&
        history.location.pathname !== '/sign-in'
      ) {
        checkIfNeedsRedirection(undefined);
      }

      // Check for expired token
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <NavBar isMobile={isMobile} />
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
        </Switch>

        <Switch>
          <Route exact={true} path="/search" component={Search} />
        </Switch>

        <Switch>
          <Route exact={true} path="/referers" component={Referers} />
        </Switch>

        <Switch>
          <Route exact={true} path="/jobs/:id" component={postDetails} />
        </Switch>

        <Switch>
          <Route
            exact={true}
            path="/get-referred-single"
            component={getReferredSingle}
          />
        </Switch>

        <Switch>
          <Route exact={true} path="/popup-test" component={Popup} />
        </Switch>

        <Switch>
          <Route exact={true} path="/sign-in" component={SignIn} />
        </Switch>

        <Switch>
          <Route exact={true} path="/sign-up" component={SignUp} />
        </Switch>

        <Switch>
          <Route exact={true} path="/onboard" component={OnBoard} />
        </Switch>

        <Switch>
          <Route exact={true} path="/RHomeDetails" component={RHomeDetails} />
        </Switch>
        <Switch>
          <Route exact={true} path="/new-job" component={NewJob} />
        </Switch>

        <Switch>
          <Route exact={true} path="/reviewapp" component={Review} />
        </Switch>

        <Switch>
          <Route exact={true} path="/reviewdetail" component={ReviewDetails} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
