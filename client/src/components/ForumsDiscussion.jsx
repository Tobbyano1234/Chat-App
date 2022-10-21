import React from 'react'
import shape from "../images/shape_7_1.png";
import people from "../images/people_3.png";
import DiscussionTable from './Discussion-Table'



const Discussion = () => {
  return (
    <div>
    <div className="newsfeed-banner" >
                    <div className="media">
                        <div className="item-icon">
                            <i className="icofont-speech-comments"></i>
                        </div>
                        <div className="media-body">
                            <h3 className="item-title">Forum Discussion</h3>
                            <p>Check what your friends have been up to!</p>
                        </div>
                    </div>
                    <ul className="animation-img">
                        <li data-sal="slide-down" data-sal-duration="800" data-sal-delay="400" className="sal-animate"><img src={shape} alt="shape" /></li>
                        <li data-sal="slide-up" data-sal-duration="500" className="sal-animate"><img src={people} alt="shape" /></li>
                    </ul>
                </div>

                <div className="block-box user-search-bar col-md-8 mx-auto">
                            <div className="box-item search-box mb-0">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search Member" />
                                    <div className="input-group-append">
                                        <button className="search-btn" type="button"><i className="icofont-search"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DiscussionTable />
                  </div>
  )
}

export default Discussion