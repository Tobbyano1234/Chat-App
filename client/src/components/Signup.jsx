import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { mainAxios } from "./Axios";

const SignupComponent = () => {
  const nav = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    gender: "",
    password: "",
    confirm_password: "",
  });
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await mainAxios.post("users/register", {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: `http://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}`,
        phonenumber: user.phonenumber,
        gender: user.gender,
        password: user.password,
        confirm_password: user.confirm_password,
      });

      if (res.data.inserted === 1) {
        nav("/registered");
      }
    } catch (err) {
      
      if (typeof err.response.data.Error !== 'undefined') {
        setErr(err.response.data?.Error);
      } else {
        setErr(err.response.data?.msg);
      }
    }
  };

  return (
    <div className="login-page-wrap">
      <div className="content-wrap">
        <div className="login-content">
          <div className="tab-content">
            <div
              className="tab-pane registration-tab fade active show"
              id="registration-tab"
              role="tabpanel"
            >
              <h3 className="item-title">Sign Up Your Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="E-mail"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phonenumber"
                    id="phonenumber"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Type Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="form-group">
                  <select onChange={handleChange} id="gender" className="select2 form-control" name="gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    name="registration"
                    className="submit-btn"
                    defaultValue="Complete Registration"
                  />
                </div>
                <p class="text--center">Already have an account? <Link to="/login">Login now</Link> </p>

                <h5>{err}</h5>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
