import React from 'react';
import ForgotPasswordBackground from 'images/sign_bg.svg';
import {ReactComponent as ResetPerson} from 'images/forgot_pw_person.svg';
import {Input, Button, notification} from 'antd';
import './styles/forgotPassword.less';
import {
  sendVerificationUsingPost,
  changePasswordUsingPatch,
} from 'apis/effimatch';
import {useRequest} from 'apis/useRequest';
import {useEventListener} from 'utils/useEventListener';

const {Search} = Input;

const openErrorNotification = (placement: any, errorMsg: string) => {
  notification.error({
    message: 'Reset password',
    description: `An error has occured.\n ${errorMsg}`,
    placement,
  });
};

const openSuccessNotification = (placement: any) => {
  notification.success({
    message: 'Reset password',
    description: 'Reset password successfully.',
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

const ForgotPassword: React.FC<any> = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPW] = React.useState('');
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sendVal, setSendVal] = React.useState('Get OTP');
  const [codeSent, setSent] = React.useState(false);

  const [sendChangePasswordRequest] = useRequest(changePasswordUsingPatch, {
    onSuccess: () => {
      openSuccessNotification('bottomLeft');
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 2000);
    },
    onFail: e => {
      openErrorNotification('bottomLeft', e.message);
    },
    onFinally: () => {
      setLoading(false);
    },
  });

  const handleEnterPressed = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      resetPassword();
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

  const validateEmail = (email: string) => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      openErrorNotification('bottomLeft', 'Invalid Email');
      return false;
    }
    return true;
  };

  const sendCode = () => {
    if (!validateEmail(email)) {
      return;
    }

    const emailInfo = {
      email: email,
    };

    sendCodeSeccess();
    sendVerificationMuted({requestBody: emailInfo});
  };

  const resetPassword = () => {
    if (!validateEmail(email)) {
      return;
    }

    if (password !== confirmPassword) {
      openErrorNotification('bottomLeft', 'Password does not match.');
      return;
    }

    setLoading(true);
    sendChangePasswordRequest({
      requestBody: {email: email, newPassword: password, otp: code},
    });
  };

  return (
    <div
      className="forgotPassword-wrapper"
      style={{backgroundImage: `url(${ForgotPasswordBackground})`}}>
      <div className="forgotPassword-box">
        <h2 className="forgotPassword-box-header-base forgotPassword-box-sub-header">
          Reset your password
        </h2>
        <div className="forgotPassword-box-form">
          <p className="forgotPassword-box-form-text">Email</p>
          <Input
            onChange={e => setEmail(e.target.value)}
            value={email}
            className="forgotPassword-box-form-input"
          />
          <p className="forgotPassword-box-form-text">New Password</p>
          <Input.Password
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="forgotPassword-box-form-input"
            maxLength={25}
          />
          <p className="forgotPassword-box-form-text">Confirm New Password</p>
          <Input.Password
            onChange={e => setConfirmPW(e.target.value)}
            value={confirmPassword}
            className="forgotPassword-box-form-input"
            maxLength={25}
          />
          <p className="forgotPassword-box-form-text">
            Verification Code (OTP)
          </p>
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
            className="forgotPassword-box-form-code"
          />
        </div>
        <Button
          className="forgotPassword-box-reset"
          type="primary"
          loading={loading}
          onClick={resetPassword}>
          Reset Password
        </Button>
      </div>
      <ResetPerson className="forgotPassword-wrapper-person" />
    </div>
  );
};

export default ForgotPassword;
