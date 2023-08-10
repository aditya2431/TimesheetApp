import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../components";
import "./Entercr.css";
import { Card, Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Entercr = () => {
  const [wbsCode, setWbsCode] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [appName, setAppName] = useState("");
  const [apiResponse, setApiResponse] = useState([{}]);
  const [assignedto, setAssignedTo] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  let optionTemplate = [];
  const [inputList, setInputList] = useState([
    {
      wbsCode: "",
      abhiManager: "",
      partnerManager: "",
      vendorName: "",
      appName: "",
      taskID: "",
      description: "",
      assignedTo: "",
      estimatedEfforts: "",
      startDate: null,
      endDate: null,
    },
  ]);
  const [particularAbhiManager, setparticularAbhiManager] = useState(['']);

  const handleAbhiManagerChange = (e) => {
    setparticularAbhiManager(e.target.value);
  };
  const [particularPartnerManager, setparticularPartnerManager] = useState(['']);

  const handlePartnerManagerChange = (e) => {
    setparticularPartnerManager(e.target.value);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];

    list[index][name] = value;

    setInputList(list);
  };
  console.log(assignedto[0]);
  const list = { ...inputList };
  if (inputList && inputList.length > 0) {
    inputList.map((currElement, i) => {
      currElement.assignedTo = assignedto;
      currElement.wbsCode = wbsCode;
      currElement.abhiManager = particularAbhiManager;
      currElement.partnerManager = particularPartnerManager;
      currElement.vendorName = vendorName;
      currElement.appName = appName;
    });
  }

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        taskID: "",
        description: "",
        assignedTo: "",
        estimatedEfforts: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };

  const reducerData = useSelector((state) => state?.isLoginSuccess);

  const allManagerDetails = useSelector((state) => state?.allUsersObject);

  if (allManagerDetails && allManagerDetails.length > 0) {
    var abhiManagerList = allManagerDetails.filter(
      (obj) => obj.abhiManager !== null
    );
  }
console.log(abhiManagerList);
  if (allManagerDetails && allManagerDetails.length > 0) {
    var partnerManagerList = allManagerDetails.filter(
      (obj) => obj.partnerManager !== null
    );
  }

  if (allManagerDetails && allManagerDetails.length > 0) {
    var assignedTO = allManagerDetails.filter(
      (obj) =>
        obj.abhiManager === particularAbhiManager &&
        obj.partnerManager === particularPartnerManager
    );
  }
