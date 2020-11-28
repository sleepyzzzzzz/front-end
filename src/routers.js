import React from 'react';
import { connect } from "react-redux";
import App from './component/app/app';
import Login from './component/app/login/login';
import Register from './component/app/register/register';
import Main from './component/main/main';
import Profile from './component/profile/profile';

const Routers = ({ path }) => {
    if (path === '/' || path === '/login') {
        return (
            <div>
                <App />
                <Login />
            </div>
        );
    }
    else if (path === '/register') {
        return (
            <div>
                <App />
                <Register />
            </div>
        );
    }
    else if (path === '/main') {
        return (
            <div>
                <Main />
            </div>
        );
    }
    else if (path === '/profile') {
        return (
            <div>
                <Profile />
            </div>
        );
    }
}

export default connect((state) => {
    return { path: state.path }
})(Routers)