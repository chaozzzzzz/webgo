import React, { useState } from 'react';
import { Layout, Image, Typography } from "antd";
import Logo from "./images/logo.png";
import Home from './components/Home';
import styles from './styles';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import Logout from './pages/Logout';
import { Button } from "react-bootstrap";
import axios from 'axios'
import StoryForm from './components/StoryForm/StoryForm';
import "bootstrap/dist/css/bootstrap.min.css";

const { Title } = Typography;
const { Header, Footer } = Layout;

const App = () => {
    // const [redirect, setRedirect] =  useState(false)
    // const logoutClick = async (e) => {
    //     e.preventDefault();

    //     await axios.post('http://localhost:5001/user/logout');

    //     setRedirect(true);
    // }
    // if(redirect) {
    //     return <Navigate to={'/'}/>;
    // }
    return (
        <Layout style={styles.layout}>
            <Header style={styles.header}>
                <Image style={styles.image} preview={false} src={Logo} width={45} />
                &nbsp;
                <Title style={styles.title}>Webgo</Title>

                {/* <div>
                <Button variant="danger" onClick={logoutClick}>Logout</Button>
            </div> */}
            </Header>


            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post" element={<StoryForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </BrowserRouter >
            <Footer style={styles.footer}>2022 Webgo</Footer>
        </Layout>
    )
}

export default App;