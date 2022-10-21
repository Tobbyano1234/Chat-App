import React from "react";
import { Link } from "react-router-dom";

const AddictionPage = () => {
  return (
  
      <div className="container forum-container">
        <div className="banner-user banner-forum">
          <div className="banner-content">
            <div className="media">
              <div className="media-body">
                <h3 className="item-title">ADDICTION</h3>
                <div className="item-subtitle">My Struggles</div>
                <ul className="item-social">
                  <li>
                    <a href="/#" className="bg-fb">
                      <i className="icofont-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="bg-twitter">
                      <i className="icofont-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="bg-dribble">
                      <i className="icofont-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="bg-youtube">
                      <i className="icofont-brand-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className="bg-behance">
                      <i className="icofont-behance"></i>
                    </a>
                  </li>
                </ul>
                <ul className="user-meta">
                  <li>
                    Group Type: <span>Public</span>
                  </li>
                  <li>
                    Posts: <span>30</span>
                  </li>
                  <li>
                    Members: <span>2,590</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="block-box user-top-header">
          <ul className="menu-list">
            <li className="active">
                <Link to="/">
              <a href="/#">Home</a>
                </Link>
            </li>
          </ul>
        </div>
        <div className="mchats col-md-10 mx-auto">
          <div >
            <div className="block-box post-input-tab forum-post-input">
              <div className="media">
                <div className="item-img">
                  <img
                    src="https://youzify.cera-theme.com/wp-content/uploads/avatars/25/61029dbf0b3ea-bpfull.jpg"
                    alt="img"
                    style={{
                      width: "70px",
                      height: "70px",
                      bordeRadius: "50%",
                    }}
                  />
                </div>
                <div className="media-body">
                  <textarea
                    name="status-input"
                    id="status-input"
                    className="form-control textarea"
                    placeholder="Share what are you thinking here . . ."
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <div className="post-footer">
                <div className="insert-btn">
                  <span></span>
                </div>
                <div className="submit-btn">
                  <a href="/#">Post Comment</a>
                </div>
              </div>
            </div>

            <div className="block-box post-view">
              <div className="post-header">
                <div className="media">
                  <div className="user-img">
                    <img
                      src="https://youzify.cera-theme.com/wp-content/uploads/avatars/10/61029c9624b02-bpfull.jpg"
                      alt="Aahat"
                      style={{
                        width: "70px",
                        height: "70px",
                        bordeRadius: "50%",
                      }}
                    />
                  </div>
                  <div className="media-body">
                    <div className="user-title">
                      <a href="/#">Abul Hasan</a>{" "}
                      <i className="icofont-check"></i>
                    </div>
                    <ul className="entry-meta">
                      <li className="meta-privacy">
                        <i className="icofont-world"></i> Public
                      </li>
                      <li className="meta-time">8 minutes ago</li>
                    </ul>
                  </div>
                </div>
                <div className="dropdown">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ...
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="/#">
                      Close
                    </a>
                    <a className="dropdown-item" href="/#">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/#">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <div className="post-body">
                <div className="post-no-thumbnail">
                  <p>
                    I have great news to share with you all! I've been
                    officially made a game streaming verified partner by Streamy
                    http://radiustheme.com/ What does this mean? I'll be
                    uploading new content every day, improving the quality and
                    I'm gonna have access to games a month before the official
                    release.
                  </p>
                  <p>
                    This is a dream come true, thanks to all for the support!!!
                  </p>
                </div>
                <div className="post-meta-wrap">
                  <div className="post-meta">
                    <div className="meta-text">2 Comments</div>
                    <div className="meta-text">05 Share</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  )
}

export default AddictionPage