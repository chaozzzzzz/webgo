import React, { useState } from 'react'
// import "../Login.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/user/login`
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [register, setRegister] = useState(false)

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(url, {
            email,
            password
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }
    if (register) {
        return <Navigate to={'/register'} />;
    }

    return (

        <main className="form-signin">
            {/* <form onSubmit={submit}>
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

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={() => {
                    setRegister(true)
                }}>if new, Register here</button>
            </form> */}

            <Form>
                <div className="form-floating">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="h3 mb-3 fw-normal">Please sign in</Form.Label>


                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </div>


                <div className="form-floating">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </div>

                <div className='btn-group'>
                    <Button className="btn btn-primary" variant="primary" type="submit">
                        Sign In
                    </Button>
                    <Button className="btn btn-default" variant="primary" type="submit">
                        Resigter
                    </Button>
                </div>
            </Form>
        </main>


        // <Form>
        //     <Form.Group className="mb-3" controlId="formBasicEmail">
        //         <Form.Label>Please sign in</Form.Label>
        //         <Form.Control type="email" placeholder="Enter email" />
        //         <Form.Text className="text-muted">
        //             We'll never share your email with anyone else.
        //         </Form.Text>
        //     </Form.Group>

        //     <Form.Group className="mb-3" controlId="formBasicPassword">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control type="password" placeholder="Password" />
        //     </Form.Group>

        //     <Button variant="primary" type="submit">
        //         Sign In
        //     </Button>
        //     <Button variant="primary" type="submit">
        //         Resigter
        //     </Button>
        // </Form>


        // <main>
        //     <Form>
        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control type="email" placeholder="Enter email" />
        //             <Form.Text className="text-muted">
        //                 We'll never share your email with anyone else.
        //             </Form.Text>
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" placeholder="Password" />
        //         </Form.Group>
        //         <Form.Group className="mb-3" controlId="formBasicCheckbox">
        //             <Form.Check type="checkbox" label="Check me out" />
        //         </Form.Group>
        //         <Button variant="primary" type="submit">
        //             Submit
        //         </Button>
        //     </Form>
        // </main>



    );
};

export default Login