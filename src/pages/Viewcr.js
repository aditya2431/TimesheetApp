import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, Navbar } from "../components";
import "./Viewcr.css";
import { setAllCRObject } from "../redux/actions";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { all } from "axios";

const Viewcr = () => {
  const reducerData = useSelector((state) => state?.isLoginSuccess);
  const [search, setSearch] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [wbsapiResponse, setwbsapiResponse] = useState([]);
  const [effortsList, seteffortsList] = useState([
    {
      wbsCode: "",
      totalefforts: "",
    },
  ]);

  const uniquewbsCode = [...new Set(apiResponse.map((obj) => obj.wbsCode))];
  console.log(uniquewbsCode);

  const dispatch = useDispatch();
  const uniquewbsCodeList = apiResponse.map(
    (obj) => obj.wbsCode === uniquewbsCode
  );
  console.log(uniquewbsCodeList);
  const allCRDetails = useSelector((state) => state?.allCRObject);
  console.log(allCRDetails);
  const handleefforts = (estimatedefforts, totalefforts) => {
    if (totalefforts > estimatedefforts) {
      return "red";
    } else {
      return "green";
    }
  };

  const display = apiResponse
    .filter((x) => {
      return search === " " ? x : x.wbsCode.includes(search);
    })
    .map((x) => {
      return (
        <tr>
          <td>{x.wbsCode}</td>
          <td>{x.taskID}</td>
          <td>{x.estimatedEfforts}</td>
          {/* <td
            style={{
              color: handleefforts(x.estimatedEfforts, x.ActualEfforts),
            }}
          >
            {x.ActualEfforts}
          </td> */}
        </tr>
      );
    });

  useEffect(() => {
    fetchData();
    fetchWbsData();
  }, []);

  const fetchData = () => {
    let apiEndPoint = "";
    // if (userObject) {
    apiEndPoint = "http://localhost:8181/api/enterCR/";
    // apiEndPoint = 'http://10.81.1.250:8080/abhi_timesheet/api/timesheetByUserName/' + userObject.userName;
    // }
    fetch(apiEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApiResponse(data);
      });
  };

  console.log(apiResponse);
  let wbsCode = [];

  if (allCRDetails && allCRDetails.length > 0) {
    allCRDetails.map((x) => {
      wbsCode.push(x.wbsCode);
    });
  }
  // let totaleffortsforCR = 0;
  console.log(wbsCode);

  console.log(wbsapiResponse);

  let totalefforts = [];

  let wbsList = [];
  for (let i = 0; i < wbsCode.length; i++) {
    let efforts = 0;
    if (wbsapiResponse && wbsapiResponse.length > 0) {
      wbsList = wbsapiResponse.filter((x) => x.wbsCode === wbsCode[i]);
    }
    console.log(wbsList);
    wbsList.map((x) => {
      let efforts1 = parseInt(x.estimatedEfforts);
      efforts += efforts1;
      console.log(efforts);
    });
    totalefforts[i] = efforts;
    console.log(totalefforts);
  }

  let allAbhiManager = [];
  if (allCRDetails && allCRDetails.length > 0) {
    allCRDetails.map((x) => {
      allAbhiManager = x.abhiManager;
    });
  }
  console.log(allAbhiManager);
  console.log(allCRDetails.abhiManager);
  const fetchWbsData = () => {
    let apiEndPoint = "";
    // if (userObject) {

    apiEndPoint =
      "http://localhost:8181/api/timesheetByAbhiManager/" + allAbhiManager;
    // apiEndPoint = 'http://10.81.1.250:8080/abhi_timesheet/api/timesheetByWBS/' + userObject.userName;
    // }

    fetch(apiEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setwbsapiResponse(data);
      });
  };

  console.log(wbsapiResponse);

  if (apiResponse) {
    dispatch(setAllCRObject(apiResponse));
  }

  console.log(all);
  if (reducerData) {
    return (
      <>
        <Navbar />

        <div className="text-center">
          <h5 className="mt-3 mb-4 fw-bold"> View CR Efforts </h5>

          <div className="formCR">
            <Form>
              <Form.Group class="my-3">
                <Form.Label>Filter Using CR</Form.Label>
                <Form.Control
                  class="px-3"
                  type="text"
                  placeholder="Filter Using CR"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Form>
            <br></br>
          </div>
          <div className="text-center py-2">
            <table
              className="CRtable"
              class="bp4-html-table bp4-html-table-bordered 
                bp4-html-table-condensed bp4-html-table-striped"
            >
              <thead>
                <tr className="CRrow" class="col-sm-12">
                  <th class="col-md-3">CR Number</th>
                  <th class="col-md-3">Task</th>
                  <th class="col-md-3">Estimated Efforts</th>
                  <th class="col-md-3">Actual Efforts</th>
                </tr>
              </thead>
              <tbody>{display}</tbody>
            </table>
          </div>
        </div>
        <br></br>
        <Footer />
      </>
    );
  }
};
export default Viewcr;
