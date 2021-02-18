import React from 'react'
import axios from 'axios'

const SignIn: React.FC<any> = (props) => {

    React.useEffect(() => {
        const userInfo = {
            email: 'dema@ucsd.edu',
            password: 'mdk20010220'
        }
        axios.post('http://localhost:8080/login', userInfo)
        .then(r => console.log(r))
    }, [])

    return(
        <div>

        </div>
    )
}

export default SignIn;