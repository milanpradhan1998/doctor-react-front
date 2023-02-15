import React from "react";

function QuickFilter(props) {
  let { cityList, getFilterResult } = props;
  return (
    <>
      {/* for large screen */}
      <div className=" d-none d-lg-block col-lg-2 col-12 p-2 h-100 border border-2 border-dark filter-input position-relative">
        <div id="filter">
          <h5>Location</h5>
          <select
            name="location"
            id="location"
            className="w-75 mx-4 p-1"
            onChange={(event) => {
              getFilterResult(event, "city");
            }}
          >
            <option value={""}>Select location</option>
            {cityList.map((city, indx) => {
              return (
                <option key={indx} value={city.city_id}>
                  {city.city}
                </option>
              );
            })}
          </select>
          <h5>Fee price</h5>

          <div>
            <input
              type="radio"
              name="price"
              value="0-201"
              onChange={(event) => {
                getFilterResult(event, "fee");
              }}
            />
            <label>0-200</label>
          </div>
          <div>
            <input
              type="radio"
              name="price"
              value="200-301"
              onChange={(event) => {
                getFilterResult(event, "fee");
              }}
            />
            <label>200-300</label>
          </div>
          <div>
            <input
              type="radio"
              name="price"
              value="300-501"
              onChange={(event) => {
                getFilterResult(event, "fee");
              }}
            />
            <label>300-500</label>
          </div>
          <div>
            <input
              type="radio"
              name="price"
              value="500-1001"
              onChange={(event) => {
                getFilterResult(event, "fee");
              }}
            />
            <label>500-1000</label>
          </div>
          <div>
            <input
              type="radio"
              name="price"
              value="1000-99999"
              onChange={(event) => {
                getFilterResult(event, "fee");
              }}
            />
            <label>1000++</label>
          </div>

          {/* <!-- rating --> */}
          <h5>Rating</h5>
          <div>
            <input
              type="radio"
              name="rating"
              value="1"
              onChange={(event) => {
                getFilterResult(event, "rating");
              }}
            />
            <label>
              <i className="fa-solid fa-star"></i>1+
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              value="2"
              onChange={(event) => {
                getFilterResult(event, "rating");
              }}
            />
            <label>
              <i className="fa-solid fa-star"></i>2+
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              value="3"
              onChange={(event) => {
                getFilterResult(event, "rating");
              }}
            />
            <label>
              <i className="fa-solid fa-star"></i>3+
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              value="4"
              onChange={(event) => {
                getFilterResult(event, "rating");
              }}
            />
            <label>
              <i className="fa-solid fa-star"></i>4+
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              value="5"
              onChange={(event) => {
                getFilterResult(event, "rating");
              }}
            />
            <label>
              <i className="fa-solid fa-star"></i>5
            </label>
          </div>
          <h5>Sequence</h5>
          <div>
            <input
              type="radio"
              name="listOrder"
              value="-1"
              onChange={(event) => {
                getFilterResult(event, "sort");
              }}
            />
            <label>High to Low</label>
          </div>
          <div>
            <input
              type="radio"
              name="listOrder"
              value="1"
              onChange={(event) => {
                getFilterResult(event, "sort");
              }}
            />
            <label>Low to High</label>
          </div>
        </div>
      </div>
      {/* for small screen */}
      <div className="d-lg-none d-block col-12 mb-2 mob-filter">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Filter
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse "
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div id="filter">
                  <h5>Location</h5>
                  <select
                    name="location"
                    id="location"
                    className="w-75 mx-4 p-1"
                    onChange={(event) => {
                      getFilterResult(event, "city");
                    }}
                  >
                    <option value={""}>Select location</option>
                    {cityList.map((city, indx) => {
                      return (
                        <option key={indx} value={city.city_id}>
                          {city.city}
                        </option>
                      );
                    })}
                  </select>
                  <h5>Fee price</h5>

                  <div>
                    <input
                      type="radio"
                      name="price"
                      value="0-201"
                      onChange={(event) => {
                        getFilterResult(event, "fee");
                      }}
                    />
                    <label>0-200</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="price"
                      value="200-301"
                      onChange={(event) => {
                        getFilterResult(event, "fee");
                      }}
                    />
                    <label>200-300</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="price"
                      value="300-501"
                      onChange={(event) => {
                        getFilterResult(event, "fee");
                      }}
                    />
                    <label>300-500</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="price"
                      value="500-1001"
                      onChange={(event) => {
                        getFilterResult(event, "fee");
                      }}
                    />
                    <label>500-1000</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="price"
                      value="1000-99999"
                      onChange={(event) => {
                        getFilterResult(event, "fee");
                      }}
                    />
                    <label>1000++</label>
                  </div>

                  {/* <!-- rating --> */}
                  <h5>Rating</h5>
                  <div>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      onChange={(event) => {
                        getFilterResult(event, "rating");
                      }}
                    />
                    <label>
                      <i className="fa-solid fa-star"></i>1+
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      onChange={(event) => {
                        getFilterResult(event, "rating");
                      }}
                    />
                    <label>
                      <i className="fa-solid fa-star"></i>2+
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      onChange={(event) => {
                        getFilterResult(event, "rating");
                      }}
                    />
                    <label>
                      <i className="fa-solid fa-star"></i>3+
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      onChange={(event) => {
                        getFilterResult(event, "rating");
                      }}
                    />
                    <label>
                      <i className="fa-solid fa-star"></i>4+
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      onChange={(event) => {
                        getFilterResult(event, "rating");
                      }}
                    />
                    <label>
                      <i className="fa-solid fa-star"></i>5
                    </label>
                  </div>
                  <h5>Sequence</h5>
                  <div>
                    <input
                      type="radio"
                      name="listOrder"
                      value="-1"
                      onChange={(event) => {
                        getFilterResult(event, "sort");
                      }}
                    />
                    <label>High to Low</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="listOrder"
                      value="1"
                      onChange={(event) => {
                        getFilterResult(event, "sort");
                      }}
                    />
                    <label>Low to High</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickFilter;
