import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import {
  saveLoginSuccess,
  setUserObject,
  setAdminUser,
  setAllUserObject,
  setAllCRObject
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);

  const reducerData = useSelector((state) => state?.isLoginSuccess);

  useEffect(() => {
    validateLogin();
  }, []);

  const handleSubmit = () => {
    console.log("validating details");
  };

  const handleFormSubmit = (event) => {
    console.log("validate login");
    event.preventDefault();
    if (loginId === "admin") {
      dispatch(setAdminUser(true));
    }
    if (apiResponse) {
      var newArray = apiResponse.filter((obj) => obj.userName === loginId);
      const hashedPassword = bcrypt.hashSync(
        password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      if (newArray && newArray.length === 1) {
        if (
          newArray[0].userName === loginId &&
          newArray[0].password === hashedPassword
        ) {
          dispatch(saveLoginSuccess(true));
          dispatch(setUserObject(newArray[0]));
          dispatch(setAllUserObject(apiResponse));
          navigate("/home");
        } else {
          toast.dismiss();
          toast.error("Login failure");
          return;
        }
      } else {
        toast.dismiss();
        toast.error("User doesn't exist");
        return;
      }
    }
  };

  const validateLogin = () => {
    axios
      .get("http://localhost:8181/api/login")
      // axios.get('http://10.81.1.250:8080/abhi_timesheet/api/login')
      .then((response) => {
        if (response.status === 200) {
          // alert("success scenario");
          setApiResponse(response.data);
        } else {
          toast.dismiss();
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message, "Please try again with CORS free browser");
        toast.dismiss();
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>

        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div class="my-3">
                <label for="display-4">User Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="HI12345"
                  required
                  value={loginId}
                  onChange={(e) =>
                    setLoginId(e.target.value.toLocaleUpperCase())
                  }
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                  <hr></hr>
                  <Link
                    to="/updatePassword"
                    className="text-decoration-underline text-info"
                  >
                    Forgot Password?
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  class="my-2 mx-auto btn btn-dark"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
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

export default Login;
