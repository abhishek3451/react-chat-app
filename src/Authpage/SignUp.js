import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { email, password, confirmPassword } = userDetails;
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdata) => ({ ...prevdata, [name]: value }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (password == confirmPassword && email && password) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9q0QRaqJJKEbit_CWWNIDQjj4JwfoaZ0",
          {
            method: "POST",
            body: JSON.stringify({
              email: userDetails.email,
              password: userDetails.password,

              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);
        if (res.ok) {
          setUserDetails({
            email: "",
            password: "",
            confirmPassword: "",
          });
          alert("user added");
          navigate("/");
        } else {
          const data = await res.json();

          alert(data.error.message);
        }
      } else {
        alert("password or email is invalid");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.auth}>
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading ? (
            <button type="submit">Sign Up </button>
          ) : (
            <p>Sending request...</p>
          )}
          {/* {isLoading && <p>Sending request...</p>} */}

          <Link to="/">
            <button className={classes.toggle1}>
              Login with exsiting account
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
