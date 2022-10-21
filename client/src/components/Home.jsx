import React, { useEffect } from "react";
import shape from "../images/shape_1.png";
import people from "../images/people_1.png";
import mapLine from "../images/map_line.png";
import marker1 from "../images/marker_1.png";
import marker2 from "../images/marker_2.png";
import marker3 from "../images/marker_3.png";
import marker4 from "../images/marker_4.png";
import { Link } from "react-router-dom";

const Hero = () => {


    return (
        <>
            <section className="hero-banner">
                <div className="container">
                    <div className="hero-content sal-animate" data-sal="zoom-out" data-sal-duration="1000">
                        <h1 className="item-title">Zen Community</h1>
                        <p>Choose the best online therapy community, begin your free engagement and speak to others sharing similar issues. Help is closer than you think</p>
                        <div className="item-number">10,95,219</div>
                        <div className="conn-people">Connected People</div>
                        <a href="newsfeed.html" className="button-slide">
                            <Link to="/register">
                                <span className="btn-text">Find out how</span>
                            </Link>
                            <span className="btn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="10px">
                                    <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"></path>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="leftside-image">
                    <div className="cartoon-image sal-animate" data-sal="slide-down" data-sal-duration="1000" data-sal-delay="100">
                        <img src={people} alt="People" />
                    </div>
                    <div className="shape-image sal-animate" data-sal="slide-down" data-sal-duration="500" data-sal-delay="700">
                        <img src={shape} alt="shape" />
                    </div>
                </div>
                <div className="map-line">
                    <img src={mapLine} alt="map" data-sal="slide-up" data-sal-duration="500" data-sal-delay="800" className="sal-animate" />
                    <ul className="map-marker">
                        <li data-sal="slide-up" data-sal-duration="700" data-sal-delay="1000" className="sal-animate"><img src={marker1} alt="marker" /></li>
                        <li data-sal="slide-up" data-sal-duration="800" data-sal-delay="1000" className="sal-animate"><img src={marker2} alt="marker" /></li>
                        <li data-sal="slide-up" data-sal-duration="900" data-sal-delay="1000" className="sal-animate"><img src={marker3} alt="marker" /></li>
                        <li data-sal="slide-up" data-sal-duration="1000" data-sal-delay="1000" className="sal-animate"><img src={marker4} alt="marker" /></li>
                    </ul>
                </div>
            </section>

            <section className="why-choose-us">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="why-choose-box">
                                <div className="item-subtitle">What We Do</div>
                                <h2 className="item-title"><span>Why Join Our Community ?</span> Zen for the troubled souls.?</h2>
                                <p>We live in a period of myriad of different global economic and social challenges that has pushed many people to the precipice emotionally, and the Zen community is here to provide the neccessary support to people going through those challenges in silence.</p>
                                <a href="/register" className="button-slide">
                                    <span className="btn-text">Join Our Community</span>
                                    <span className="btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="21px" height="10px">
                                            <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="why-choose-box">
                                <ul className="features-list">
                                    <li>
                                        <div className="media">
                                            <div className="item-icon">
                                                <i className="icofont-wechat"></i>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="item-title">Meet Great People</h3>
                                                <p>During my battle with depression, I almost gave up and end everything, but a close friend introduced me to the Zen community, and i met a lot of wonderful people who gave me the needed support to overcome the difficult phase of my life and i'm extremely grateful and thankful for that.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <div className="item-icon">
                                                <i className="icofont-users"></i>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="item-title">Forum Discussion</h3>
                                                <p>My husband snores a lot and i've tried to make him stop, but all to no avail, and this causing a lot of friction between us as the sounds from his snoring usually distrupts my sleep, please what can i do to make him stop snoring ?.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <div className="item-icon">
                                                <i className="icofont-paper"></i>
                                            </div>
                                            <div className="media-body">
                                                <h3 className="item-title">Active Groups</h3>
                                                <p>You can chat up any of our mentors and counsellors for help at any time and be rest assured to get a genuine support and advice.</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;


