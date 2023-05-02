import React from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { saveLoginSuccess } from '../redux/actions';

const Logout = () => {
    
    const reducerData = useSelector((state) => state?.isLoginSuccess);
    const dispatch = useDispatch();
    if(reducerData){
        dispatch(saveLoginSuccess(false));
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Thank you!</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-2 col-sm-8 mx-auto">
                            <div class="form my-3">
                                <label for="Name">You're logged off</label>
                            </div>
                            <div className="my-3">
                                <Link to="/ABHI_Timesheet" className="text-decoration-underline text-info">Login again</Link>
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Logout