import React from "react";
import { useNavigate } from "react-router";
import PiggyBank from "../assets/piggy bank.jpg";
import { useAppData } from "../Contexts/AppDataContext";

export default function Dashboard() {
  const [appData, setAppData] = useAppData();
  const { loggedInUser } = appData;
  const navigateTo = useNavigate();
  function handleLogout() {
    setAppData((existingData) => {
      return {
        ...existingData,
        loggedInUser: null,
        history: [...existingData.history, `${loggedInUser.email} logged out`],
      };
    });
  }
  return (
    <div className="container mt-5 home-card ">
      <div className="card">
        <div className="card-header px-5">
          <div className="d-flex m-auto">
            <h1 className="text-center">
              {loggedInUser
                ? `Welcome ${loggedInUser.fullName}`
                : "Welcome to DevelopersBanK"}
            </h1>
            {loggedInUser ? (
              <button
                onClick={handleLogout}
                className="ms-auto btn btn-warning"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
        <div className="card-body px-5">
          <img className="m-auto d-block" src={PiggyBank} alt="a piggy bank" />
          <h1 className="m-auto mt-5 bank-info">
            {loggedInUser ? "You are logged in" : "You are not logged in"}
          </h1>
        </div>
        <div className="card-footer d-flex justify-content-center">
          {!loggedInUser ? (
            <button
              onClick={() => navigateTo("/register")}
              className="btn btn-primary btn-lg me-5"
            >
              Create Account
            </button>
          ) : (
            <button
              onClick={() =>
                setAppData((data) => {
                  return {
                    ...data,
                    activeHomeElem: "register",
                  };
                })
              }
              className="btn btn-primary btn-lg"
            >
              Create Another Account
            </button>
          )}

          {!loggedInUser && (
            <button
              onClick={() => navigateTo("/login")}
              className="btn btn-secondary btn-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
