import React, { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC<{}> = ({}) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEmailChange = (e: any): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any): void => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    const userData = { email: email, password: password };
    
    try {
      const responseData: AxiosResponse<any,any> = await axios.post('http://localhost:3000/api/users/login', userData);
      console.log(responseData);

      if (responseData.data.status === 200) {
        const token: string = responseData.data.token;
        document.cookie = `jwtToken=${token}; path=/`;
        return navigate("/");
      }
      else {
        setError(responseData.data.message)
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
        <button type="button" value="Submit" onClick={handleLogin} className= {`bg-blue-500 text-white py-2 px-4 rounded ${
    !email || !password ? 'opacity-50 cursor-not-allowed' : ''}`}  disabled={!email || !password}>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
