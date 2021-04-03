import React from 'react'
import axios from 'axios'

import { RadiusBottomleftOutlined } from '@ant-design/icons';
import {ReactComponent as SignUpBackGround} from '../../images/sign_bg.svg';
import {ReactComponent as SignUpPerson} from '../../images/sign_up_person.svg';

import { Input, Button, notification } from 'antd';

import './styles/signup.less';

const { Search } = Input;

const openErrorNotification = (placement: any, errorMsg: string) => {
    notification.info({
      message: "Sign Up",
      description:
        'An error has occured.\n' + errorMsg,
      placement,
    });
};

const openSuccessNotification = (placement: any) => {
    notification.info({
      message: "Sign Up",
      description:
        'Signed up successfully.',
      placement,
    });
};

const openCodeNotification = (placement: any) => {
    notification.info({
      message: "Code",
      description:
        'Send code successfully.',
      placement,
    });
};


const Signup: React.FC<any> = (props) => {

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ username, setUsername ] = React.useState('');
    const [ confirmPassword, setConfirmPW ] = React.useState('');
    const [ code, setCode ] = React.useState('');
    const [ loading, setLoading ] = React.useState(false);

    const invalid = (mail: string, username: string, password: string, confirmPassword: string) => {
        return !(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(mail)) ||
                mail === '' ||
                username === '' ||
                password === '' ||
                !password.match(/^[0-9a-z]+$/) || 
                password.length < 8 ||
                code === '' ||
                confirmPassword !== password;
    }

    const sendCode = () => {
        if(!(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email))){
            openErrorNotification('bottomLeft', 'Invalid Email');
            return;
        }

        const emailInfo = {
            email: email,
        }
        const URL = 'http://localhost:8080/v1/send-verification'
        axios.post(URL, emailInfo, {withCredentials:true})
        .then(r => {
            console.log('send verification res', r)
            console.log('sign up success: ', r.data)
            openCodeNotification('bottomLeft');
        })
        .catch(e => {
            console.error('send code error: ', e)
            openErrorNotification('bottomLeft', e);
        })
    }

    const signUp = () => {
        if(invalid(email, username, password, confirmPassword)) {
            openErrorNotification('bottomLeft', 'Invalid input');
            return;
        }
        setLoading(true);
        const URL = 'http://localhost:8080/register'

        const userInfo = {
            username: username,
            email: email,
            password: password,
            code: Number(code)
        }
        console.log(Number(code))
        axios.post(URL, userInfo, {withCredentials:true})
        .then(r => {
            console.log('sign up success: ', r.data)
            openSuccessNotification('bottomLeft');
            setLoading(false);
            window.location.href = '/';
        })
        .catch(e => {
            console.error('sign up error: ', e.response.data)
            openErrorNotification('bottomLeft', e.response.data);
            setLoading(false);
        })
    }
    const signWithLinkedIn = () => {
        console.log("TODO");
    }

    return(
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
                        placeholder="Enter Code Here"
                        enterButton="Send Code"
                        size="small"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        onSearch={()=>sendCode()}
                        className="signup-box-form-code"
                        
                    />
                </div>
                <Button type="primary" className="signup-box-signupBut" onClick={e => signUp()} loading={loading}>Create Account</Button>
                <Button className="signup-box-linkedinBut" onClick={e=> signWithLinkedIn()}>Continue with LinkedIn</Button>
            </div>
            
        </div>
    )
}

export default Signup;