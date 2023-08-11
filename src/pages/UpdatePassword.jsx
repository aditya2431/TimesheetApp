import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  const [isValidUser, setisValidUser] = useState(false);

  const navigate = useNavigate();

  const salt = bcrypt.genSaltSync(10);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = () => {
    console.log("validating details");
  };

  const handleSubmit = (event) => {
    let userAlreadyExist = false;
    if (password === confirmPassword) {
      console.log(apiResponse);
      if (apiResponse) {
        for (let i = 0; i < apiResponse.length; i++) {
          console.log(apiResponse[i].userName);
          if (apiResponse[i].userName === userId) {
            setisValidUser(true);
            registerUser();
            event.preventDefault();
            return;
          }
        }
        if (isValidUser === false) {
          toast.error("Invalid userName");
          toast.dismiss();
        }
      }
    } else {
      alert("Password and Confirm Password didn't match!!!");
    }
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const fetchData = () => {
    // fetch("http://localhost:8181/api/login")
    fetch('http://10.81.1.250:8080/abhi_timesheet/api/login')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setApiResponse(data);
      });
  };

  const registerUser = () => {
    const hashedPassword = bcrypt.hashSync(
      password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    console.log("hashed password is:", hashedPassword);
    const request = {
      userName: userId,
      password: hashedPassword,
    };
    console.log(userId);
    console.log(isValidUser);

    axios
      // .put("http://localhost:8181/api/passwordUpdate", request, {
      .put("http://10.81.1.250:8080/abhi_timesheet/api/passwordUpdate", request, {
        credentials: "include",
      })
      .then((res) => {
        console.log(res);
        alert("Password updated sucessfully");
        navigate("/ABHI_Timesheet");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(confirmPassword);
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Reset Password</h1>

        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-6 mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div class="form my-3">
                <div className="row">
                  <label for="Name">User Name </label>
                  <div className=" col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      required
                      placeholder="HI1234"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value.toUpperCase())}
                    />
                  </div>

                  <div className="input-group-btn col-sm-2"></div>
                </div>
              </div>

              <div className="row">
                <label for="Password">Password</label>
                <div className=" col-sm-7">
                  <input
                    type={passwordType}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="input-group-btn col-sm-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="row">
                <label for="Confirm Password">Confirm Password</label>
                <div className=" col-sm-7">
                  <input
                    type={passwordType}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    name="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="input-group-btn col-sm-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  class="my-2 mx-auto btn btn-dark"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default UpdatePassword;
