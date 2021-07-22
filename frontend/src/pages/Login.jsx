import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';

const Login = () => {
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const [message, setmessage] = useState("");
    const history = useHistory();

    function handlesubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { name: name, password: pass })
            .then(response => {
                setmessage(response.data.message);
                if (response.data.accessToken) {
                    localStorage.setItem("jwt", JSON.stringify({ token: response.data.accessToken }));
                }
                history.push("/");
            })
            .catch(error => console.error('There was an error!', error));
        setname("");
        setpass("");
        setTimeout(() => {
            setmessage("");
        }, 1000);
    }
    return (
        <div>
            <h1>login</h1>
            <br />
            <br />
            <form >
                <input
                    value={name}
                    onChange={event => setname(event.target.value)}
                    placeholder="name"
                />
                <br />
                <br />
                <input
                    value={pass}
                    onChange={event => setpass(event.target.value)}
                    placeholder="password"
                />
                <br />
                <br />
                <input onClick={handlesubmit} type="submit" />
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login
