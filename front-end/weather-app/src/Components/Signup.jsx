import React, { useState } from "react";
import "./signup.css";

import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState("");
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/createUser",
        user
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        seterrorMessage("User already exists. Please sign in instead.");
      } else {
        console.error("Error creating user:", error);
        seterrorMessage("Internal server error. Please try again later.");
      }
    }
  };

  return (
    <div className="signUpParent">
      <div>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </div>

      <div className="signUpDiv">
        <Form className="signUpForm" onSubmit={submit}>
            <h1 className="text-center">Sign Up</h1>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" type="submit">
              Submit
            </Button>
            <div>
              <p>Already have an account?</p>
              <Link to={"/login"}>Sign In</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
