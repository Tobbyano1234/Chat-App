import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'

const HeaderUser = () => {

    return (
        <header className="header header-user">
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

export default HeaderUser