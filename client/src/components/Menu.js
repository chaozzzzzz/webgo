import React from "react";
import { NavLink } from "react-router-dom";

const Menu = (props) => {
  return (
  <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
  <div className="position-sticky pt-3 sidebar-sticky">
    <ul className="nav flex-column">
      <li className="nav-item">
        <NavLink to={'/'} className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          Story Square
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/post'} className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          New Story
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/logout'} className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          Sign Out
        </NavLink>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default Menu