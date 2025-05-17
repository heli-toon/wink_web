import { useCallback, useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  const [showNavbarCollapse, setShowNavbarCollapse] = useState(false);
  const navbarRef = useRef(null);

  const handleToggleNavbarCollapse = () => {
    setShowNavbarCollapse(!showNavbarCollapse);
  };

  const handleWindowScroll = () => {
    if (window.scrollY > 25) {
      navbarRef.current.classList.add("header-scrolled");
    } else {
      navbarRef.current.classList.remove("header-scrolled");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);
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

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("isDarkTheme", !isDarkTheme);
  }, [isDarkTheme]);

  return (
    <>
      <header id="header" className="fixed-top" ref={navbarRef}>
        <div className="header-wrapper container d-flex align-items-center justify-content-lg-between space-between">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <Link className="logo me-auto me-lg-0" title="Home" href="/landing#">
              <img src={logo} alt="" className="img-fluid" />
            </Link>
            <h1 className="logo me-auto me-lg-0">
              <Link title="Landing" href="/">
                Wink
              </Link>
            </h1>
          </div>
          <nav id="navbar" className={`navbar order-last order-lg-0 ${showNavbarCollapse ? "navbar-mobile" : ""}`} >
            <ul>
              <li><a className="nav-link scrollto" href="/landing#about">About</a></li>
              <li><a className="nav-link scrollto" href="/landing#features">Features</a></li>
              {/* <li><a className="nav-link scrollto" href="#help">Help</a></li>*/}
              <li><a className="nav-link scrollto btned" title="Waitlist" href="/landing#waitlist">Join</a></li>
              <li className="theme-switcher">
                <label htmlFor="toggle" className="dark-toggle-text">
                  Switch Theme
                </label>
                <label htmlFor="toggle" className="toggle nav-link">
                  <input title="Theme" name="theme" id="toggle" type="checkbox" checked={isDarkTheme} onChange={toggleTheme}/>
                  <span className="slider"></span>
                </label>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={handleToggleNavbarCollapse} aria-label="Toggle navigation"></i>
          </nav>
        </div>
      </header>
    </>
  );
}
export default MainNavbar