import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBanner(props) {
  let { catagoriesList } = props;
  let navigate = useNavigate();

  return (
    <>
      {/* <!-- search area --> */}
      <section className="row mt-2 m-0 d-flex flex-column flex-lg-row justify-content-lg-center align-items-center">
        <div className="search-main col-lg-2 col-11 py-1 d-flex border border-2 my-1 justify-content-between align-items-center">
          <select
            name="category"
            id="category-selection"
            className="w-100 my-1 border border-0"
          >
            <option value="">-Select-</option>
            {catagoriesList.map((val, ind) => {
              return (
                <option key={ind} value={val.cetagory_id}>
                  {val.cetagory}
                </option>
              );
            })}
          </select>
        </div>
        <div className="search-main col-lg-3 col-11 py-1 d-flex ms-lg-1 border border-2 my-1 justify-content-between align-items-center">
          <input
            className="my-auto fs-5 border border-0"
            type="search"
            name="search"
            id="search"
            placeholder="Search Doctors"
          />
          <button className="bg-lt-blue text-white ms-1 py-1 px-2 border border-2 border-dark rounded-circle fs-6 my-auto btn btn-outline-success">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </section>
      {/* <!-- banner area --> */}
      <section className="row m-0 p-0 mt-1 banner-main">
        <div className="col-12 p-0 col-lg-10 m-auto">
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img
                  src="./images/banner/banner1 (1).jpg"
                  className="d-block banner-img w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src="./images/banner/banner1 (2).jpg"
                  className="d-block banner-img w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Some representative placeholder content for the second
                    slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="./images/banner/banner1 (3).jpg"
                  className="d-block banner-img w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <div className="col-12 col-lg-10 mx-0 m-lg-auto my-1 ">
        <button
          className="btn btn-outline-info"
          onClick={() => {
            navigate("/covid-19");
          }}
        >
          Covid-19
        </button>
      </div>
    </>
  );
}
export default SearchBanner;
