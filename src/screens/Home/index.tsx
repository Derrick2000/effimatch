import React from 'react';
import {useSelector} from 'react-redux';
import GuestHome from 'screens/Home/GuestHome/GuestHome';
import JsHome from 'screens/Home/JsHome/JsHome';

const Home = () => {
  const auth = useSelector((state: any) => state.auth);
  const [userRole, setUserRole] = React.useState('');

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
  }, []);

  if (!userRole) {
    return <GuestHome />;
  }

  if (userRole === 'JS') {
    return <JsHome />;
  } else {
    return <div />;
  }
};

export default Home;
