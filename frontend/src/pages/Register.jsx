import React, { useState } from "react";
import axios from "axios";
const initial = {
  name: "",
  email: "",
  password: "",
};
function Register() {
  const [data, setdata] = useState({});
  const [message, setmessage] = useState("");
  function handlechange(e) {
    const { value, name } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  }
  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/register", data)
      .then((res) => {
        // console.log(res);
        setmessage(res.data.message);
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
    // .then(response => console.log(response.data))

    setTimeout(() => {
      setmessage("");
    }, 1000);
    setdata(initial);
  }
  return (
    <div>
      <h1>register</h1>
      <br />
      <br />
      <form>
        <input
          name="name"
          value={data.name}
          onChange={handlechange}
          placeholder="name"
        />
        <br />
        <br />
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
      <br />
      <br />
      <p>{message}</p>
    </div>
  );
}

export default Register;
