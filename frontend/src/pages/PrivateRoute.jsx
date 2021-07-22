import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const PrivateRoute = ({ component: Component, ...rest }) => {

    function checkToken() {
        if (localStorage.getItem("jwt") !== null) {
            let token = localStorage.getItem("jwt");
            let decodedToken = jwt_decode(token);
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                localStorage.removeItem("jwt")
                console.log("Token expired.");
                return false;
            } else {
                console.log("Valid token");
                return true;
            }
        }
        else {
            return false;
        }
    }

    return (
        <Route {...rest}
            render={
                props => {
                    return (
                        checkToken() ?
                            <Component {...props} /> :
                            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
                }
            }
        />
    )
}
            // localStorage.getItem("jwt") ?