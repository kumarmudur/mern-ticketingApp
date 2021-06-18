import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';

import useRequest from '../../hooks/use-request';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input 
                  className="form-control" 
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
            </div>
           { errors }
            <button className="btn btn-primary">Sign In</button>
        </form>
    );
};

export default SignIn;
