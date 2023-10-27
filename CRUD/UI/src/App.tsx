import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignUpForm from './components/SignUp/SignUpForm'


const getCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1); // Return the cookie's value
    }
  }
  return null; // Return null if the cookie is not found
}

const getPosts = () => {
  const jwtToken: string | null = getCookie('jwtToken')
  console.log(jwtToken)
}

function App() {
  return (
    <>
      <div>
        <SignUpForm/>
        <LoginForm/>
        <button onClick={getPosts}>Get Posts</button>
      </div>
    </>
  )
}
export default App
