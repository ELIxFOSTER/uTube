import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      if (data[0] === 'password : Password was incorrect.') {
        setErrors(['Invalid Credentials'])
      } else {
        setErrors(data);
      }
    }
  };

  return (
    <div className='login-page-wrapper'>
      <div className='login-page-container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='login-page-form'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit" id='login-page-button'>Log In</button>
      </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
