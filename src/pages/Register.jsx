import React, { useState, useEffect } from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [userId, setUserId] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [apiResponse, setApiResponse] = useState({});
    const navigate = useNavigate();

    const salt = bcrypt.genSaltSync(10);

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleSubmit = () => {
        console.log("validating details");
    }

    const handleFormSubmit = (event) => {
        let userAlreadyExist = false;
        if (apiResponse) {
            apiResponse.forEach(element => {
                console.log(element);
                if (element.userName === userId) {
                    event.preventDefault();
                    userAlreadyExist = true;
                    toast.dismiss();
                    toast.error("User already exist");
                    setUserId('');
                    setEmailId('');
                    setPassword('');
                    return;
                }
            });
        }
        console.log(userAlreadyExist);
        if (!userAlreadyExist) {
            registerUser();
        }
    };

    const fetchData = () => {
        fetch('http://localhost:8090/api/login')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setApiResponse(data)
            })
    };

    const registerUser = () => {
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u');
        console.log("hashed password is:", hashedPassword);
        const request = {
            userName: userId,
            emailId: emailId,
            password: hashedPassword
        };

        // axios.post('http://10.81.1.250:8080/abhi_timesheet/api/register', request, { credentials: 'include' })
        axios.post('http://localhost:8090/api/register', request, { credentials: 'include' })
            .then((response) => {
                if (response.status === 200) {
                    // alert("success scenario");
                    setApiResponse(response.data);
                    if (apiResponse) {
                        toast.dismiss();
                        toast.success("User registered successfully.");
                    }
                } else {
                    alert("Error scenario");
                    toast.dismiss();
                    toast.error("User registration failed");
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.message, "Please try again with CORS free browser");
                toast.dismiss();
                toast.error("Something went wrong");
            });

        setUserId('');
        setEmailId('');
        setPassword('');
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleFormSubmit}>
                            <div class="form my-3">
                                <label for="Name">User Id</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="userId"
                                    placeholder="Your user id"
                                    required
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value.toUpperCase())}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    required
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/ABHI_Timesheet" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={handleSubmit}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <Toaster />
        </>
    )
}

export default Register