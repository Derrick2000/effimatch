import React from 'react';
import {ReactComponent as SignUpBackGround} from '../../images/sign_bg.svg';
import {ReactComponent as SignUpPerson} from '../../images/sign_up_person.svg';
import {Input, Button, notification} from 'antd';
import './styles/signup.less';
import {addUserUsingPost, sendVerificationMutedUsingPost} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';

const {Search} = Input;

const openErrorNotification = (placement: any, errorMsg: string) => {
  notification.error({
    message: 'Sign Up',
    description: 'An error has occured.\n' + errorMsg,
    placement,
  });
};

const openSuccessNotification = (placement: any) => {
  notification.success({
    message: 'Sign Up',
    description: 'Signed up successfully.',
    placement,
  });
};

const openCodeNotification = (placement: any) => {
  notification.success({
    message: 'Code',
    description: 'We have send an OTP to your email.',
    placement,
  });
};

const Signup: React.FC<any> = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [confirmPassword, setConfirmPW] = React.useState('');
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sendVal, setSendVal] = React.useState('Get OTP');
  const [codeSent, setSent] = React.useState(false);

  const [register] = useRequest(addUserUsingPost, {
    onSuccess: r => {
      console.log('sign up success: ', r.data);
      openSuccessNotification('bottomLeft');
      setLoading(false);
      window.location.href = '/';
    },
    onFail: e => {
      console.error('sign up error: ', e.response.data);
      openErrorNotification('bottomLeft', e.response.data);
      setLoading(false);
    },
  });

  const [sendVerificationMuted] = useRequest(sendVerificationMutedUsingPost, {
    onSuccess: () => {
      openCodeNotification('bottomLeft');
    },
    onFail: e => {
      openErrorNotification('bottomLeft', e);
    },
  });

  const invalid = (mail: string, username: string, password: string) => {
    return (
      !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(mail) ||
      mail === '' ||
      username === '' ||
      password === '' ||
      !password.match(/^[0-9a-z]+$/) ||
      password.length < 8 ||
      code === ''
    );
  };

  const sendCodeSeccess = () => {
    let timer = 60;
    setSent(true);
    const downloadTimer = setInterval(function () {
      setSendVal(timer + '');
      timer--;
      if (timer <= 0) {
        clearInterval(downloadTimer);
        setSent(false);
        setSendVal('Send Code');
      }
    }, 1000);
  };

  const sendCode = () => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      openErrorNotification('bottomLeft', 'Invalid Email');
      return;
    }

    const emailInfo = {
      email: email,
    };

    sendCodeSeccess();
    sendVerificationMuted({requestBody: emailInfo});
  };

  const signUp = () => {
    if (confirmPassword !== password) {
      openErrorNotification(
        'bottomLeft',
        'The two passwords you entered are not identical.',
      );
      return;
    }
    if (invalid(email, username, password)) {
      openErrorNotification('bottomLeft', 'Invalid input.');
      return;
    }

    setLoading(true);

    const userInfo = {
      username: username,
      email: email,
      password: password,
      code: code,
    };

    register({requestBody: userInfo});
  };
  const signWithLinkedIn = () => {
    console.log('TODO');
  };

  return (
    <div className="signup-wrapper">
      <SignUpBackGround className="signup-wrapper-bg" />

      <SignUpPerson className="signup-wrapper-person" />
      <div className="signup-box">
        <h1 className="signup-box-header">
          Sign Up to access thousands of potential referral opportunities.
        </h1>
        <div className="signup-box-form">
          <p className="signup-box-form-text">Name</p>
          <Input
            onChange={e => setUsername(e.target.value)}
            value={username}
            className="signup-box-form-input"
          />
          <p className="signup-box-form-text">Email</p>
          <Input
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="signup-box-form-input"
          />
          <p className="signup-box-form-text">Password</p>
          <Input.Password
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="signup-box-form-input"
            maxLength={25}
          />
          <p className="signup-box-form-text">Re-enter Password</p>
          <Input.Password
            onChange={e => setConfirmPW(e.target.value)}
            value={confirmPassword}
            className="signup-box-form-input"
            maxLength={25}
          />
          <Search
            placeholder="Enter OTP Here"
            enterButton={
              <Button type="primary" onClick={sendCode} disabled={codeSent}>
                {sendVal}
              </Button>
            }
            size="middle"
            value={code}
            onChange={e => setCode(e.target.value)}
            onSearch={sendCode}
            className="signup-box-form-code"
          />
        </div>
        <Button
          type="primary"
          className="signup-box-signupBut"
          onClick={signUp}
          loading={loading}>
          Create Account
        </Button>
        <Button className="signup-box-linkedinBut" onClick={signWithLinkedIn}>
          Continue with LinkedIn
        </Button>
      </div>
    </div>
  );
};

export default Signup;
