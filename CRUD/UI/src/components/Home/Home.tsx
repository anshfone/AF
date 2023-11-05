import React,{ useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios, {AxiosResponse} from "axios";
import { Post, PostComponent } from "../Post/Post";
import { Outlet } from 'react-router-dom';
import { getCookie } from "../../utils/cookies";

const Home: React.FC<{}> = ({}) => {

  const [posts,setPosts] = useState<Post[]>([])
  const [queryPosts,setQueryPosts] = useState<Post[]>([])
  const [logined,setLogined] = useState(false)
  const [searchedString,setSearchedString] = useState("")

  useEffect(() => {
    console.log("UseEf")
    const getPosts = async (): Promise<void> => {
      const jwtToken: string | null = getCookie('jwtToken')
      if (jwtToken) { 
        const postsResponse: AxiosResponse<any,any> = await axios.get("http://localhost:3000/api/posts/get",{ headers: { jwtToken: jwtToken}})
        console.log(postsResponse.data)
        const postsData: Post[] = postsResponse.data.posts
        setPosts(postsData)
        setLogined(true)
      } 
    }
    getPosts()
  },[])

    return (
      <>
        <Navbar logined={logined} searchedString={searchedString} setLogined={setLogined} setQueryPosts={setQueryPosts} setSearchedString={setSearchedString}/>
        {searchedString.length && logined ? (
          <div>
            {queryPosts.map((post: Post, index: number) => (
              <div key={index}>
                <PostComponent post={post}/>
              </div>
            ))}
          </div>
        ) : posts.length && logined ? (
          <div>
            {posts.map((post: Post, index: number) => (
              <div key={index}>
                <PostComponent post={post}/>
              </div>
            ))}
          </div>
        ): <p>No Posts Available</p>}
        <Outlet/>
    </>
    )
}
export default Home