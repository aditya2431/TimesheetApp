import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { useSelector } from 'react-redux';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ViewDetails = () => {

    const [apiResponse, setApiResponse] = useState([]);
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
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
            // apiEndPoint = 'http://10.81.1.250:8080/abhi_timesheet/api/timesheetByUserName/' + userObject.userName;
        }
        fetch(apiEndPoint)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setApiResponse(data)
            })
    };

    const handleSubmitButtonClick = () => {
        debugger;
        if (date) {
            debugger;
            console.log(date);
            console.log(apiResponse);
            var newArray = apiResponse.filter(obj => obj.createdAt === date);
            console.log(newArray);
            setApiResponse(newArray);
            setDate('');
        }
    };

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiResponse);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    if (reducerData) {
        return (
            <>
                <Navbar />
                <div className="container my-3 py-3">
                    <h2 className="text-center">Timesheet Records</h2>
                    <div class="text-center">
                        {apiResponse.length > 0 &&
                            <div>
                                <button className="btn btn-secondary" type="submit" onClick={(e) => exportToCSV("Timesheet_Details")}>Export to excel</button>
                                <br />
                                <div className="p-3">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    /> {'  '}
                                    <button className="btn btn-secondary" type='submit' onClick={handleSubmitButtonClick} >Filter by date</button>
                                </div>
                            </div>
                        }
                    </div>
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
                                        <td>{user.createdAt}</td>
                                        <td>{user.bookedEfforts}</td>
                                        <td>{user.comments}</td>
                                    </tr>
                                ))}
                            </table>
                        )}
                        {apiResponse.length < 1 &&
                            <div><b>No data found</b></div>
                        }
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