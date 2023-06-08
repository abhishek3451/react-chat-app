import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

const ForgotPassword = () => {
  const email = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD9q0QRaqJJKEbit_CWWNIDQjj4JwfoaZ0",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);

      const data = await res.json();
      console.log(data);
      alert("verification sent");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.auth}>
      <h2>Reset Password</h2>
      <form onSubmit={changeHandler}>
        <div className={classes.control}>
          <label>Email:</label>
          <input type="email" ref={email} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Send link</button>}
          {isLoading && <p>Sending request...</p>}
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

export default ForgotPassword;
