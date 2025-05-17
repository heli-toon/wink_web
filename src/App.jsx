import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Post from './pages/user/Post'
import Tos from './pages/public/Tos'
import Privacy from './pages/Privacy'
import Blog0 from './pages/blog/Blog0'
import Login from './pages/auth/Login'
import Settings from './pages/shared/Settings'
import SignUp from './pages/auth/SignUp'
import Error404 from './pages/public/404'
import NoInternet from './pages/public/NoInternet'
import Sitemap from './pages/public/Sitemap'
import Landing from './pages/public/Landing'
import Dashboard from './pages/user/Dashboard'
import ModDashboard from './pages/ModDashboard'
// import ProtectedRoute from "./components/ProtectedRoute"
import './styles/main.css'
import './styles/bootstrap-icons.min.css'

import { useEffect, useState } from 'react'

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