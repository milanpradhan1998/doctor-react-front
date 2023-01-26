import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorResult(props) {
  let { doctorList } = props;
  let navigate = useNavigate();
  return (
    <>
      <div className="d-flex items-filter-box flex-wrap p-1 justify-content-start  col-lg-9 col-12 h-100 mx-auto bg-secondary">
        {/* <!-- card item --> */}
        {doctorList.length != 0 ? (
          doctorList.map((val, index) => {
            return (
              <div
                className="card filter-card me-1 mb-1"
                key={index}
                onClick={() => {
                  navigate("/profile/" + val._id);
                }}
              >
                <img
                  src={val.p_image}
                  className="card-img-top h-50"
                  alt="..."
                />
                <div className="card-body py-0">
                  <h6 className="card-title my-1">Dr. {val.name}</h6>
                  <p className="mb-0">{val.cetagory}</p>
                  <p className="mb-0">
                    {val.city}, {val.locatin}
                  </p>
                  <p className="mb-0 fw-bold">&#8377;: {val.fee}</p>
                  <p className="mb-0 text-end">
                    <i className="fa-solid fa-star lt-blue"></i>
                    {val.rating}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>no result</p>
        )}
      </div>
    </>
  );
}

export default DoctorResult;
