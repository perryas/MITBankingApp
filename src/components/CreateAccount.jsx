import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppData } from "../Contexts/AppDataContext";
import TermsAndConditions from "./TermsAndConditions";

export default function CreateAccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedTAndC, setAgreedTAndC] = useState(false);
  const [appData, setAppData] = useAppData();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loggedInUser } = appData;
  const navigateTo = useNavigate();

  function accountAlreadyExists() {
    const existingAccounts = appData.users;
    return existingAccounts.find((account) => {
      return account.email === email;
    });
  }
  function isPasswordShort() {
    return password.length < 8;
  }

  useEffect(() => {
    if (appData.userLoggedIn && appData.activeHomeElem !== "register") {
      navigateTo("/");
    }
  }, [appData.userLoggedIn, appData.activeHomeElem, navigateTo]);

  function sumbitForm(e) {
    e.preventDefault();

    if (accountAlreadyExists()) {
      setEmailError("Email already exists");
    }
    if (isPasswordShort()) {
      setPasswordError("Password must be at least 8 characters long");
    }
    if (accountAlreadyExists() || isPasswordShort()) return;
    setPasswordError("");
    setEmailError("");
    setAppData((existingAppData) => {
      let newUser = { fullName, email, password, balance: 0 };
      return {
        ...existingAppData,
        users: [...existingAppData.users, newUser],
        loggedInUser: newUser,
        activeHomeElem: "home",
        history: [...existingAppData.history, `${email} account was created`],
      };
    });
    navigateTo("/");
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Create An Account</h1>
        </div>
        <div className="card-body p-4">
          <form onSubmit={sumbitForm} id="create-account-form">
            <div className="mb-3">
              <label htmlFor="full-name-input" className="form-label">
                Full Name
              </label>
              <input
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                type="text"
                className="form-control"
                id="full-name-input"
              />
            </div>
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
                className={`form-control`}
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
                className={`form-control`}
                id="exampleInputPassword1"
              />
              {passwordError && (
                <div className="text-danger">{passwordError}</div>
              )}
            </div>
            <div className="mb-3 form-check">
              <input
                checked={agreedTAndC}
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={(e) => {
                  setAgreedTAndC(e.target.checked);
                }}
                required
              />
              <label
                // onClick={(e) => e.stopPropagation()}
                className="form-check-label"
                // htmlFor="exampleCheck1"
              >
                I agree to the <TermsAndConditions />
              </label>
            </div>
          </form>
        </div>
        <div className="card-footer">
          {" "}
          {loggedInUser && (
            <button
              onClick={() => {
                setAppData((existingAppData) => {
                  return {
                    ...existingAppData,
                    activeHomeElem: "home",
                  };
                });
              }}
              className="btn btn-secondary me-2"
            >
              Back
            </button>
          )}
          <button
            form="create-account-form"
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
