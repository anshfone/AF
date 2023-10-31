import React,{ useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Post, PostComponent } from "../Post/Post";
import { Outlet } from 'react-router-dom';
import { getCookie } from "../../utils/cookies";

// const getCookie = (cookieName: string) => {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.startsWith(cookieName + '=')) {
//         return cookie.substring(cookieName.length + 1);
//       }
//     }
//     return null; 
//   }

const Home: React.FC<{}> = ({}) => {

  const [posts,setPosts] = useState([])
  const [logined,setLogined] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      const jwtToken: string | null = getCookie('jwtToken')
      console.log(jwtToken)
      if (jwtToken) { 
        const postsResponse = await axios.get("http://localhost:3000/api/posts/get",{ headers: { jwtToken: jwtToken}})
        console.log(postsResponse.data)
        setPosts(postsResponse.data)
        setLogined(true)
      } 
    }
    getPosts()
  },posts)

    return (
      <>
        <Navbar logined={logined} setLogined={setLogined}/>
        {posts.length && logined? (
          <div>
            {posts.map((post: Post, index: number) => (
              <div key={index}>
                <PostComponent post={post}/>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available.</p>
        )}
        <Outlet/>
    </>
    )
}
export default Home