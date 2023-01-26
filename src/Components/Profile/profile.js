import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header/Header";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import jwtDecode from "jwt-decode";
import axios from "axios";

function Profile() {
  let navigate = useNavigate();
  let [_date, setDate] = useState("");
  let getLoginDetails = () => {
    // read local storage
    let logToken = localStorage.getItem("logToken");

    if (logToken == null) {
      return false;
    } else {
      try {
        let decodeLogToken = jwtDecode(logToken);
        console.log(decodeLogToken);
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

  let { id } = useParams();
  let doctorProfileDefult = {
    name: "",
    cetagory: "",
    cetagory_id: 0,
    time: "",
    rating: "",
    fee: 0,
    city_id: 0,
    city: "",
    locatin: "",
    p_image: "",
    bg_images: "",
    gallary: [],
  };
  let [profile, setProfile] = useState({ ...doctorProfileDefult });

  let getProfile = async () => {
    let url = `http://localhost:6600/api/profile/${id}`;
    let { data } = await axios.get(url);
    if (data.status != false) {
      setProfile({ ...data.doctor });
    } else {
      setProfile({ ...doctorProfileDefult });
    }
  };
  let [mobile, setMoblie] = useState("");
  let [otp, setOtp] = useState("");
  let [inputOtp, setInputOtp] = useState("");

  let getOTP = async () => {
    let otp = (Math.random() * 10000 + 900).toFixed();
    let url = `https://www.fast2sms.com/dev/bulkV2?authorization=pBkw8IU5SppvJ4n9Qz5kRUL8iABcB21qSprYqHn76jS0L3jmijXpVTWn1W0m&variables_values=${otp}&route=otp&numbers=${mobile}`;
    let { data } = await axios.get(url);
    if (data.return == true) {
      setOtp(otp);
    } else {
      alert(data.message);
    }
  };
  //   order info details
  let [orderInfo, setOrderInfo] = useState({});

  // generate order id from razorpay
  let makePayment = async () => {
    let url = "http://localhost:6600/api/gen-order-id-payment";
    let { data } = await axios.post(url, { amount: profile.fee });
    if (data.status === false) {
      alert("unable to generate order");
      return false;
    }
    let { order } = data;
    var options = {
      key: "rzp_test_3q3QzuvllX2NXs", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato payment",
      description: "Make payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        var verifyPayment = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: user.name,
          email: user.email,
          mobile: mobile,
          order_details: orderInfo,
          totalAmount: profile.fee,
        };
        let { data } = await axios.post(
          "http://localhost:6600/api/verify-payment",
          verifyPayment
        );
        if (data.status === true) {
          alert("payment success");
          navigate("/order-info");
        } else {
          alert("payment fail!!");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
  };
  useEffect(() => {
    console.log(mobile);
  }, [mobile]);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <Header />
      <section className="row m-0 mb-1 px-2 px-lg-0">
        <div className="item-box category-card col-12 col-lg-6 m-auto p-1 d-flex flex-column flex-lg-row">
          <div className="me-2 d-flex flex-column align-items-center">
            <div>
              <img className="item-img" src={profile.p_image} alt="" />
            </div>

            <button
              className="btn btn-md btn-outline-dark bg-lt-blue mt-2"
              data-bs-toggle="modal"
              data-bs-target="#gaiieryModal"
            >
              <i className="fa-solid fa-images"></i> Gallery
            </button>
          </div>
          <div className="mt-1 d-flex w-100 flex-column align-items-center">
            <div>
              <h3>Dr.{profile.name} </h3>
              <p>
                MBBS, <span> {profile.cetagory} </span>
              </p>
              <p>{profile.description}</p>
              <p>Fee: &#8377; {profile.fee} </p>

              <p>Time: {profile.time} am</p>
              <p>
                Rating:<i className="fa-solid fa-star"></i>
                {profile.rating}
              </p>
              <p>
                Address:<i className="fa-solid fa-location-dot me-1"></i>
                {profile.locatin},{profile.city}
              </p>
            </div>
            <div className="mt-1 w-100 d-flex justify-content-end">
              {user == false ? (
                <button className=" btn-danger text-white btn-md p-2" disabled>
                  Login for Appointment{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  className="bg-lt-blue btn-outline-success text-white btn-md p-2"
                  data-bs-toggle="modal"
                  data-bs-target="#bookingModel"
                >
                  Get Appointment <i className="fa-solid fa-arrow-right"></i>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <!-- gallery model --> */}
        <div
          className="modal fade"
          id="gaiieryModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" style={{ height: "75vh" }}>
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body h-75">
                <Carousel showThumbs={false} infiniteLoop={true}>
                  {profile.gallary.map((val, indx) => {
                    return (
                      <div key={indx} className="w-100">
                        <img src={val} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Booking Model --> */}
        <div
          className="modal fade"
          id="bookingModel"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Form
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <form action="">
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          #
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Username"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        @
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={user.name}
                        onChange={() => {}}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User email"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={user.email}
                        onChange={() => {}}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        @email.com
                      </span>
                    </div>

                    <label htmlFor="basic-url" className="form-label">
                      Your Mobile Number
                    </label>

                    <div className="input-group mb-3">
                      <span className="input-group-text">+91</span>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                        onChange={(event) => {
                          setMoblie(event.target.value);
                        }}
                      />
                    </div>

                    <div className="input-group">
                      <span className="input-group-text">With textarea</span>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger text-white"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {mobile.length === 10 ? (
                  <>
                    <button
                      type="button"
                      className="btn bg-lt-blue text-white"
                      data-bs-toggle="modal"
                      data-bs-target="#optModal"
                      onClick={() => {
                        setOrderInfo({
                          doctor_name: profile.name,
                          fee: profile.fee,
                          time: profile.time,
                          doctor_id: profile._id,
                          date: _date,
                          p_image: profile.p_image,
                          category: profile.cetagory,
                          city: profile.city,
                        });
                        getOTP();
                      }}
                    >
                      Get OTP
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn bg-lt-blue text-white"
                      data-bs-toggle="modal"
                      data-bs-target="#optModal"
                      onClick={() => {
                        getOTP();
                      }}
                      disabled
                    >
                      Get OTP
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* OTP Model */}
        <div
          className="modal fade"
          id="optModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Verify User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter otp"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => {
                      setInputOtp(e.target.value);
                    }}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    #OTP
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {otp == inputOtp ? (
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-success bg-lt-blue"
                    onClick={() => {
                      otp == inputOtp
                        ? makePayment()
                        : console.log("otp not match");
                    }}
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success bg-lt-blue"
                    onClick={() => {
                      alert("otp not match!!");
                    }}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
