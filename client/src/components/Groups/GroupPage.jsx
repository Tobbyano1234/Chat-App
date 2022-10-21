import React from "react";
import { Link } from "react-router-dom";
import "./GroupPage.css";
import data from './data'
import List from './Group'

const GroupPage = () => {
  return (
    <>
      <div className="container">
        <div className="banner-user">
          <div className="banner-content">
            <div className="media">
              <div className="item-img">
                <img
                  src={localStorage.getItem("userAvatar")}
                  style={{ width: '7.2rem' }}
                  alt="User"
                />
              </div>
              <div className="media-body">

               
              </div>
            </div>
          </div>
        </div>
        <div className="block-box user-top-header mx-auto">
          <h4 class="widget-title mx-auto">Groups</h4>

        </div>
        <div id="user-view" className="user-grid-view">
          <div className="row gutters-20">

            <List people={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
