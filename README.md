# Basic_jwt_auth
This is just part of web security
Some helpful code : <br />

***1. signing jwt(sending jwt from server to client)*** <br />

To achieve this: <br />

1.  const payload = { id: user.id, name: user.name }; <br />
    let token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1m' }); <br />
    res.json({ <br />
    accessToken: token, <br />
    message: "Logined succesfully" <br />
    }); <br />
2.  axios.post('http://localhost:3001/login', { name: name, password: pass }) <br />
    .then(response => { <br />
        setmessage(response.data.message); <br />
        if (response.data.accessToken) { <br />
            localStorage.setItem("jwt", JSON.stringify({ token: response.data.accessToken })); <br />
        } <br />
        history.push("/"); <br />
    }) <br />
    .catch(error => console.error('There was an error!', error)); <br />

***2. verifying jwt(sending jwt from client to server)***  <br />

Method 1: Works like a magic(simple and easy) <br />

let token = localStorage.getItem("jwt"); <br />
let decodedToken = jwt_decode(token); <br />
let currentDate = new Date(); <br />
// JWT exp is in seconds  <br />
if (decodedToken.exp * 1000 < currentDate.getTime()) {  <br />
localStorage.removeItem("jwt") <br />
console.log("Token expired."); <br />
return false; <br />
} else { <br />
console.log("Valid token"); <br />
return true; <br />
} <br />

Method 2:  <br />

1.  function checkAuth() {  <br />
    const token = JSON.parse(localStorage.getItem("jwt")).token; <br />
    const headers = { <br />
        'Authorization': token <br />
    }; <br />
    axios.get('http://localhost:3001/checkauth', { headers }) <br />
      .then(response => { <br />
          console.log(response); <br />
          if(response.data.message!=null) <br />
          setmessage(response.data.message); <br />
          else if(response.data.name!=null) <br />
          setmessage(response.data.name); <br />
          setTimeout(() => { <br />
              setmessage(""); <br />
          }, 1000); <br />
      }) <br />
      .catch(error => console.error('There was an error!', error)); <br />
    } <br />

2.  const token = req.headers.authorization; <br />
    if (!token) { <br />
      console.log("there is no token came from frontend"); <br />
    } <br />
    else { <br />
      jwt.verify(token, process.env.SECRET, function (err, decoded) { <br />
        if (err) { <br />
          console.log(err); <br />
          res.send(err); <br />
        } <br />
        else { <br />
          console.log(decoded); <br />
          res.send(decoded); <br />
        } <br />
      }); <br />
    } <br />

***3. redirecting to private page just after clicking login submit button*** <br />

To achieve this: <br />
a. import { useHistory } from 'react-router'; <br />
b. const history = useHistory(); <br />
c. history.push("/"); <br />

***4. redirecting to login page just after clicking logout submit button*** <br />

To achieve this: <br />
a. import { useHistory } from 'react-router'; <br />
b. const history = useHistory(); <br />
c. history.push("/login"); <br />
