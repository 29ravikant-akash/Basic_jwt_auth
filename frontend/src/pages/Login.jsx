import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const initial = {
  email: "",
  password: "",
};
const Login = () => {
  const [data, setdata] = useState({});
  const [message, setmessage] = useState("");
  const history = useHistory();

  function handlechange(e) {
    const { value, name } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  }
  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", data)
      .then((res) => {
        setmessage(res.data.message);
        if (res.data.accessToken) {
          localStorage.setItem(
            "jwt",
            JSON.stringify({ token: res.data.accessToken })
          );
        }
        setTimeout(() => {
          history.push("/");
        }, 500);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          setmessage(error.response.data.message);
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });

    setTimeout(() => {
      setmessage("");
    }, 1000);
    setdata(initial);
  }
  return (
    <div>
      <h1>login</h1>
      <br />
      <br />
      <form>
        <input
          name="email"
          value={data.email}
          onChange={handlechange}
          placeholder="email"
        />
        <br />
        <br />
        <input
          name="password"
          value={data.password}
          onChange={handlechange}
          placeholder="password"
          type="password"
        />
        <br />
        <br />
        <input onClick={handlesubmit} type="submit" />
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
