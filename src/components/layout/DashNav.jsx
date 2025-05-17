import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function DashNav() {
  return (
    <>
        <nav className="dashnavbar">
          <ul className="dashnavbar-nav">
            <li className="logo">
              <img src={logo} alt="Wink Logo" />
              <Link title="Dashboard" to="/landing" className="dashnav-link">
                <span className="link-text">Wink</span>
              </Link>
            </li>
            <li className="dashnav-item">
              <Link title="Dashboard" to="/" className={location.pathname === '/' ? 'dashnav-link active' : 'dashnav-link '}>
                <i className={location.pathname === '/' ? 'bi-house-door-fill' : 'bi-house-door'}></i>
                <span className="link-text">Home</span>
              </Link>
            </li>
            <li className="dashnav-item">
              <Link title="Post" to="/post" className={location.pathname === '/post' ? 'dashnav-link active' : 'dashnav-link '}>
                <i className={location.pathname === '/post' ? 'bi-plus-circle-fill' : 'bi-plus-circle'}></i>
                <span className="link-text">Post</span>
              </Link>
            </li>
            <li className="dashnav-item">
              <Link title="Chat" to="/chat" className={location.pathname === '/chat' ? 'dashnav-link active' : 'dashnav-link '}>
                <i className={location.pathname === '/chat' ? 'bi-chat-dots-fill' : 'bi-chat-dots'}></i>
                <span className="link-text">Chat</span>
              </Link>
            </li>
            {/* <li className="dashnav-item">
              <Link title="Moderator Dashboard" to="/mod" className={location.pathname === '/mod' ? 'dashnav-link active' : 'dashnav-link '}>
                <i className={location.pathname === '/mod' ? 'bi-activity' : 'bi-activity'}></i>
                <span className="link-text">Dashboard</span>
              </Link>
            </li> */}
            <li className="dashnav-item">
              <Link title="Settings" to="/settings" className={location.pathname === '/settings' ? 'dashnav-link active' : 'dashnav-link '}>
                <i className={location.pathname === '/settings' ? 'bi-gear-fill' : 'bi-gear'}></i>
                <span className="link-text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
    </>
  );
}
