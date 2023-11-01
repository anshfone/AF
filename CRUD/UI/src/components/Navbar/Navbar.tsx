import axios from "axios";
import React, { useEffect, useState } from "react"
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import { Post } from "../Post/Post";


type setLogined = React.Dispatch<React.SetStateAction<boolean>>
type setPosts =  React.Dispatch<React.SetStateAction<Post[]>>
type setSearchedString = React.Dispatch<React.SetStateAction<string>>
interface NavBarProps {
    logined: boolean,
    searchedString: string,
    setLogined: setLogined,
    setQueryPosts: setPosts,
    setSearchedString: setSearchedString
}

const deleteCookie = (name: string) => {
    document.cookie = name +`=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

const NavBar: React.FC<NavBarProps> = ({ logined, searchedString, setLogined, setQueryPosts, setSearchedString }) => {

    let navigate: NavigateFunction = useNavigate();

    const handleLogout = (setLogined: setLogined): void => {
        setLogined(false)
        deleteCookie("jwtToken")
        location.reload()
    }

    useEffect(() => {
      const searchPosts = async (searchedString: string) => {
        const jwtToken: string | null = getCookie('jwtToken')
        const searchData = {toBeSearched: searchedString}
        const searchResponse = await axios.post("http://localhost:3000/api/posts/search", searchData, {headers: {jwtToken: jwtToken}})
        return searchResponse.data.data
      } 
      searchPosts(searchedString).then((posts: Post[]) => setQueryPosts(posts))
    },[searchedString])
 
    return (
        <>
          <nav className="bg-white border-gray-200 dark:bg-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FoneAce</span>
            </a>
            {logined && (
              <div className="flex md:order-2">
              <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                <span className="sr-only">Search</span>
              </button>
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." value={searchedString} onChange={(e) => setSearchedString(e.target.value)}/>
                </div>
              </div>
            )}
              <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ml-4" id="navbar-search">
                {/* <div className="relative mt-3 md:hidden">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
                </div> */}
                <ul className="font-medium flex p-4 md:p-0 mt-4 mr-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
                  <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                  </li>
                  {logined && (
                    <li>
                      <NavLink to={`/createPost`} className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Create Post</NavLink>
                    </li>
                  )}
                  {logined && (
                    <li>
                      <a href="#" className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`} onClick={() => handleLogout(setLogined)}>Logout</a>
                    </li>
                  )}
                  {!logined && (
                    <li>
                      <a href="login" className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Login</a>
                    </li>
                  )}
                  {!logined && (
                    <li>
                      <a href="signup" className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Signup</a>
                    </li>
                  )}
                  </ul>
              </div>
            </div>
          </nav>
        </>
      );
      
}

export default NavBar