console.log(partnerManagerList);
  const addDetails = async () => {
    const request = inputList;
    // axios.post('http://10.81.1.250:8080/abhi_timesheet/api/enterCR', request, {credentials: 'include'})
    axios
      .post("http://localhost:8181/api/enterCR", request, {
        credentials: "include",
      })
      .then((response) => {
        if (response.status === 200) {
          setApiResponse(response.data);
          setIsProcessing(false);
          toast.dismiss();
          if (apiResponse) {
            toast.success("Details submitted successfully.");
          }
        } else {
          alert("Error scenario");
          setIsProcessing(false);
          toast.dismiss();
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message, "Please try again with CORS free browser");
        setIsProcessing(false);
        toast.dismiss();
        toast.error("Something went wrong");
      });

    setInputList([{}]);
  };
  console.log(inputList);

  const handleSubmitButtonClick = () => {
    console.log("validating details");
  };
  const handleFormSubmit = (event) => {
    console.log(assignedto);
    event.preventDefault();
    setIsProcessing(true);
    toast.dismiss();
    toast.success("Submitting details....");
    addDetails();
    setIsProcessing(false);
    setAppName("");
    setVendorName("");
    setWbsCode("");
    setparticularAbhiManager(" ");
    setparticularPartnerManager(" ");
    setAssignedTo("");

    setInputList([
      {
        taskID: "",
        description: "",
        assignedTo: "",
        estimatedEfforts: "",
        startDate: "",
        endDate: "",
      },
    ]);
    event.preventDefault();
    return;
  };

  if (assignedTO && assignedTO.length > 0) {
    optionTemplate = assignedTO.map((x) => (
      <option value={x.userName}>{x.userName}</option>
    ));
  }

  if (reducerData) {
    return (
      <>
        <Container className="context">
          <Navbar />

          <Card alignment="center" clasaName="card">
            <div>
              <form onSubmit={handleFormSubmit}>
                <h5 className="mt-3 mb-4 fw-bold text-center"> CR Efforts </h5>
                <div className="CR">
                  <input
                    className="inputCR"
                    type="text"
                    name="CR Number"
                    value={wbsCode}
                    onChange={(e) => setWbsCode(e.target.value)}
                    placeholder="CR Number"
                  />

                  <select
                    className="inputCR"
                    onChange={handleAbhiManagerChange}
                  >
                    <option value="" disabled selected>
                      Abhi Manager
                    </option>
                    {abhiManagerList.map((x) => {
                      return (
                        <option value={x.abhiManager}>{x.abhiManager}</option>
                      );
                    })}
                  </select>

                  <select
                    className="inputCR"
                    onChange={handlePartnerManagerChange}
                  >
                    <option value="" disabled selected>
                      Partner Manager
                    </option>
                    {partnerManagerList.map((x) => {
                      
                      return (
                        
                        <option value={x.partnerManager}>
                          {x.partnerManager}
                        </option>
                      );
                    })}
                  </select>

                  <input
                    className="inputCR"
                    type="text"
                    name="Vendor Name"
                    placeholder="Vendor Name"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                  <input
                    className="inputCR"
                    type="text"
                    name="App Name"
                    value={appName}
                    placeholder="App Name"
                    onChange={(e) => setAppName(e.target.value)}
                  />
                </div>

                {inputList &&
                  inputList.length > 0 &&
                  inputList.map((x, i) => {
                    return (
                      <div className="buttons">
                        <div class="row mx-0">
                          <div class="col p-3 box">
                            <input
                              className="btntask"
                              name="taskID"
                              placeholder="TaskID"
                              value={x.taskID}
                              type="text"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>

                          <div class="col p-3 box">
                            <input
                              className="ml10_description"
                              name="description"
                              placeholder="Description"
                              value={x.description}
                              type="text"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>

                          <div class="col p-3 box">
                            <label>
                              <select
                               className="ml10_assignedTo"
                                value={assignedto}
                                onChange={(e) => setAssignedTo(e.target.value)}
                              >
                                 <option value="" disabled selected>
                      Assigned To
                    </option>
                                {optionTemplate}
                              </select>
                            </label>
                          </div>

                          <div class="col p-3 box">
                            <input
                              className="ml10"
                              name="startDate"
                              placeholder="Start Date"
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              value={x.startDate}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>
                          <div class="col p-3 box">
                            <input
                              className="ml10"
                              name="endDate"
                              placeholder="End Date"
                              type="text"
                              value={x.endDate}
                              onChange={(e) => handleInputChange(e, i)}
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                            />
                          </div>

                          <div class="col p-3 box ">
                            <input
                              className="btntask"
                              name="estimatedEfforts"
                              placeholder="Estimated Efforts"
                              value={x.estimatedEfforts}
                              type="text"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>

                          <div class="col p-3 box ">
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <button
                                  className="remove"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  <i class="fa fa-minus"></i>
                                </button>
                              )}
                              {inputList.length - 1 === i && (
                                <button
                                  className="add"
                                  onClick={handleAddClick}
                                >
                                  <i class="fa fa-plus"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <br></br>
                <div className="submitcr">
                  {" "}
                  <button
                    className="button"
                    disabled={isProcessing}
                    type="submit"
                    onClick={handleSubmitButtonClick}
                  >
                    Submit{" "}
                  </button>
                </div>
              </form>
            </div>
            <br></br>
          </Card>

          <Toaster />
          <Footer />
        </Container>
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
        <hr />
        <Toaster />
        <Footer />
      </>
    );
  }
};
export default Entercr;
