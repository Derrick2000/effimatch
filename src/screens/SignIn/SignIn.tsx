import React from 'react';
import {ReactComponent as SignUpBackGround} from '../../images/sign_bg.svg';
import {ReactComponent as SignInPerson} from '../../images/sign_in_person.svg';
import {Input, Button, notification} from 'antd';
import {useEventListener} from 'utils/useEventListener';

// redux
import {loginUser} from '../../actions/authAction';

import './styles/signin.less';

const openErrorNotification = (placement: any, errorMsg: string) => {
  notification.info({
    message: 'Sign In',
    description: 'An error has occured.\n' + errorMsg,
    placement,
  });
};

const openSuccessNotification = (placement: any) => {
  notification.info({
    message: 'Sign In',
    description: 'Signed in successfully.',
    placement,
  });
};

const SignIn: React.FC<any> = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleEnterPressed = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      login();
    }
  };

  useEventListener('keydown', handleEnterPressed);

  const login = () => {
    const userInfo = {
      email: email,
      password: password,
    };
    setLoading(true);
    loginUser(userInfo)
      .then(() => {
        openSuccessNotification('bottomLeft');
        setLoading(false);
        window.location.href = '/';
      })
      .catch(() => {
        openErrorNotification('bottomLeft', 'Invalid login');
        setLoading(false);
      });
  };

  // TODO: implement this in the future
  //   const signWithLinkedIn = () => {};

  return (
    <div className="signin-wrapper">
      <SignUpBackGround className="signin-wrapper-bg" />

      <div className="signin-box">
        <h1 className="signin-box-header-base signin-box-header">Log in</h1>
        <h2 className="signin-box-header-base">
          to access thousands of potential referral opportunities.
        </h2>
        <div className="signin-box-form">
          <p className="signin-box-form-text">email</p>
          <Input
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="signin-box-form-input"
          />
          <p className="signin-box-form-text">password</p>
          <Input.Password
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="signin-box-form-input"
          />
          <Button
            type="primary"
            className="signin-box-signinBut"
            onClick={login}
            loading={loading}>
            Log In
          </Button>
          <Button
            className="signin-box-linkedinBut"
            onKeyDown={e => console.log(e)}
            // onClick={signWithLinkedIn}
          >
            Continue with LinkedIn
          </Button>
        </div>
      </div>

      <SignInPerson className="signin-wrapper-person" />
    </div>
  );
};

export default SignIn;
