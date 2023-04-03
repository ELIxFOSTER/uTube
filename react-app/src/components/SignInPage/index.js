import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import gloog from "../../images/gloog.jpeg";
import { login } from "../../store/session";
import demouser from "../../images/demouser.jpeg";
import { getUserById } from "../../store/session";
import { useEffect } from "react";
import "./SignInPage.css";

function SignInPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const demoUserState = useSelector((state) => state.session.VideoUser)
  const password = "password";
  const credential = "demo@aa.io";
  const firstName = "Demo";
  const lastName = "User";

  useEffect((state) => {
    dispatch(getUserById(1))
  }, [dispatch])

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
            <img id="demo-user-pic" src={demoUserState?.profile_img}></img>
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
            <NavLink to='/login' style={{ textDecoration: "none", color: "inherit" }}>
          <div className="other-account-container">
            <i className="fa-regular fa-circle-user" id='other-user-icon' ></i>
            <div className='user-other-account'>Use another account</div>
          </div>
            </NavLink>
          <div className='line'></div>
          <NavLink to='/signup' style={{ textDecoration: "none", color: "inherit" }}>
          <div className='ep-create-account-container'>
          <i className="fa-solid fa-circle-plus" id='ep-create-account-icon'></i>
          <div className='ep-create-text'>Create an account</div>
          </div>
          </NavLink>
        </div>
      </div>
      <div>bottom links</div>
    </div>
  );
}

export default SignInPage;
