import React, {Component} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.min.css";

const url = `${process.env.REACT_APP_API_BASE_URL}/user/register`

class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    username = ''
    password = '';
    passwordConfirm = '';
    state = {
        redirect: false,
        register: true,
    };

    submit = async (e) => {
        e.preventDefault();

        await axios.post(url, {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            username: this.username,
            password: this.password,
            password_confirm: this.passwordConfirm
        });

        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/login'}/>;
        }
        if (!this.state.register) {
            return <Navigate to={'/login'}/>;
        }

        return (
            <main className="form-signin">
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <div className="form-floating">
                        <input className="form-control" placeholder="First Name"
                               onChange={e => this.firstName = e.target.value}
                        />
                        <label>First Name</label>
                    </div>

                    <div className="form-floating">
                        <input className="form-control" placeholder="Last Name"
                               onChange={e => this.lastName = e.target.value}
                        />
                        <label>Last Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="name@example.com"
                               onChange={e => this.email = e.target.value}
                        />
                        <label>Email address</label>
                    </div>

                    <div className="form-floating">
                        <input className="form-control" placeholder="Username"
                               onChange={e => this.username = e.target.value}
                        />
                        <label>Username</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password"
                               onChange={e => this.password = e.target.value}
                        />
                        <label>Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password Confirm"
                               onChange={e => this.passwordConfirm = e.target.value}
                        />
                        <label>Password Confirm</label>
                    </div>

                    <button className="btn-group" type="submit">Submit</button>
                    <button className="btn-group" type="submit" onClick={()=>{
                        this.setState({
                            register: false
                        });
                    }}>Sign in</button>
                </form>
            </main>
        );
    }
}

export default Register;