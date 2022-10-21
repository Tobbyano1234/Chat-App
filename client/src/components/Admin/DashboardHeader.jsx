import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { mainAxios } from '../Axios';


const DashboardHeader = () => {
  const loggedIn = localStorage.getItem("tokenStore")

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/dashboard" className="nav-link">Home</a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {loggedIn &&
            < li className="nav-item">
              <a href="/logout" className="nav-link">Logout</a>
            </li>
          }
          {!loggedIn &&
            < li className="nav-item">
              <a href="/login" className="nav-link">Login</a>
            </li>
          }
        </ul>
      </nav>
    </div>

  )
}

export default DashboardHeader