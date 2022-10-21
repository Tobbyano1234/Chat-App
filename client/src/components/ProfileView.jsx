import React, { useEffect, useState } from 'react'
import { mainAxios } from "./Axios";
import { useParams, useNavigate } from 'react-router-dom'
import './Profile.css'

const ProfilePage = () => {
  const nav = useNavigate();
  // const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState([]);
  const {id} = useParams();

  const getUserData = async () => {
    try {
      const res = await mainAxios.post("users/one", {
        id: id
      })
      setUserData(res.data.record)

    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const fullname = `${userData.firstname} ${userData.lastname}`
  return (
    <>
      <div className="container pb-5">
        <div className="banner-user">
          <div className="banner-content">
            <div className="media">
              <div className="item-img">
                <img src={userData.avatar} alt="User" style={{ width: '7.2rem', height: '7.2rem', borderRadius: '50%' }} />
              </div>
              <div className="media-body">
                <h3 className="item-title">{fullname}</h3>

              </div>
            </div>
          </div>
        </div>
        <div className="block-box user-top-header">
          <ul className="menu-list">
            <li className="active"><a href="/#">Profile</a></li>
          </ul>
        </div>
        <div className="row ">
          <div className="form_container col-md-6 mx-auto">

            <h3 className='form_title'>{`${userData.firstname}'s Profile`} </h3>
            <table class="table profile-table ">
              <tbody>
                <tr>
                  <th scope="col">Firstname</th>
                  <th scope="col">{userData.firstname}</th>            
                </tr>
                <tr>
                  <th scope="col">Lastname</th>
                  <th scope="col">{userData.lastname}</th>
                </tr>
                 <tr>
                  <th scope="col">Gender</th>
                  <th scope="col">{userData.gender}</th>
                </tr>
                 <tr>
                  <th scope="col">Type</th>
                  <th scope="col">{userData.type}</th>
                </tr>
                 <tr>
                  <th scope="col">Groups</th>
                  <th scope="col">{userData.groups}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage