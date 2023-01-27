import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Header from "../Common/Header/Header";
import axios from "axios";

function OrderList() {
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

  let [user, setUser] = useState(getLoginDetails());
  let [orderList, setOrderList] = useState([]);
  let getOrderListServer = async () => {
    if (user == false) {
      console.log("login to get list");
    } else {
      let url = "http://142.93.210.241:6600/api/orders-details";
      let { data } = await axios.post(url, { email: user.email });
      setOrderList([...data.ordersInfo]);
      console.log(...data.ordersInfo);
    }
  };
  useEffect(() => {
    console.log(user);
    getOrderListServer();
  }, []);
  return (
    <>
      <Header />
      <section className="row m-0 mb-1 px-2 px-lg-0 p-0">
        <div className="col-12 col-lg-4 m-auto p-0">
          <div className="col-12 m-auto mt-1">
            <h4>Order History</h4>
          </div>
          {/* item */}
          {user != false ? (
            orderList.map((val, index) => {
              return (
                <div
                  className="col-12 m-auto mt-2 p-1 order-item-box"
                  key={index}
                >
                  <div className="d-flex p-1">
                    <div>
                      <img src="/images/1.jpg" className="order-img" />
                    </div>
                    <div className="ms-4">
                      <p className="mb-1 fw-bolder">
                        Dr. {val.order_details.doctor_name}{" "}
                      </p>
                      <p className="mb-1">{val.order_details.category} </p>
                      <p className="mb-1"> {val.order_details.time} </p>
                      <p>
                        Order ID: <span>{val.order_id}</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between px-2">
                    <p className="mb-0">Date: {val.order_details.date} </p>
                    <p className="mb-0">Fee: {val.order_details.fee}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <>Please Login for order details</>
          )}
        </div>
      </section>
    </>
  );
}
export default OrderList;
