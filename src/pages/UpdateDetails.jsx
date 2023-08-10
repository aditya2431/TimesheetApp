import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Navbar } from "react-bootstrap";
import { Footer, Navbar } from "../components";

const UpdateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [wbsCode, setWbsCode] = useState("");
  const [date, setDate] = useState("");
  const [efforts, setEfforts] = useState("");
  const [comments, setComments] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  // const [assignedto, setAssignedTo] = useState([]);
  const reducerData = useSelector((state) => state?.isLoginSuccess);
  // debugger;
  let optionTemplate = [];
  const userObject = useSelector((state) => state?.userObject);
  console.log(userObject);

  const allCRDetails = useSelector((state) => state?.allCRObject);
  console.log(allCRDetails);
  useEffect(() => {
    axios
      .get("http://localhost:8181/api/timesheet/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);


  var allwbsCode = [];
  if(allCRDetails&&allCRDetails.length>0){
  allCRDetails.map((x) => {
    if (x.assignedTo === userObject.userName) {
      allwbsCode.push(x.wbsCode);
    }
  });
}

  //   })
  // console.log(allwbsCode);

  if (allwbsCode && allwbsCode.length > 0) {
    optionTemplate = allwbsCode.map((x) => <option value={x}>{x}</option>);
  }
  const handleSubmitButtonClick = (event) => {
    console.log("validating details");
  };

  const updateDetails = async ()=>{
   console.log(id);
    axios
    .put("http://localhost:8181/api/timesheetUpdate/" +id , data,{credentials: 'include'})
    .then(res=>
      {
        console.log(res);
        alert("Data updated sucessfully")
        navigate("/viewDetails");
      })
      .catch(err=>{
        console.log(err);
      })

  }
  console.log(data);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsProcessing(true);
    toast.dismiss();
    toast.success("Submitting details....");
    updateDetails();
    setIsProcessing(false);
  };
  

  if (reducerData) {
    return (
      <>
      <Navbar />
        <div className="container my-3 py-3">
          <div className="col-12">
            <h3 className="display-7 text-center">Edit your Record</h3>
            <hr />
            <form onSubmit={handleFormSubmit}>
              <div className="col-md-2 col-xs-2 mx-auto">
                <b>User Name: </b>
                <input
                  className="form my-3"
                  type="text"
                  required
                  placeholder="Enter your user id"
                  value={data.userName}
                  onChange={(e) => setData({...data,userName: e.target.value})}
                />{" "}
                <br />
                <b>Email: </b>
                <input
                  className="form my-3"
                  type="email"
                  required
                  value={data.emailId}
                  placeholder="Enter your email id"
                  onChange={(e) => setData({...data,emailId: e.target.value})}
                />{" "}
                <br />
                <b>Category: </b>
                <select
                  value={data.category}
                  required
                  onChange={(e) => setData({...data,category: e.target.value})}
                >
                  <option value=""></option>
                  <option value="Change Request">Change Request</option>
                  <option value="Support">Support</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Training">Training</option>
                  <option value="Leave">Leave</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Project">Project</option>
                  <option value="Email">Email</option>
                  <option value="PMO Task">PMO Task</option>
                  <option value="Infra Activity">Infra Activity</option>
                  <option value="Network Issue Troubleshooting">
                    Network Issue Troubleshooting
                  </option>
                  <option value="L1 Support">L1 Support</option>
                  <option value="L2 Support">L2 Support</option>
                  <option value="Arcos Issue Resolution">
                    Arcos Issue Resolution
                  </option>
                  <option value="VPN Issue Resolution">
                    VPN Issue Resolution
                  </option>
                  <option value="Others">Others</option>
                </select>
                <b>WBS Code: </b>
                {allwbsCode && allwbsCode.length > 0 && (
                  <label>
                    <select
                      className="form my-3"
                      value={data.wbsCode}
                      onChange={(e) => setData({...data,wbsCode: e.target.value})}
                    >
                      <option value="" disabled selected>
                        Wbs Code
                      </option>
                      {optionTemplate}
                    </select>
                  </label>
                )}
                {allwbsCode.length <= 0 && (
                  <input
                    className="form my-3"
                    type="text"
                    required
                    maxLength={10}
                    placeholder="Enter Jira ticket no here"
                    value={data.wbsCode}
                    onChange={(e) => setData({...data,wbsCode: e.target.value})}
                  />
                )}
                <br />
                <b>Date: </b>
                <input
                  className="form my-3"
                  type="date"
                  required
                  value={data.createdAt}
                  onChange={(e) => setData({...data,createdAt: e.target.value})}
                />{" "}
                <br />
                <b>Comments: </b>
                <input
                  className="form my-3"
                  type="text"
                  placeholder="Additional comments"
                  value={data.comments}
                  onChange={(e) => setData({...data,comments: e.target.value})}
                />{" "}
                <br />
                <b>Efforts: </b>
                <input
                  className="form my-3"
                  type="text"
                  required
                  placeholder="Efforts for the ticket"
                  value={data.bookedEfforts}
                  onChange={(e) => setData({...data,bookedEfforts: e.target.value})}
                />{" "}
                <br />
                <div className="form my-3">
                  <button
                    disabled={isProcessing}
                    type="submit"
                    onClick={handleSubmitButtonClick}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <Toaster />
      </>
    );
  } else {
    return (
      <>
        <div className="container my-3 py-3">
          <div className="col-12">
            <h4 className="display-7 text-center">
              You're not authorized to access this application.
            </h4>
            <h4 className="display-7 text-center">Please login to continue</h4>
          </div>
        </div>
        <hr />
        <Toaster />
      </>
    );
  }
};

export default UpdateDetails;
