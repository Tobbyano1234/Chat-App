import { Link } from "react-router-dom";
import { mainAxios } from "./Axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mapLine from "../images/map_line.png";
import marker1 from "../images/marker_1.png";
import marker2 from "../images/marker_2.png";
import marker3 from "../images/marker_3.png";
import marker4 from "../images/marker_4.png";

const Login = () => {
  const nav = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await mainAxios.post("users/login", {
        email: user.email,
        password: user.password,
      });


      
      localStorage.setItem("tokenStore", res.data.token);
      localStorage.setItem("user", res.data.user.id);
      localStorage.setItem("userName", res.data.user.firstname + " " + res.data.user.lastname);
      localStorage.setItem("firstName", res.data.user.firstname);
      localStorage.setItem("lastName", res.data.user.lastname);
      localStorage.setItem("userAvatar", res.data.user.avatar);
      localStorage.setItem("userGroups", res.data.user.groups);
      localStorage.setItem("userType", res.data.user.type)

      if (res.data.user.id && res.data.user.isverified === 1) {
        if (res.data.user.type) {

          nav("/dashboard");
        } else if (res.data.user.id && (res.data.user.isverified === 0 || res.data.user.isverified === null)) {
          nav("/notverified")
        } else {
          nav("/setup")
        }
      }

    } catch (err) {
      if (err.response.data.Error) {
        setErr(err.response.data.Error);
      } else {
        setErr(err.response.data.msg);
      }
    }
  };

  return (


    <div className="login-page-wrap">
      <div className="content-wrap">
        <div className="login-content">
          <div className="login-form-wrap">

            <div className="tab-content">
              <div
                className="tab-pane login-tab fade show active"
                id="login-tab"
                role="tabpanel"
              >
                <h3 className="item-title">
                  Sign Into Your Account
                </h3>

                <form onSubmit={loginSubmit}>
                  <div className="form-group">
                    <input onChange={handleChange}
                      type="email"
                      className="form-control"
                      name="email" id="email"
                      placeholder="Your E-mail"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input onChange={handleChange}
                      type="password"
                      className="form-control"
                      name="password" id="password"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      name="login-btn"
                      className="submit-btn"
                      defaultValue="Login"
                      value="Login"
                    />
                  </div>
                  <p class="text--center">Not a member? <Link to="/register">Signup now</Link> </p>
                  <h5>{err}</h5>
                </form>

              </div>

              <div className="map-line">
                <img src={mapLine} alt="map" />
                <ul className="map-marker">
                  <li>
                    <img src={marker1} alt="marker" />
                  </li>
                  <li>
                    <img src={marker2} alt="marker" />
                  </li>
                  <li>
                    <img src={marker3} alt="marker" />
                  </li>
                  <li>
                    <img src={marker4} alt="marker" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Login;
