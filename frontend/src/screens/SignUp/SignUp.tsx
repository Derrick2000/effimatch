import React from 'react'
import axios from 'axios'

import { Input, Button } from 'antd';

const Signup: React.FC<any> = (props) => {

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('')
    const [ username, setUsername ] = React.useState('')

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

    return(
        <div>
            <p>name</p>
            <Input 
                onChange={e => setUsername(e.target.value)}
                value={username}
            />
            <p>email</p>
            <Input 
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <p>password</p>
            <Input 
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <Button onClick={e => signUp()}>Log In</Button>
        </div>
    )
}

export default Signup;