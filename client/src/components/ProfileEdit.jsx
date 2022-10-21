import React, { useEffect, useState } from 'react'
import { mainAxios } from "./Axios";
import { Link, useNavigate } from 'react-router-dom'
import './Profile.css'

const ProfilePage = () => {
  const nav = useNavigate();
  // const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email, gender: userData.gender, phonenumber: userData.phonenumber, type: userData.type, groups: userData.groups })
  const [err, setErr] = useState("")
  const id = localStorage.getItem("user")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    setErr("")
  }

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

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      const res = await mainAxios.post("users/update", {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        gender: userData.gender,
        phonenumber: userData.phonenumber,
        id: id,
        type: userData.type,
        groups: userData.groups,
        update_route: "profile"
      })

      
      if (res.data.status === 1) {
        nav("/profile");
      }

    } catch (error) {
      console.log(error)
    }
  }
  const fullname = `${userData.firstname} ${userData.lastname}`
  return (
    <>


      <div className="container">

        <div className="banner-user">
          <div className="banner-content">
            <div className="media">
              <div className="item-img">
                <img src={localStorage.getItem("userAvatar")} alt="User" style={{ width: '7.2rem', height: '7.2rem', borderRadius: '50%' }} />
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

            <h3 className='form_title'>Edit Profile</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                  defaultValue={userData.firstname}

                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                  defaultValue={userData.lastname}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  defaultValue={userData.email}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  className="form-control"
                  defaultValue={userData.phonenumber}
                />
              </div>

              <div className="form-group">
                <select onChange={handleChange} id="gender" className="my-form" name="gender" >
                  <option value="" disabled="true">select gender</option>
                  <option value="female">Male</option>
                  <option value="male">Female</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="groups"
                  id="groups"
                  className="form-control"
                  defaultValue={userData.groups}
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="type"
                  id="type"
                  className="form-control"
                  defaultValue={userData.type}

                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  name="registration"
                  className="submit-btn"
                  defaultValue="Update"
                />
              </div>
            </form>
          </div>
          {/* <div className="col-lg-8 mx-auto">
            <div className="block-box user-about">
              <div className="widget-heading">
                <h3 className="widget-title mx-auto">My Profile</h3>
                <div className="dropdown">
                  <button className="dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">...</button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="/#">Close</a>
                    <a className="dropdown-item" href="/#">Edit</a>
                    <a className="dropdown-item" href="/#">Delete</a>
                  </div>
                </div>
              </div>
              <ul className="user-info">
                <li>
                  <label>First Name :</label>
                  <input type="text" value={userData.firstname} />

                </li>
                <li>
                  <label>Last Name:</label>
                  <input type="text" value={userData.lastname} />

                </li>
                <li>
                  <label>E-mail:</label>
                  <input type="text" value={userData.email} />
                </li>
                <li>
                  <label>Phone Number:</label>
                  <input type="text" value={userData.phonenumber} />
                </li>
                <li>
                  <label>Gender:</label>
                  <input type="text" value={userData.gender} />
                </li>

              </ul>
            </div>


          </div> */}

        </div>
      </div>

      {/* <div className="form_container">

        <h3 className='form_title'>Edit Profile</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="firstname"
              id="firstname"
              className="form-control"
              value={userData.firstname}

            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="lastname"
              id="lastname"
              className="form-control"
              value={userData.lastname}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={userData.email}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="text"
              name="phonenumber"
              id="phonenumber"
              className="form-control"
              value={userData.phonenumber}
            />
          </div>

          <div className="form-group">
            <select onChange={handleChange} id="gender" className="my-form" name="gender" >
              <option value="--select gender---" >select gender</option>
              <option value="female">Male</option>
              <option value="male">Female</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="submit"
              name="registration"
              className="submit-btn"
              defaultValue="Update"
            />
          </div>
          <p class="text--center">Already have an account? <Link to="/login">Login now</Link> </p>

        </form>
      </div> */}

    </>
  )
}

export default ProfilePage