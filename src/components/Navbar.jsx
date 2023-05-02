import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./navbar.css";
import Logo from "../assets/Logo.JPG";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const reducerData = useSelector((state) => state?.abhi_timesheet);
    let IsLoginSuccess = reducerData?.isLoginSuccess;
    console.log(IsLoginSuccess);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbarImgContainer" to="/">
                    <img
                        className="card-img"
                        src={Logo}
                        alt="Card"
                        height={100}
                    />
                </NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        {isAdmin && <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </li>}
                        {isAdmin && <li className="nav-item">
                            <NavLink className="nav-link" to="/addNewRecord">Add Record</NavLink>
                        </li>}
                        {isAdmin &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/showDetails">Show Details</NavLink>
                            </li>
                        }
                        {isAdmin && <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>}
                    </ul>
                    <div className="buttons text-center">
                        <NavLink to="/ABHI_Timesheet" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar