import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Common/Header/Header";

function Covid() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;
  console.log(today);
  let [stateList, setStateList] = useState([]);
  let getStateListServer = async () => {
    let url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
    let { data } = await axios.get(url);
    console.log(data.states);
    setStateList([...data.states]);
  };
  let [state_id, setStateId] = useState("");
  let [district_id, setDistrict_id] = useState("");

  let [district, setDistrict] = useState([]);
  let getDistrict = async () => {
    let url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`;
    let { data } = await axios.get(url);
    setDistrict(data.districts);
  };
  let getVaccine = async () => {
    if (state_id != "" && district.length != 0) {
      let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${today}`;
      let { data } = await axios.get(url);
      console.log(data.sessionss); //data has gated successfully
    } else {
      console.log("else error");
    }
  };

  useEffect(() => {
    getDistrict();
  }, [state_id]);
  useEffect(() => {
    getStateListServer();
  }, []);
  return (
    <>
      <Header />
      <section className="row p-0 mt-1 m-0">
        <div className="text-center h3">covid-19 vaccine info</div>
        <div className="d-flex flex-column align-items-center col-12 col-lg-4 bg-info p-1 m-auto">
          {/* <!-- state --> */}
          <div className="col-10 col-lg-6">
            <select
              className="w-100"
              onChange={(e) => {
                setStateId(e.target.value);
              }}
            >
              <option value="">-select State</option>
              {stateList.length != 0 ? (
                stateList.map((val, indx) => {
                  return (
                    <option key={indx} value={val.state_id}>
                      {val.state_name}
                    </option>
                  );
                })
              ) : (
                <option value="0">No result</option>
              )}
            </select>
          </div>
          {/* <!-- district --> */}
          <div className="col-10 col-lg-6">
            <select
              className="w-100"
              onClick={(e) => {
                setDistrict_id(e.target.value);
              }}
            >
              <option value="">-select District</option>
              {district.map((val, index) => {
                return (
                  <option key={index} value={val.district_id}>
                    {val.district_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <button
              className="btn btn-success px-4 mt-1"
              onClick={() => {
                getVaccine();
              }}
            >
              Check
            </button>
          </div>
        </div>
      </section>
      <section className="row p-0 mt-1 m-0">
        {/* <!-- card item --> */}
        <div className="d-flex flex-column align-items-center col-12 col-lg-4 bg-info p-1 m-auto">
          {/* <!-- item --> */}
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">name</h5>
              <h6 className="card-subtitle mb-2 text-muted">center id:1234</h6>
              <p className="card-text mb-0">District,Block</p>
              <p className="card-text mb-0">vaccine</p>
              <p className="card-text mb-0">val.slots</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Covid;
