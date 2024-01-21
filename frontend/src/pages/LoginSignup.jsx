import { useState } from "react";
import "../styles/loginsignup.css";
import Signupform from "../forms/Signupform";
import Loginform from "../forms/Loginform";

const LoginSignup = () => {
  const [isLoginBtn, setIsLoginBtn] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleLogin = () => {
    setIsLoginBtn(true)
  };
  const handleSignUp = () => {
    setIsLoginBtn(false)
  }
  const handleFormSubmit = (submittedSuccessfully) => {
    if (submittedSuccessfully) setIsLoginBtn(true);
    setIsFormSubmitted(submittedSuccessfully);
  };
  return (
    <div className="login-signup">
      <div className="login-title"> QUIZZIE</div>
      <div className="loginsignup-btn-container">
        <div
          className={`signup-btn ${isLoginBtn ? "" : "selected"}`}
          onClick={handleSignUp}
        >
          Sign Up
        </div>
        <div
          className={`login-btn ${isLoginBtn ? "selected" : ""}`}
          onClick={handleLogin}
        >
          Log In
        </div>
      </div>
      {isLoginBtn ? <Loginform/> : <Signupform onFormSubmit={handleFormSubmit}/>}
    </div>
  );
};

export default LoginSignup;
