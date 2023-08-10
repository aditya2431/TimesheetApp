import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../assets/Logo.JPG";
import { useSelector } from "react-redux";

const Navbar = () => {
  const reducerData = useSelector((state) => state?.isLoginSuccess);
  const isAdmin = useSelector((state) => state?.isAdminUser);
  const adminUser = useSelector((state) => state?.userObject?.admin);
  console.log("is", reducerData);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbarImgContainer" to="/">
          <img
            className="card-img"
            src={Logo}
            alt="Card"
            // height={100}
          />
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            {reducerData && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home{" "}
                </NavLink>
              </li>
            )}
            {reducerData && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/addNewRecord">
                  Add Record
                </NavLink>
              </li>
            )} 
            {reducerData && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/viewDetails">
                  View Timesheet
                </NavLink>
              </li>
            )}
            {(reducerData && isAdmin) ||
              (adminUser && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/showDetails">
                    Show Details
                  </NavLink>
                </li>
              ))}
            {reducerData && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            )}
            {reducerData && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/enterCR">
                  Add CR Estimation
                </NavLink>
              </li>
            )}
            {reducerData && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/viewCR">
                  View CR Estimation
                </NavLink>
              </li>
            )}
          </ul>
          <div className="buttons text-center">
            {!reducerData && (
              <NavLink
                to="/ABHI_Timesheet"
                className="btn btn-outline-dark m-2"
              >
                <i className="fa fa-sign-in-alt mr-1"></i> Login
              </NavLink>
            )}
            {!reducerData && (
              <NavLink to="/register" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Register
              </NavLink>
            )}
            {reducerData && (
              <NavLink to="/logout" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-out-alt mr-1"></i> Logout
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
