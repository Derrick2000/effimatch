import React from 'react'
import axios from 'axios'

import {ReactComponent as SignUpBackGround} from '../../images/sign_bg.svg';
import {ReactComponent as SignInPerson} from '../../images/sign_in_person.svg';

import { Input, Button, notification } from 'antd';

import './styles/signin.less';

const openErrorNotification = (placement: any, errorMsg: string) => {
    notification.info({
      message: 'Sign In',
      description:
        'An error has occured.\n' + errorMsg,
      placement,
    });
};

const openSuccessNotification = (placement: any) => {
    notification.info({
      message: 'Sign In',
      description:
        'Signed in successfully.',
      placement,
    });
};

const SignIn: React.FC<any> = (props) => {

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('')
    const [ loading, setLoading ] = React.useState(false);

    const login = () => {
        const userInfo = {
            email: email,
            password: password
        }
        setLoading(true);
        const URL = 'http://localhost:8080/login' // this is the login URL of our backend
        axios.post(URL, userInfo)
        .then(r => {
            const jwtToken = r.headers.authorization // the jwt token
            localStorage.setItem('jwtToken', jwtToken) // store token in browser local storage
            openSuccessNotification('bottomLeft');
            setLoading(false);
            window.location.href = '/';
        }).catch(e => {
            openErrorNotification('bottomLeft', 'Invalid login');
            setLoading(false);
        });
    }

    const signWithLinkedIn = () => {

    }

    return(
        <div className="signin-wrapper">

            <SignUpBackGround className="signin-wrapper-bg"/>
            

            <div className="signin-box">
                <h1 className="signin-box-header">
                    Log in to access thousands of potential referral opportunities.
                </h1>
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
                    <Button type="primary" className="signin-box-signinBut" onClick={e => login()} loading={loading}>Log In</Button>
                    <Button className="signin-box-linkedinBut" onClick={e=> signWithLinkedIn()}>Continue with LinkedIn</Button>
                </div>
            </div>


            <SignInPerson className="signin-wrapper-person"/>
        </div>
    )
}

export default SignIn;