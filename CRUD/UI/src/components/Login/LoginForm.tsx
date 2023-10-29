import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC<{}> = ({}) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };
    
    try {
      const responseData = await axios.post('http://localhost:3000/api/users/login', userData);
      console.log(responseData);

      if (responseData.data.status === 200) {
        const token: string = responseData.data.token;
        document.cookie = `jwtToken=${token}; path=/`;
        return navigate("/");
      }
      else {
        setError(responseData.data.message)
        toast.error(`${error}`, {
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
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form className="text-black">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} />
        <input type="submit" value="Submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default LoginForm;
