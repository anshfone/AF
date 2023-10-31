import React,{ useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios, {AxiosResponse} from "axios";
import { Post, PostComponent } from "../Post/Post";
import { Outlet } from 'react-router-dom';
import { getCookie } from "../../utils/cookies";

const Home: React.FC<{}> = ({}) => {

  const [posts,setPosts] = useState<Post[]>([])
  const [logined,setLogined] = useState(false)

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      const jwtToken: string | null = getCookie('jwtToken')
      if (jwtToken) { 
        const postsResponse: AxiosResponse<any,any> = await axios.get("http://localhost:3000/api/posts/get",{ headers: { jwtToken: jwtToken}})
        const posts: Post[] = postsResponse.data
        setPosts(posts)
        setLogined(true)
      } 
    }
    getPosts()
  },[getCookie('jwtToken')])

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