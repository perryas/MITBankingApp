import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAppData } from "../Contexts/AppDataContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [appData, setAppData] = useAppData();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigateTo = useNavigate();
  function sumbitForm(e) {
    e.preventDefault();
    const userAccounts = appData.users;
    let user = userAccounts.find((userAccount) => {
      return userAccount.email === email;
    });
    if (!user) return setEmailError("Email does not Exist");
    if (user.password !== password) {
      return setPasswordError("Incorrect password");
    }
    setEmailError("");
    setPasswordError("");

    navigateTo("/");
    setAppData((data) => {
      return {
        ...data,
        loggedInUser: user,
        history: [...data.history, `${user.email} logged in`],
      };
    });
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <div className="card-body p-4">
          <form onSubmit={sumbitForm} id="login-form">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              {passwordError && (
                <div className="text-danger">{passwordError}</div>
              )}
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button form="login-form" type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
