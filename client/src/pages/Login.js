import React, {useState} from 'react'
import "../Login.css";
import axios from 'axios';
import {Navigate} from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";


const Login = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/user/login`
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] =  useState(false)
    const [register, setRegister] =  useState(false)

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(url, {
            email,
            password
        });

        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/'}/>;
    }
    if(register) {
        return <Navigate to={'/register'}/>;
    }

    return (
        
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@exmaple.com"
                            onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn-group" type="submit">Sign in</button>
                <button className="btn-group" type="submit" onClick={()=>{
                    setRegister(true)
                }}>Register</button>
            </form>
        </main>           
    );
};

export default Login