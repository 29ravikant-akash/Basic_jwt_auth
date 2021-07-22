import React, { useState } from 'react'
import axios from 'axios';
function Register() {
    const [name, setname] = useState("");
    const [pass, setpass] = useState("");
    const [message, setmessage] = useState("");
    function handlesubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name: name, password: pass })
            .then(response => setmessage(response.data.message))
            .catch(error => console.error('There was an error!', error));
        // .then(response => console.log(response.data))
        setname("");
        setpass("");
        setTimeout(() => {
            setmessage("");
        }, 1000);
    }
    return (
        <div>
            <h1>register</h1>
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
            <br />
            <br />
            <p>{message}</p>
        </div>
    )
}

export default Register
