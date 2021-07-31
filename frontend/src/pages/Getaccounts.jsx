import React, { useState } from "react";
import axios from "axios";

const Getaccounts = () => {
  const [data, setdata] = useState([]);
  axios
    .get("http://localhost:3001/user/getaccinfo")
    .then((res) => {
      // console.log(res.data.user);
      setdata(res.data.user);
    })
    .catch((error) => console.error("There was an error!", error));
  return (
    <div>
      <br />
      <br />
      <span> {"user names : " + data.map((user) => user.name)}</span>
      <br />
      <span> {"user emails : " + data.map((user) => user.email)}</span>
    </div>
  );
};

export default Getaccounts;
