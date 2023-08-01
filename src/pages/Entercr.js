import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../components";
import "./Entercr.css";
import { Card, Container } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";


const Entercr = () => {
  const [wbsCode, setWbsCode] = useState('');

  const [vendorName, setVendorName] = useState('');
  const [appName,setAppName] = useState('');

  const [apiResponse,setApiResponse] = useState([{}]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputList, setInputList] = useState([
    {

      taskID: "",
      description: "",
      assignedTo: "",
      estimatedEfforts: "",
      startDate: null,
      endDate: null,
    },
  ]);
  const [particularAbhiManager, setparticularAbhiManager] = useState([]);
  const [assignedto, setAssignedTo] = useState("");

  const handleAbhiManagerChange = (e) => {
    setparticularAbhiManager(e.target.value);
  };
  const [particularPartnerManager, setparticularPartnerManager] = useState([]);

  const handlePartnerManagerChange = (e) => {
    setparticularPartnerManager(e.target.value);
  };
  const handleInputChange = (e, index) => {
    // debugger;
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const list = [...inputList];
    console.log(list);
    list[index][name] = value;
    console.log(list);
    setInputList(list);
  };

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
  // console.log(reducerData);
  const allManagerDetails = useSelector((state) => state?.allUsersObject);
  // console.log(allManagerDetails);

  var abhiManagerList = allManagerDetails.filter(
    (obj) => obj.abhiManager !== null
  );
  // console.log(abhiManagerList);
  var partnerManagerList = allManagerDetails.filter(
    (obj) => obj.partnerManager !== null
  );
  // console.log(partnerManagerList);
  var assignedTO = allManagerDetails.filter(
    (obj) =>
      obj.abhiManager === particularAbhiManager &&
      obj.partnerManager === particularPartnerManager
  );
  // console.log(assignedTo);

  const addDetails = async () => {
    const request = {
      wbsCode: wbsCode,
      particularAbhiManager:particularAbhiManager,
      particularPartnerManager: particularPartnerManager,
      vendorName: vendorName,
      appName:appName,
      inputList:inputList
      // taskID: taskID,
      // description:description,
      // assignedTO:assignedTO,
      // startDate:startDate,
      // endDate:endDate,
      // estimatedEfforts:estimatedEfforts
    };
 // axios.post('http://10.81.1.250:8080/abhi_timesheet/api/enterCR', request, {credentials: 'include'})
 axios.post('http://localhost:8181/api/enterCR', request, {credentials: 'include'})
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


setWbsCode('');
setparticularAbhiManager('');
setparticularPartnerManager('');
setVendorName('');
setAppName('');
setInputList('');

}
console.log(inputList);
console.log(wbsCode);
console.log(vendorName);
console.log(particularAbhiManager);
console.log(particularPartnerManager);
console.log(appName);

const handleSubmitButtonClick = () => {
  console.log("validating details");
}
const handleFormSubmit = (event) => {
  console.log(assignedto);
  event.preventDefault();
  setIsProcessing(true);
  toast.dismiss();
  toast.success("Submitting details....")
  // addDetails();
  setIsProcessing(false)
}

let optionTemplate = assignedTO.map(x=>(
<option value={x.userName}>{x.userName}</option>
));


//   return (
//     <label>
//       Pick your favorite Number:
//       <select value={this.state.value} onChange={this.handleChange}>
//         {optionTemplate}
//       </select>
//     </label>
//   );
// }

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

                <select className="inputCR" onChange={handleAbhiManagerChange} >
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

              {inputList.map((x, i) => {
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
                        
                        {/* <select className="ml10"  >
                          <option selected disabled >
                         
                            Assigned To
                          </option>
                          {assignedTO.map((a) => {
                            return (
                              // <option  value={x.assignedTo} onChange={(e) => handleInputChange(e, i)}>{a.userName}</option>
                              <option  value={this.data.assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>{a.userName}</option>
                          
                            );
                          })}
                        </select> */}
                        {/* <select value={assignedto} required onChange={(e) => setAssignedTo(e.target.value)}>
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
                <option value="Network Issue Troubleshooting">Network Issue Troubleshooting</option>
                <option value="L1 Support">L1 Support</option>
                <option value="L2 Support">L2 Support</option>
                <option value="Arcos Issue Resolution">Arcos Issue Resolution</option>
                <option value="VPN Issue Resolution">VPN Issue Resolution</option>
                <option value="Others">Others</option>
              </select> */}
              {/* { <select name="assignedTo" value={this.state.data.assignedTo}>
    {assignedTO.map((e, key) => {
        return <option key={key} value={e.userName}>{e.userName}</option>;
    })}
</select> } */}

<label>
     
        <select value={assignedto} onChange={(e) =>console.log(e.target.value)}>
         <option>{optionTemplate}</option> 
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
                            <button className="add" onClick={handleAddClick}>
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
                <button className="button" disabled={isProcessing} type = "submit" onClick={handleSubmitButtonClick}>Submit </button>
              </div>
              </form>
            </div>
            <br></br>

          </Card>
          <Footer />
        </Container>
      </>
    );
  };
}
export default Entercr;
