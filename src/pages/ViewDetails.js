import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Paginate from "../components/Paginate";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Icon from "react-crud-icons";
import axios from "axios";



const ViewDetails = () => {
  const [pageNumber, setpageNumber] = useState(0);
  const [apiResponse, setApiResponse] = useState([]);
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [editID, seteditID] = useState(-1);
  const isAdmin = useSelector((state) => state?.isAdminUser);
  const userObject = useSelector((state) => state?.userObject);
  console.log(userObject);
  const reducerData = useSelector((state) => state?.isLoginSuccess);
  const navigate = useNavigate();
  const userPerPage = 2;
  const pagesVisited = pageNumber * userPerPage;
  let pageCount = Math.ceil(apiResponse.length / userPerPage);
 
  const displayUser = apiResponse
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((user) => {
      
      return (
        <tr>
          <td>{user.id}</td>
          <td>{user.userName}</td>
          <td>{user.emailId}</td>
          <td>{user.category}</td>
          <td>{user.wbsCode}</td>
          <td>{user.createdAt}</td>
          <td>{user.bookedEfforts}</td>
          <td>{user.comments}</td>
          <td><Link name="edit"
    to={`/update/${user.id}`}><i class="fas fa-pen"></i></Link></td>
          <td><Button onClick={e=>handleDelete(user.id)} ><i class="fa-solid fa-trash"></i></Button></td>

        </tr>
      );
    });
    console.log(displayUser);
  const changePage = ({ selected }) => {
    return setpageNumber(selected);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(userObject.userName);
  const fetchData = () => {
    let apiEndPoint = "";
    if (userObject) {
      apiEndPoint =
        "http://localhost:8181/api/timesheetByUserName/" + userObject.userName;
      // apiEndPoint = 'http://10.81.1.250:8080/abhi_timesheet/api/timesheetByUserName/' + userObject.userName;
    }
    fetch(apiEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApiResponse(data);
      });
  };

  const handleDelete= async(id)=>{
    axios.delete("http://localhost:8181/api/timesheetDelete/" +id ).then(res=>{
      alert("Items deleted successfully");
      navigate('/home')
    })
    .catch(err=>{
      console.log(err);
    })
  }

  console.log(apiResponse);

  const handleSubmitButtonClick = () => {
    debugger;
    if (date) {
      debugger;
      console.log(date);
      console.log(apiResponse);
      var newArray = apiResponse.filter((obj) => obj.createdAt === date);
      console.log(newArray);
      setApiResponse(newArray);
      setDate("");
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
            {apiResponse.length > 0 && (
              <div>
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={(e) => exportToCSV("Timesheet_Details")}
                >
                  Export to excel
                </button>
                <br />
                <div className="p-3">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />{" "}
                  {"  "}
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    onClick={handleSubmitButtonClick}
                  >
                    Filter by date
                  </button>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="text-center py-4">
            {apiResponse.length > 0 &&
                
            
                
              <table className="table table-bordered">
                <tr>
                  <td>
                    <b>ID</b>
                  </td>
                  <td>
                    <b>User Name</b>
                  </td>
                  <td>
                    <b>Email Id</b>
                  </td>
                  <td>
                    <b>Category</b>
                  </td>
                  <td>
                    <b>WBS Code</b>
                  </td>
                  <td>
                    <b>Booking Date</b>
                  </td>
                  <td>
                    <b>Booked Efforts</b>
                  </td>
                  <td>
                    <b>Comments</b>
                  </td>
                  <td>
                    <b>Update</b>
                  </td>
                  <td>
                    <b>Delete</b>
                  </td>
                </tr>
                {displayUser}
                
                <tr>
                {/* to={`/update/${editID}`} */}
                  
                </tr>
              </table>

            }
            

            <Paginate
              pageCount={pageCount}
              userPerPage={2}
              changePage={changePage}
            />

            {apiResponse.length < 1 && (
              <div>
                <b>No data found</b>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="container my-3 py-3">
          <div className="col-12">
            <h4 className="display-7 text-center">
              You're not authorized to access this application.
            </h4>
            <h4 className="display-7 text-center">Please login to continue</h4>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default ViewDetails;
