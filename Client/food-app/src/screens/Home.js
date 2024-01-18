import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import {URL} from "../Helper";

export default function Home() {

  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);


  const loadData = async () => {
    try {

      const response = await fetch(`${URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setFoodItem(result[0] || []); 
      setFoodCategory(result[1] || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>

      <div> 
        <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Your Food Items Here"
                aria-label="Search"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900×700?burger"
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "100%",
                maxWidth: "100%",
                filter: "brightness(30%)",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700?pizza"
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "100%",
                maxWidth: "100%",
                filter: "brightness(30%)",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700?pasta"
              className="d-block w-100"
              style={{
                objectFit: "cover",
                maxHeight: "100%",
                maxWidth: "100%",
                filter: "brightness(30%)",
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
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
          data-bs-target="#carouselExampleFade"
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

      <div className="container">
        {
          foodCategory.length !== 0 ?
          foodCategory.map((data) => {
            return(
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              { foodItem.length !== 0
                ? foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItems) => {
                    return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem = {filterItems}
                      options = {filterItems.options[0]}
                      ></Card>
                    </div>
                  )})
                  : <div>No Such Data Available</div>
              }
            </div>
          )}): ""
        }
      </div>

      <div> <Footer /> </div>
    </div>
  );
}
