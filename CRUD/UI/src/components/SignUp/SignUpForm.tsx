import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./SignUpForm.css";

const SignUpForm: React.FC<{}> = ({}) => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername] = useState("")

  const validateEmail = (email: string): boolean => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regex)) {
      return true
    }
    return false
  }

  const handleUsernameChange = (e: any): void => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault()
    if (!validateEmail(email)) {
      toast.error(`Invalid Email`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    }
    const userData = {username: username,email: email, password: password}
    const responseData = await axios.post('http://localhost:3000/api/users/signUp',userData)
    console.log(responseData)
    if (responseData.data.status == 200) {
      return navigate("/login")
    }
    else {
      toast.error(`${responseData.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <div id="login-form">
      <h1>SignUp</h1>
      <form className="text-black">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange}></input>
        <label htmlFor="username">Email</label>
        <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} />
        <button type="button" value="Submit" onClick={handleSignup} className= {`bg-blue-500 text-white py-2 px-4 rounded ${
    !email || !password || !username ? 'opacity-50 cursor-not-allowed' : ''}`}  disabled={!email || !password || !username}>Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;