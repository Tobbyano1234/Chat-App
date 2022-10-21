import React from "react";
import "./Verified.css";
import Logo from '../images/logo.png'

const VerifyFail = () => {
  return (
    <>
      <section
        className="w-100 p-4 p-xl-5"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src={Logo}
                        style={{ width: "185px", backgroundColor:"#cccccc", borderRadius: "50%" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">
                        Verification Failed. Please check your email.
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2 ">
                  <div
                    className="text-white px-3 py-4 p-md-5 mx-md-4"
                    style={{ color: "white" }}
                  >
                    <h4 className="mb-4" style={{ color: "white" }}>
                      We are more than just a company...
                    </h4>
                    <h5 style={{ color: "white" }}>At ZEN, we are family</h5>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default VerifyFail;
