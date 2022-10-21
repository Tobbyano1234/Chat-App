import React from 'react'
import { Link } from "react-router-dom";



const List = ({ people }) => {
  const userGroups = localStorage.getItem("userGroups").split(',')
  return (
    <>
      {people.map((person) => {
        const { id, category, groupName, profileImage, coverImage, url, posts, members } = person

        return (userGroups.includes(category) &&
          <div key={id} className="col-xl-4 col-lg-4 col-md-12">
            <div className="widget-author user-group">
              <div className="author-heading">
                <div className="cover-img">
                  <img
                    src={coverImage}
                    alt="cover"
                  />
                </div>
                <div className="profile-img">
                  <a href="#">
                    <img
                      src={profileImage}
                      alt="author"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </a>
                </div>
                <div className="profile-name">
                  <h4 className="author-name">
                    <Link to={url}>{groupName}</Link>
                  </h4>
                </div>
              </div>
              <ul className="member-thumb">
                <li>
                  <img
                    src="https://www.radiustheme.com/demo/html/cirkle/media/figure/chat_1.jpg"
                    alt="member"
                  />
                </li>
                <li>
                  <img
                    src="https://www.radiustheme.com/demo/html/cirkle/media/figure/chat_2.jpg"
                    alt="member"
                  />
                </li>
                <li>
                  <img
                    src="https://www.radiustheme.com/demo/html/cirkle/media/figure/chat_3.jpg"
                    alt="member"
                  />
                </li>
                <li>
                  <img
                    src="https://www.radiustheme.com/demo/html/cirkle/media/figure/chat_5.jpg"
                    alt="member"
                  />
                </li>
              </ul>
              <ul className="author-statistics">
                <li>
                  <a href="#">
                    <span className="item-number">{posts}</span>{" "}
                    <span className="item-text">GROUP POSTS</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="item-number">{members}</span>{" "}
                    <span className="item-text">ALL MEMBERS</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default List