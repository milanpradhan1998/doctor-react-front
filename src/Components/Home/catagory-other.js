import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CatagoryOthers(props) {
  let navigate = useNavigate();
  let { catagoriesList } = props;
  let [bestDoctorsList, setBestDoctorsList] = useState([]);
  let getBestDoctorsList = async () => {
    let url = "http://localhost:6600/api/best-doctors";
    let { data } = await axios.get(url);
    setBestDoctorsList([...data.doctors]);
  };
  useEffect(() => {
    getBestDoctorsList();
  }, []);
  return (
    <>
      {/* <!-- Category section --> */}
      <section className="row mt-2 m-0">
        <div className="col-12 p-0 col-lg-10 m-auto">
          <h3 className="lt-blue">Doctor's category</h3>
        </div>
        <div className="col-12 p-0 col-lg-10 m-auto d-flex flex-column flex-lg-row justify-content-lg-around flex-wrap">
          {/* <!-- item 1 --> */}
          {catagoriesList.map((val, ind) => {
            return (
              <div
                key={ind}
                className="card flex-row col-11 col-lg-3 m-auto mx-lg-1 mb-4 category-card"
                style={{ height: "8rem" }}
                onClick={() => {
                  navigate("/filter/" + val.cetagory_id + "/" + "0");
                }}
              >
                <img
                  src={val.image}
                  style={{ width: "8rem" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text h4">{val.cetagory}</p>
                  <p>{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* <!-- Best Doctor --> */}
      <section className="row mt-2 mb-4 m-0">
        <div className="col-12 p-0 col-lg-10 m-auto">
          <h3>Most popular doctors</h3>
        </div>
        <div className="col-11 p-0 col-lg-10 m-auto d-flex justify-content-around flex-wrap">
          {bestDoctorsList.map((val, ind) => {
            return (
              <div
                className="card mb-2 mb-lg-0 category-card best-dr-card"
                key={ind}
              >
                <img
                  src={val.p_image}
                  className="card-image m-auto mt-2 rounded-circle"
                  alt="..."
                />
                <div className="card-body">
                  <h5>
                    Dr.<span>{val.name}</span>
                  </h5>
                  <p className="card-text fw-bold">{val.cetagory}</p>
                  <p>
                    {val.rating}
                    <span>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </p>
                  <p>
                    City: {val.city}
                    <span>
                      <i className="fa-solid fa-location-dot ms-1"></i>
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default CatagoryOthers;
