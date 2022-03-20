import { AuthContext } from "context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";

const Navbar = () => {
  // Context
  const {setIsAuth} = useContext(AuthContext)

  // Functions (Local BLL)
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div className="navbar">
      <MyButton onClick={logout}>Выйти</MyButton>

      <nav className="navbar__links">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </nav>
    </div>
  );
};

export default Navbar;
