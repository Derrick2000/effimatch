import React from 'react'
import axios from 'axios'

import {ReactComponent as SignUpBackGround} from '../../images/sign_bg.svg';
import {ReactComponent as SignUpPerson} from '../../images/sign_up_person.svg';

import { Input, Button } from 'antd';

import './styles/signup.less';

const Signup: React.FC<any> = (props) => {

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ username, setUsername ] = React.useState('');

    const signUp = () => {
        const URL = 'http://localhost:8080/v1/users'
        const userInfo = {
            username: username,
            email: email,
            password: password
        }
        axios.post(URL, userInfo)
        .then(r => {
            console.log('sign up success: ', r.data)
        })
        .catch(e => {
            console.error('sign up error: ', e)
        })
    }
    const signWithLinkedIn = () => {

    }

    return(
        <div className="signup-wrapper">
            <SignUpBackGround className="signup-wrapper-bg" />
            

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
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="signup-box-form-input"
                        maxLength={25}
                    />
                </div>
                <Button type="primary" className="signup-box-signupBut" onClick={e => signUp()}>Create Account</Button>
                <Button type="primary" className="signup-box-linkedinBut" onClick={e=> signWithLinkedIn()}>Continue with LinkedIn</Button>
            </div>
            <SignUpPerson className="signup-wrapper-person" />
            
        </div>
    )
}

export default Signup;