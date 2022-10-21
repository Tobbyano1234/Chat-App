import React from 'react'
import { Link } from 'react-router-dom';

import DashboardHeader from './Admin/DashboardHeader'
import DashboardMenu from './Admin/DashboardMenu'
import Logo from '../images/logo.png'

const Header = () => {
    if (localStorage.getItem("tokenStore")) {
        return (
            <>
                <DashboardHeader />
                <DashboardMenu />
            </>
        )
    }
    else {
        return < GeneralHeader />
    }
}

const GeneralHeader = () => {

    return (
        <header className="header">
            <div id="rt-sticky-placeholder" style={{ height: '0px' }}></div>
            <div id="header-menu" className="header-menu menu-layout1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-2">
                            <div className="temp-logo">
                                <Link to="/" className='logo_title' style={{ textShadow: "0px 5px 5px 1px grey" }}>
                                    <img src={Logo} alt="Zen Community Logo" />
                                    <h3>Zen</h3>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-sm-7 col-8 d-flex justify-content-xl-start justify-content-center">
                            <div className="mobile-nav-item hide-on-desktop-menu">
                                <div className="mobile-toggler">
                                    <button type="button" className="mobile-menu-toggle">
                                        <i className="icofont-navigation-menu"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-3 col-sm-5 col-4 d-flex justify-content-end">
                            <div className="header-action">
                                <ul>
                                    <li className="login-btn">
                                        <Link to="/login" className="item-btn"><i className="fas fa-user">Login</i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


const Sidebar = () => {
    return (
        <>
            <header className="fixed-header">
                <div className="header-menu">
                    <div className="navbar">
                        <div className="nav-item d-none d-sm-block">
                            <div className="header-logo">
                                <a href="index.html">
                                    <img src={Logo} alt="Zen Community" />
                                </a>
                            </div>
                        </div>
                        <div className="nav-item nav-top-menu">
                            <nav id="dropdown" className="template-main-menu">
                                <ul className="menu-content">
                                    <li className="header-nav-item">
                                        <a href="index.html" className="menu-link active">
                                            Home
                                        </a>
                                    </li>
                                    <li className="header-nav-item">
                                        <a href="/#" className="menu-link have-sub">
                                            Community
                                        </a>
                                        <ul className="mega-menu mega-menu-col-2">
                                            <li>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <a href="newsfeed.html">NewsFeed</a>
                                                    </li>
                                                    <li>
                                                        <a href="user-timeline.html">Profile Timeline</a>
                                                    </li>
                                                    <li>
                                                        <a href="user-about.html">Profile About</a>
                                                    </li>
                                                    <li>
                                                        <a href="user-friends.html">Profile Friends</a>
                                                    </li>
                                                    <li>
                                                        <a href="user-groups.html">Profile Group</a>
                                                    </li>
                                                    <li>
                                                        <a href="user-photo.html">Profile Photo</a>
                                                    </li>
                                                    <li>
                                                        <a href="user-video.html">Profile Video</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <a href="user-badges.html">Profile Badges</a>
                                                    </li>
                                                    <li>
                                                        <a href="forums.html">Forums</a>
                                                    </li>
                                                    <li>
                                                        <a href="forums-forum.html">Forums Topic</a>
                                                    </li>
                                                    <li>
                                                        <a href="forums-timeline.html">Forums Timeline</a>
                                                    </li>
                                                    <li>
                                                        <a href="forums-info.html">Forums Info</a>
                                                    </li>
                                                    <li>
                                                        <a href="forums-members.html">Forums Members</a>
                                                    </li>
                                                    <li>
                                                        <a href="forums-media.html">Forums Media</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="header-nav-item">
                                        <a href="/#" className="menu-link have-sub">
                                            Pages
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="about-us.html">About</a>
                                            </li>
                                            <li>
                                                <a href="user-blog.html">Blog</a>
                                            </li>
                                            <li>
                                                <a href="shop.html">Shop</a>
                                            </li>
                                            <li>
                                                <a href="single-blog.html">Blog Details</a>
                                            </li>
                                            <li>
                                                <a href="single-shop.html">Shop Details</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Contact Us</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="nav-item header-control">
                            <div className="header-action">
                                <ul>
                                    <li className="header-nav-item">
                                        <a href="/profile" className="menu-link username">Username</a>
                                    </li>
                                    <li className="login-btn">
                                        <Link to="/logout" className="item-btn"><i className="fas fa-user">Logout</i>

                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>

    )
}
export default Header;



