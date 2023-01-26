import React, { useEffect, useState } from "react";
import QuickFilter from "./quick-filter";
import DoctorResult from "./doctor-result";
import Header from "../Common/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

function Filter() {
  let { _category_id } = useParams();
  let [cityList, setCityList] = useState([]);
  let [doctorList, setDoctorList] = useState([]);
  let getCityListApi = async () => {
    let url = "http://localhost:6600/api/city";
    let { data } = await axios.get(url);
    setCityList([...data.city]);
  };
  let [filterData, setFilterData] = useState({ cetagory_id: _category_id });
  let filter = async () => {
    let url = "http://localhost:6600/api/filter-data";
    let { data } = await axios.post(url, filterData);
    if (data.status == true) {
      setDoctorList(data.filteredData);
    } else {
      console.log("no data");
    }
  };
  let getFilterResult = (event, type) => {
    let value = event.target.value;
    console.log(value, type);
    switch (type) {
      case "sort":
        filterData["sort"] = value;
        break;
      case "fee":
        value = value.split("-");
        filterData["l_cost"] = value[0];
        filterData["h_cost"] = value[1];
        break;
      case "rating":
        filterData["rating"] = value;
        break;
      case "city":
        if (value != "") {
          filterData["city_id"] = value;
        } else {
          return false;
        }

      default:
        break;
    }
    setFilterData({ ...filterData });
  };
  useEffect(() => {
    filter();
  }, [filterData]);
  useEffect(() => {
    filter();
    getCityListApi();
  }, []);

  return (
    <>
      <Header />
      <section className="row m-0 d-flex p-1">
        <div className="col-lg-10 col-12 m-auto">
          <h3>Filter area</h3>
        </div>
        <div
          className="col-12 col-lg-10 border border-2 m-lg-auto d-flex flex-lg-row flex-column justify-content-start align-items-start p-0 p-lg-1"
          style={{ height: "80vh" }}
        >
          <QuickFilter cityList={cityList} getFilterResult={getFilterResult} />
          <DoctorResult doctorList={doctorList} />
        </div>
      </section>
    </>
  );
}

export default Filter;
