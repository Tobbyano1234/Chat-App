import React from "react";
import "./NotVerified.css";

const NotVerified = () => {
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
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h2>Welcome to Zen</h2>
                      <h4 className="mt-1 mb-5 pb-1 not_verified" style={{color: "red"}}>
                        User Not Verified!!!
                      </h4>
                    </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                      <a href="/setup" style={{color: "white", padding: " 1rem 5rem"}} >
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2"
                          type="button" style={{padding: " 1rem 7rem", fontWeight: "bold"}}
                        >
                                Resend Verification Code
                        </button>
                            </a>
                      </div>
                    
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2 ">
                  <div
                    className="text-white px-3 py-4 p-md-5 mx-md-4"
                    style={{ color: "white" }}
                  >
                    <h4 className="mb-4" style={{ color: "white" }}>
                      We are more than just a company
                    </h4>
                    <h5 style={{ color: "white" }}>At ZEN we are family</h5>
                    <p className="small mb-0" style={{ color: "white" }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotVerified;
