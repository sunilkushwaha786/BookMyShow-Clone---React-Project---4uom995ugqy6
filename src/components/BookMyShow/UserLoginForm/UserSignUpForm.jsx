import React, { useState } from "react";
import { BsShieldLock } from "react-icons/bs";

export function UserSignUpForm(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userFlag, setUserFlag] = useState(false);
  const [emailFlag, setEmailFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [infoExist, setInfoExist] = useState(false);

  const loginFunction = (e) => {
    e.stopPropagation();
    props.flagSet();
  };

  const userInputHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  let loginInfo;
  if (localStorage.getItem("userInfo") === null) {
    loginInfo = [];
  } else {
    loginInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  const submitHandler = (e) => {
    e.preventDefault();

    setUserFlag(false);
    setEmailFlag(false);
    setPasswordFlag(false);
    setInfoExist(false);

    if (userName === "") {
      setUserFlag(true);
      return;
    }

    if (email === "") {
      setEmailFlag(true);
      return;
    }

    if (password === "") {
      setPasswordFlag(true);
      return;
    }

    if (userName !== "" && password !== "" && email !== "") {
      const storeToLocal = {
        userName,
        email,
        password,
      };
      
      if (
        loginInfo.some(
          (info) =>
            info.userName === storeToLocal.userName ||
            info.email === storeToLocal.email
        )
      ) {
        setInfoExist(true);
        return;
      } else {
        loginInfo.push(storeToLocal);
        localStorage.setItem("userInfo", JSON.stringify(loginInfo));
      }
    }
    setUserName("");
    setPassword("");
    setEmail("");
    props.flagSet();
  };

  return (
    <div className="wraper-div">
      <form onSubmit={submitHandler} className="login-form">
        <div className="login-logo">
          <BsShieldLock style={{ fontSize: "2rem" }} />
        </div>
        <h3 className="user-heading">Sing Up</h3>
        {infoExist && (
          <div className="warning">Username or email already exists</div>
        )}
        <input
          type="text"
          placeholder="User Name*"
          onChange={userInputHandler}
          value={userName}
        />
        {userFlag && <div className="warning">Please Enter User Name</div>}
        <input
          type="email"
          placeholder="email*"
          onChange={emailInputHandler}
          value={email}
        />
        {emailFlag && <div className="warning">Please Enter User Name</div>}
        <input
          type="password"
          placeholder="password*"
          onChange={passwordInputHandler}
          value={password}
        />
        {passwordFlag && <div className="warning">Please Enter User Name</div>}
        <button type="submit">Sign Up</button>
      </form>
      <p className="account-check" onClick={loginFunction}>
        Already have an account? Login
      </p>
    </div>
  );
}
