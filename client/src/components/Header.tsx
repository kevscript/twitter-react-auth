import React from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  authenticated: boolean,
  handleAuth: () => void
}

const Header: React.FC<HeaderProps> = ({ authenticated, handleAuth }) => {

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("http://localhost:4000/auth/twitter", "_self");
  }

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage component
    window.open("http://localhost:4000/auth/logout", "_self");
    handleAuth();
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <div>
        {
          authenticated
            ? <button onClick={handleLogout}>Logout</button>
            : <button onClick={handleLogin}>Login</button>
        }
      </div>
    </div>
  )
};

export default Header;