import React,{ useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios, {AxiosResponse} from "axios";
import { Post, PostComponent } from "../Post/Post";
import { Outlet } from 'react-router-dom';
import { getCookie } from "../../utils/cookies";
import Pagination from "../Pagination/Pagination";

const Home: React.FC<{}> = ({}) => {

  const [posts,setPosts] = useState<Post[]>([])
  const [queryPosts,setQueryPosts] = useState<Post[]>([])
  const [logined,setLogined] = useState(false)
  const [searchedString,setSearchedString] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [totalPages,setTotalPages] = useState(postsPerPage)

  const getPosts = async (skip: number): Promise<void> => {
    const jwtToken: string | null = getCookie('jwtToken')
    if (jwtToken) { 
      const postsResponse: AxiosResponse<any,any> = await axios.get("http://localhost:3000/api/posts/get",{ headers: { jwtToken: jwtToken}, params: {
        skip: skip, 
        limit: postsPerPage, 
      }})
      const postsData: Post[] = postsResponse.data.posts
      setPosts(postsData)
      setLogined(true)
      setTotalPages(postsResponse.data.totalPosts)
    } 
  }

  useEffect(() => {
    getPosts((currentPage-1)*postsPerPage)
  },[currentPage])

  return (
    <>
      <Navbar logined={logined} searchedString={searchedString} currentPage={currentPage} postsPerPage = {postsPerPage} 
        setLogined={setLogined} setQueryPosts={setQueryPosts} setSearchedString={setSearchedString}/>
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
      <Pagination currentPage={currentPage} totalPages={Math.ceil(totalPages / postsPerPage)} onPageChange={setCurrentPage}/>
      <Outlet/>
  </>
  )
}
export default Home