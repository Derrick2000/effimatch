import React from 'react'
import axios from 'axios'

import { Input, Button } from 'antd';

const SignIn: React.FC<any> = (props) => {

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('')

    const login = () => {
        const userInfo = {
            email: email,
            password: password
        }
        const URL = 'http://localhost:8080/login' // this is the login URL of our backend
        axios.post(URL, userInfo)
        .then(r => {
            const jwtToken = r.headers.authorization // the jwt token
            localStorage.setItem('jwtToken', jwtToken) // store token in browser local storage
        })
    }

    return(
        <div>
            <p>email</p>
            <Input 
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <p>password</p>
            <Input.Password 
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <Button onClick={e => login()}>Log In</Button>
        </div>
    )
}

export default SignIn;