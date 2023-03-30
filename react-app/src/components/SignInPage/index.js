import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import gloog from "../../images/gloog.jpeg";
import { login } from "../../store/session";
import demouser from "../../images/demouser.jpeg";
import "./SignInPage.css";

function SignInPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const password = "password";
  const credential = "demo@aa.io";
  const firstName = "Demo";
  const lastName = "User";

  const demoUser = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(credential, password));
    history.push('/')
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-container">
        <div className="top-section-box">
          <img
            src={gloog}
            style={{ width: "75px", height: "30px" }}
            id="gloog"
          ></img>
          <div className="choose-account">Choose an account</div>
        </div>
        <div className="bottom-section-box">
          <div className="user-container" onClick={demoUser}>
            <img id="demo-user-pic" src={demouser}></img>
            <div className="credentials-box">
              <div className="names-box">
                <div style={{ fontSize: "14px" }}>{firstName}</div>
                <div style={{ fontSize: "14px" }}>{lastName}</div>
              </div>
              <div style={{ fontWeight: "100", color: "gray", fontSize: '14px' }}>
                {credential}
              </div>
            </div>
          </div>
            <div className='line'></div>
          <div className="other-account-container">
            <i class="fa-regular fa-circle-user" id='other-user-icon' ></i>
            <div className='user-other-account'>User another account</div>
          </div>
          <div className='line'></div>
        </div>
      </div>
      <div>bottom links</div>
    </div>
  );
}

export default SignInPage;
