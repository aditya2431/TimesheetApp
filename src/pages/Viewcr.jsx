import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../components";
import "./Viewcr.css";
import data from "./dummy.json";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";

const Viewcr = () => {
  const reducerData = useSelector((state) => state?.isLoginSuccess);
  const [search, setSearch] = useState("");
  const handleefforts = (estimatedefforts, totalefforts) => {
    if (totalefforts > estimatedefforts) {
      return "red";
    } else {
      return "green";
    }
  };
  const display = data
    .filter((x) => {
      return search === " " ? x : x.CRNumber.includes(search);
    })
    .map((x) => {
      return (
        <tr>
          <td>{x.CRNumber}</td>
          <td>{x.Task}</td>
          <td>{x.EstimatedEfforts}</td>
          <td
            style={{
              color: handleefforts(x.EstimatedEfforts, x.ActualEfforts),
            }}
          >
            {x.ActualEfforts}
          </td>
        </tr>
      );
    });

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
