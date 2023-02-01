import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  // let navigate = useNavigate();
  let getLoginDetails = () => {
    // read local storage
    let logToken = localStorage.getItem("logToken");

    if (logToken == null) {
      return false;
    } else {
      try {
        let decodeLogToken = jwtDecode(logToken);
        // console.log(decodeLogToken);

        return decodeLogToken;
      } catch (error) {
        //remove from local storage
        localStorage.removeItem("logToken");
        return false;
      }
    }
  };
  let logOut = () => {
    let doLogOut = window.confirm("Do you want to logout?");
    if (doLogOut == true) {
      localStorage.removeItem("logToken");
      window.location.assign("/");
    }
  };
  let [user, setUser] = useState(getLoginDetails());
  let onSuccess = (response) => {
    let token = response.credential;
    // local storage 5mb to 10mb
    localStorage.setItem("logToken", token);
    // on login redirect
    window.location.assign("/");
  };

  let onError = () => {
    console.log("Login Failed");
  };
  return (
    <>
      <GoogleOAuthProvider clientId="757702982869-ll6f9qh814ovj37ce8ubqplgn2inmaod.apps.googleusercontent.com">
        <section className="row m-0 d-flex col-12 position-sticky top-0 nav-bar-box">
          <header className="col-12 p-0 d-flex justify-content-between align-items-center py-1">
            <div className="d-flex mx-2">
              <img
                className="nav-logo ms-2 bg-white rounded-circle my-1"
                src="/images/logo/icon-sq-512x.png"
                alt="logo image"
              />
            </div>
            <div className="d-lg-flex justify-content-end">
              {/* account area */}
              {user === false ? (
                <button
                  className="btn btn-outline-light my-auto me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i> Login
                </button>
              ) : (
                <>
                  <span className="my-auto mx-2 text-white fw-bold">
                    {user.name}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => {
                      navigate("/order-info");
                    }}
                  >
                    <i className="fa-solid fa-list-check"></i>Order
                  </button>
                </>
              )}
            </div>
          </header>
        </section>
        {/* login model */}
        <div
          className="modal fade"
          id="loginModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
export default Header;
