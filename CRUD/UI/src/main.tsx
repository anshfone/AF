import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Home from './components/Home/Home.tsx';
import './index.css'
import {createBrowserRouter,RouterProvider } from "react-router-dom";
import ErrorPage from './components/Error/ErrorPage.tsx';
import LoginForm from './components/Login/LoginForm.tsx';
import SignUpForm from './components/SignUp/SignUpForm.tsx';
import { ToastContainer } from 'react-toastify';
import CreatePost from './components/Post/createPost.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "createPost",
        element: <CreatePost/>
      }
    ]
  },
  {
    path: "login",
    element: <LoginForm/>
  },
  {
    path: "signup",
    element: <SignUpForm/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
    <App />
  </React.StrictMode>,
)
