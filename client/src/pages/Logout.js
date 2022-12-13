import React, { useState} from 'react'
import "../Login.css";
import axios from 'axios';
import {Navigate} from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";


const Logout = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/user/logout`
    const [redirect, setRedirect] =  useState(false)
    const [back, setBack] =  useState(false)

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(url);

        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/login'}/>;
    }
    if(back) {
        return <Navigate to={'/'}/>;
    }

    return (
        
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Are you sure?</h1>
                <button className="btn-group" type="submit">Log out</button>
                <button className="btn-group" type="submit" onClick={()=>{setBack(true);}}>Go back</button>
            </form>
        </main>           
    );
};

export default Logout