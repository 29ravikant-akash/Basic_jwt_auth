import React ,{useState}from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';

function Accountinfo() {
    const history = useHistory();
    function dologout() {
        localStorage.removeItem("jwt");
        history.push("/login");
    }
    return (
        <div>
            <h1>After login page</h1>
            <br />
            <br />
            <button onClick={dologout} type="submit" >logout</button>

        </div>
    )
}


export default Accountinfo
