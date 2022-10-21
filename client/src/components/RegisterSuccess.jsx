import React from 'react'
import { mainAxios } from './Axios'


const RegisterSuccess = () => {

  return (
    <div className="login-page-wrap">
      <div className="content-wrap">
        <div className="login-content">
          <div className="tab-content">
            <div className="container">
              <div className="mx-auto ">
                <h1>Success</h1>
                <h5>You have successfully registered</h5>
                <p>Please check your email for verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterSuccess
