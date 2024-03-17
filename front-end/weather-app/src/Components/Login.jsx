import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
function Login() {
  const navigate = useNavigate();
  const [input, setinput] = useState({});

  const [message, setmessage] = useState("");
  const handleChange = (event) => {
    setinput({ ...input, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = input;
      const response = await axios.post(
        "http://localhost:5000/loginUser",
        input
      );
      console.log(response.data);

      const userId = response.data.userId;

      if (response.data.message === "login success") {
        navigate(`/weather/${userId}`);
        swal("Login Successful");
      }
    } catch (err) {
      console.log(err);
      setmessage("Please try again");
    }
  };

  return (
    <div className="loginParent">
      <div>{message && <Alert variant="danger">{message}</Alert>}</div>
      <div className="loginDiv">
        <Form className="loginForm" onSubmit={submit}>
          <h1 className="text-center">Login</h1>
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
              <p>Don't have an account?</p>
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
