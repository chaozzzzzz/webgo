import { NavLink } from "react-router-dom";
import { getStories } from "../actions/stories";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function Menu ({user}) {
   const [selectedId, setSelectedId] = useState(null);
  console.log(user)
  return (
  <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
  {/* <div className="position-sticky pt-3 sidebar-sticky"> */}
    <ul className="nav flex-column">

    { (user && user.loggedIn) &&
      <li className="nav-item">
        <NavLink className="nav-link">
          <span data-feather="home" className="align-text-bottom"></span>
          {user.user.username}
        </NavLink>
      </li>
      }
      { (user && user.loggedIn) &&
      <li className="nav-item">
        <NavLink to={'/'} className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          Story Square
        </NavLink>
      </li>
      }
      { (user && user.loggedIn) &&
      <li className="nav-item">
        <NavLink to={{pathname:'/post',}} 
        className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          New Story
        </NavLink>
      </li>
      }
      { !(user && user.loggedIn) &&
        <li className="nav-item">
        <NavLink to={'/login'} className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          Sign In
        </NavLink>
      </li>
      }
      { (user && user.loggedIn) &&
      <li className="nav-item">
        <NavLink to={'/logout'} className="nav-link" aria-current="page">
          <span data-feather="home" className="align-text-bottom"></span>
          Sign Out
        </NavLink>
      </li>
      }
    </ul>
  {/* </div> */}
</nav>
  )
}

export default Menu