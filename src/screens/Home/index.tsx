import React from 'react';
import {useSelector} from 'react-redux';
import GuestHome from 'screens/Home/GuestHome/GuestHome';
import JsHome from 'screens/Home/JsHome/JsHome';
import RHome from 'screens/Home/RHome/RHome';

const Home = () => {
  const auth = useSelector((state: any) => state.auth);
  const [userRole, setUserRole] = React.useState('loading');

  React.useLayoutEffect(() => {
    if (!auth || !auth.user || !auth.user.authorities) return;
    for (const ii of auth.user.authorities) {
      const authority = ii.authority;
      if (authority === 'ROLE_JS') {
        setUserRole('JS');
        break;
      } else if (authority === 'ROLE_R') {
        setUserRole('R');
        break;
      }
    }
  }, [auth]);

  if (userRole === 'loading') {
    return <div />;
  } else if (userRole === 'JS') {
    return <JsHome />;
  } else if (userRole === 'R') {
    return <RHome />;
  } else if (!userRole) {
    return <GuestHome />;
  } else {
    return <p>User permission error</p>;
  }
};

export default Home;
