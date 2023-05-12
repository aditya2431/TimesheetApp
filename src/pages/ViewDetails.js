import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { useSelector } from 'react-redux';

const ViewDetails = () => {

    const [apiResponse, setApiResponse] = useState([]);
    const [userId, setUserId] = useState('');
    const isAdmin = useSelector((state) => state?.isAdminUser);
    const userObject = useSelector((state) => state?.userObject);
    const reducerData = useSelector((state) => state?.isLoginSuccess);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let apiEndPoint = '';
        if (userObject) {
            apiEndPoint = 'http://localhost:8090/api/timesheetByUserName/' + userObject.userName;
        }
        fetch(apiEndPoint)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setApiResponse(data)
            })
    };

    if (reducerData) {
        return (
            <>
                <Navbar />
                <div className="container my-3 py-3">
                    <h2 className="text-center">Timesheet Records</h2>
                    <hr />
                    <div className="text-center py-4">
                        {apiResponse.length > 0 && (
                            <table className="table table-bordered" >
                                <tr>
                                    <td><b>ID</b></td>
                                    <td><b>User Name</b></td>
                                    <td><b>Email Id</b></td>
                                    <td><b>Category</b></td>
                                    <td><b>WBS Code</b></td>
                                    <td><b>Booking Date</b></td>
                                    <td><b>Booked Efforts</b></td>
                                    <td><b>Comments</b></td>
                                </tr>
                                {apiResponse.map(user => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.emailId}</td>
                                        <td>{user.category}</td>
                                        <td>{user.wbsCode}</td>
                                        <td>{user.createdAt.substring(0, 19)}</td>
                                        <td>{user.bookedEfforts}</td>
                                        <td>{user.comments}</td>
                                    </tr>
                                ))}
                            </table>
                        )}
                    </div>
                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className="container my-3 py-3">
                    <div className="col-12">
                        <h4 className="display-7 text-center">You're not authorized to access this application.</h4>
                        <h4 className="display-7 text-center">Please login to continue</h4>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default ViewDetails;