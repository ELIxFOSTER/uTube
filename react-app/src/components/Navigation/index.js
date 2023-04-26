import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import VideoCreateModal from "../VideoCreateModal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";
import SearchBar from "./Searchbar";

import sheesh from "../../images/sheesh.jpeg";
import LoginFormModal from "../LoginFormModal";


function Navigation({ isLoaded }) {
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuTwo, setShowMenuTwo] = useState(false)
  const dispatch = useDispatch()
  const ulRef = useRef();

  const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
    setShowModal(true);
  };

  const handleOtherClick = () => {
    setShowMenuTwo(true)
  }

  const openMenuTwo = () => {
    if (showMenuTwo) return
    setShowMenuTwo(true)
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };



  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (!showMenuTwo) return;

    const closeMenuTwo = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenuTwo(false);
      }
    };

    document.addEventListener("click", closeMenuTwo);

    return () => document.removeEventListener("click", closeMenuTwo);
  }, [showMenuTwo]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-pic-dropdown" + (showMenu ? "" : " hidden");
  const createClassName = "create-dropdown" + (showMenuTwo ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  const closeMenuTwo = () => setShowMenuTwo(false)


  return (
    <div className="nav-contents-wrapper">
      <div className='nav-left-section'>
        <div>
        <i id='nav-menu-bars' className="fa-solid fa-bars"></i>
        </div>
        <NavLink
          exact
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img id="logo" src={sheesh}></img>
        </NavLink>
      </div>
      <div>
        <SearchBar />
      </div>
      {isLoaded && (
        <div className="right-side-content-container">
          <div>
            {/* <NavLink to='/create'
					style={{ textDecoration: 'none', color: 'inherit'}}>
						Create
					</NavLink> */}
            {sessionUser ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: '30px'
              }}>
                  <i id='nav-create-video-icon'className="fa-solid fa-video" onClick={openMenuTwo} ></i>
                <div className={createClassName} ref={ulRef}>
                <NavLink
                  to="/channel"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <OpenModalButton
                  buttonText='Upload video'
                  onItemClick={closeMenuTwo}
                  modalComponent={<VideoCreateModal />}
                  styleOption='upload-video-btn'
                  />
                </NavLink>
                </div>
                  <img id='nav-profile-pic' src={sessionUser.profile_img} onClick={openMenu}></img>
                  <div className={ulClassName} ref={ulRef}>
                    <div className='profile-section-container'>
                      <img id='dropdown-profile-pic' src={sessionUser.profile_img}></img>
                      <div>
                        <div>{sessionUser.firstName} {sessionUser.lastName}</div>
                        <div>@{sessionUser.username}</div>
                      </div>
                    </div>
                    <div className='options-container'>
                      <div id='individual-box'>
                      <i className="fa-regular fa-user"></i>
                      <NavLink to='/channel' style={{ textDecoration: "none", color: "inherit" }} onClick={closeMenu}>
                        <div style={{ fontSize: '14px' }}>Your channel</div>
                      </NavLink>
                      </div>
                      <div id='individual-box'>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <div style={{ fontSize: '14px' }} onClick={handleLogout}>Sign out</div>
                      </div>
                      {/* <div id='individual-box'>
                      <i class="fa-regular fa-moon"></i>
                        <div style={{ fontSize: '14px' }}>Appearance</div>
                      </div> */}
                    </div>
                  </div>
              </div>
            ) : (
              <div>
				<i id='nav-dotted-menu' className="fa-solid fa-ellipsis-vertical"></i>
			  </div>
            )}
          </div>
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
