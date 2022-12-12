import React, { useState} from 'react'
import "../Login.css";
import axios from 'axios';
import {Navigate} from "react-router-dom";

const Logout = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/user/logout`
    const [redirect, setRedirect] =  useState(false)

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(url);

        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/login'}/>;
    }

    return (
        
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Are you sure?</h1>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Log out</button>
            </form>
        </main>           
    );
};

export default Logout