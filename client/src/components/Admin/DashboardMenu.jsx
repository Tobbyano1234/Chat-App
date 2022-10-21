import React, { useEffect } from 'react'
import Logo from "../../images/logo.png"
import $ from 'jquery'
const DashboardMenu = () => {
  const avatar = localStorage.getItem("userAvatar")
  const userName = localStorage.getItem("userName")
  const id = localStorage.getItem("user")
  const isAdmin = localStorage.getItem("userType") === 'ADMIN' ? true: false;

  useEffect(() => {
    let url = window.location;
    $('ul.nav-treeview a').removeClass('active')
    $('ul.nav-treeview a').filter(function () {
      return this.href == url;
    }).addClass('active');

  })

  const loggedInStatus = localStorage.getItem("user")


  return (loggedInStatus &&
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/dashboard" className="brand-link">
          <img src={Logo} alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Zen</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={avatar} className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">{userName}</a>
            </div>
          </div>
          {/* SidebarSearch Form */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item menu-open">
                <a href="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p className="zen-nav-link">
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/dashboard" className="nav-link active">
                      <i class="icofont-home"></i>
                      <p className="zen-nav-link">Home</p>
                    </a>
                  </li>
                  {isAdmin && 
                  <li className="nav-item">
                    <a href="/admin" className="nav-link ">
                      <i className="icofont-ui-text-chat" />
                    </a>
                   </li> 
                  }
                  <li className="nav-item">
                    <a href="/forums" className="nav-link active">
                      <i class="icofont-list"></i>
                      <p className="zen-nav-link">Forums</p>
                      </a>
                  </li>
                  <li className="nav-item nav-closed">
                    <a href="#" className="nav-link ">
                      <i className="icofont-gear" />
                      <p className="zen-nav-link">Profile</p>
                    </a>
                    <ul className="nav nav-treeview" style={{ display: 'none' }}>
                      <li className="nav-item">
                        <a href={`/profile/view/${id}`} className="nav-link">
                          <i className="nav-icon far fa-circle text-info" />
                          <p className="zen-nav-link">View</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/profile/edit" className="nav-link">
                          <i className="nav-icon far fa-circle text-info" />
                          <p className="zen-nav-link">Edit</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="/chat" className="nav-link ">
                      <i className="icofont-ui-text-chat" />
                      <p className="zen-nav-link">Chat</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="/report" className="nav-link ">
                      <i class="icofont-flag-alt-2"></i>
                      <p className="zen-nav-link">Report</p>
                    </a>
                  </li>

                 
                </ul>
              </li>
                  
            </ul>
          </nav>
    
        </div>
    
      </aside>
    </div>

  )
}

export default DashboardMenu