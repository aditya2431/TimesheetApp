import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from "../components";
import { useSelector } from 'react-redux';

const ShowDetails = () => {

  const [apiResponse, setApiResponse] = useState([]);
  const [wbsElement, setWbsElement] = useState('');
  const isAdmin = useSelector((state) => state?.isAdminUser);
  console.log(isAdmin);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    // fetch("http://10.81.1.250:8080/abhi_timesheet/api/timesheet")
    fetch("http://localhost:8090/api/timesheet")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setApiResponse(data)
      })
  };

  const handleSubmitButtonClick = () => {
    if (wbsElement) {
      var newArray = apiResponse.filter(obj => obj.wbsCode === wbsElement);
      setApiResponse(newArray);
      setWbsElement('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h2 className="text-center">Timesheet Records</h2>
        <hr />
        <div className="text-center py-4">
          {apiResponse.length > 0 && (
            <table className="table table-bordered">
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
        </div>

        <h2 className="text-center py-4">Filter by WBS Code</h2>
        <div className="text-center py-4">
          <input
            type="text"
            required
            value={wbsElement}
            onChange={(e) => setWbsElement(e.target.value)}
          />
          <button  type='submit' onClick={handleSubmitButtonClick} >SUBMIT</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ShowDetails