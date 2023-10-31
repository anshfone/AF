import React from "react"
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";


type setLogined = React.Dispatch<React.SetStateAction<boolean>>

interface NavBarProps {
    logined: boolean,
    setLogined: setLogined;
}

const deleteCookie = (name: string) => {
    document.cookie = name +`=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

const NavBar: React.FC<NavBarProps> = ({ logined, setLogined}) => {

    let navigate: NavigateFunction = useNavigate();

    const handleLogout = (setLogined: setLogined): void => {
        setLogined(false)
        deleteCookie("jwtToken")
        location.reload()
    }
 
    return (
        <>
          <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
            <div className="max-w-screen-xl flexitems-center justify-between mx-auto p-4">
              <a href="#" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Foneace</span>
              </a>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 md:dark:bg-transparent md:dark:text-white ml-80" aria-current="page">Home</a>
                  </li>
                  {logined && (
                    <li>
                      <NavLink to={`/createPost`} className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>Create Post</NavLink>
                    </li>
                  )}
                  {logined && (
                    <li>
                      <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent" onClick={() => handleLogout(setLogined)}>Logout</a>
                    </li>
                  )}
                  {!logined && (
                    <li>
                      <a href="login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent">Login</a>
                    </li>
                  )}
                  {!logined && (
                    <li>
                      <a href="signup" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent">Signup</a>
                    </li>
                  )}
                  <li>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-40 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-10"
                        />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
      
}

export default NavBar