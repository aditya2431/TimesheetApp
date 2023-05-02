import React from "react";
import "./main.css";
import Background from "../assets/Background.jpg";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="navbarContainer">
          <img
            className="card-img"
            // src="./assets/Background.jpg"
            src = {Background}
            // src={process.env.PUBLIC_URL + '/assets/Background.jpg'}
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h2 className="card-title fs-1 text fw-lighter" align = "center">ABHI Timesheet Portal</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
