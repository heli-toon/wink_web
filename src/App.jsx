import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tos from './pages/Tos'
import Post from './pages/Post'
import Login from './pages/Login'
import Error404 from './pages/404'
import SignUp from './pages/SignUp'
import Privacy from './pages/Privacy'
import Landing from './pages/Landing'
import Blog0 from './pages/blogs/Blog0'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import NoInternet from './pages/NoInternet'
import ModDashboard from './pages/ModDashboard'
// import ProtectedRoute from "./components/ProtectedRoute"
import './styles/main.css'
import './styles/bootstrap-icons.min.css'

import { useEffect, useState } from 'react'
import Sitemap from './pages/Sitemap'

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isDarkTheme") === "true") {
      setIsDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/terms' element={<Tos />}></Route>
          {/* <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/post' element={<Post />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/mod' element={<ModDashboard />}></Route>
          <Route path='/landing' element={<Landing />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
          <Route path='/blog/wink-intro' element={<Blog0 />}></Route>
          <Route path='/nointernet' element={<NoInternet />}></Route>
          <Route path='/privacy-policy' element={<Privacy />}></Route>
          <Route path='/sitemap' element={<Sitemap />}></Route>
          <Route path='*' element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}