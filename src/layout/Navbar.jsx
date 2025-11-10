import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  function logout() {
    localStorage.removeItem("userId");
    navigate("/signin");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">TaskManager</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {userId && (
              <>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Tasks</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/addTask" className="nav-link">Add Task</NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {userId ? (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={logout}>Logout</button>
              </li>
            ) : (
              <>
                <NavLink to="/signin" className="nav-link">Login</NavLink>
                <NavLink to="/signup" className="nav-link">Signup</NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
