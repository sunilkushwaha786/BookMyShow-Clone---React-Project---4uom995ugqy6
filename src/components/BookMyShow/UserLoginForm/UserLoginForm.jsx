import React, { useReducer, useState } from "react";
import { BsShieldLock } from "react-icons/bs";
import "./UserStyle.css";
import { reducer, initialData } from "../../utills/reducer.js"

export function UserLoginForm(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userFlag, setUserFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [warningMsg,setWarningMsg] = useState(false)
  let loginInfo;

  loginInfo = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = (e) => {
    e.preventDefault();
    setUserFlag(false);
    setPassword(false);
    setWarningMsg(false);

    if (userName === "") {
      setUserFlag(true);
      return;
    }

    if (password === "") {
      setPasswordFlag(true);
      return;
    }

    if (userName !== "" && password !== "") {
      const storeToLocal = {
        userName,
        password,
      };
      let data;
      if (
        loginInfo.some(
          (info) =>
          {if((info.userName === storeToLocal.userName) && (info.password === storeToLocal.password)){
            data = info;
            return true;
          }}
        )
      ) {
        props.stateUpLisft(data.userName);
      } else {
        setWarningMsg(true);
        return
      }
    }
    props.functionCall();
  };

  const userInputHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} className="login-form">
      <div className="login-logo">
        <BsShieldLock style={{ fontSize: "2rem" }} />
      </div>
      <h3 className="user-heading">Login</h3>
      {warningMsg && <div className="warning">Username or Password Not Matching</div>}
      <input
        type="text"
        placeholder="User Name *"
        onChange={userInputHandler}
        value={userName}
      />
      {userFlag && <div className="warning">Please enter user name</div>}
      <input
        type="password"
        placeholder="password*"
        onChange={passwordInputHandler}
        value={password}
      />
      {passwordFlag && <div className="warning"></div>}
      <button type="submit">Login</button>
    </form>
  );
}
