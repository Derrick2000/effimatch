import React, {useState} from 'react';
import SignUpBackGround from '../../images/sign_bg.svg';
import {ReactComponent as SignUpPerson} from '../../images/sign_up_person.svg';
import {Input, Button, notification} from 'antd';
import './styles/signup.less';
import {registerUsingPost, sendVerificationUsingPost} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import {loginUser} from '../../actions/authAction';
import {useEventListener} from 'utils/useEventListener';
import {RegistrationRequestRole} from 'apis/effimatch';
import {useHistory} from 'react-router-dom';

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
    message: 'Code sent',
    description: 'We have send an OTP to your email.',
    placement,
  });
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPW] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendVal, setSendVal] = useState('Get OTP');
  const [codeSent, setSent] = useState(false);
  const history = useHistory();

  const [register] = useRequest(registerUsingPost, {
    onSuccess: () => {
      openSuccessNotification('bottomLeft');
      setLoading(false);
      loginUser({email, password})
        .then(() => {
          const fromJob = history.location.state.fromJob ?? undefined;

          if (fromJob) {
            history.push(`/jobs/${fromJob}`, {
              showNoteModal: true,
              isAuthenticated: true,
            });
          } else {
            history.push(`/`);
          }
        })
        .catch(() => {
          openErrorNotification('bottomLeft', 'Invalid login');
          setLoading(false);
        });
    },
    onFail: () => {
      setLoading(false);
    },
  });

  const handleEnterPressed = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      signUp();
    }
  };

  useEventListener('keydown', handleEnterPressed);

  const [sendVerificationMuted] = useRequest(sendVerificationUsingPost, {
    onSuccess: () => {
      openCodeNotification('bottomLeft');
    },
    onFail: e => {
      openErrorNotification('bottomLeft', e);
      setLoading(false);
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
      role: history.location.state.role ?? RegistrationRequestRole.JS,
    };

    register({requestBody: userInfo});
  };
  const signWithLinkedIn = () => {
    console.log('TODO');
  };

  return (
    <div
      className="signup-wrapper"
      style={{backgroundImage: `url(${SignUpBackGround})`}}>
      <SignUpPerson className="signup-wrapper-person" />
      <div className="signup-box">
        <h1 className="signup-box-header-base signup-box-header">Sign up</h1>
        <h2 className="signup-box-header-base signup-box-sub-header">
          to access thousands of potential referral opportunities.
        </h2>
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
          <p className="signup-box-form-text">Verification Code (OTP)</p>
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
        {/* <Button className="signup-box-linkedinBut" onClick={signWithLinkedIn}>
          Continue with LinkedIn
        </Button> */}
        <a
          className="signup-box-forgot"
          href="/sign-in"
          style={{paddingLeft: 0, zIndex: 2}}>
          Already have account? Sign in
        </a>
      </div>
    </div>
  );
};

export default Signup;
