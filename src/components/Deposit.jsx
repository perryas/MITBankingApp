import { useState } from "react";
import { useAppData } from "../Contexts/AppDataContext";

export default function Deposit() {
  const [appData, setAppData] = useAppData();
  const [depositAmount, setDepositAmount] = useState("");
  const { loggedInUser } = appData;
  function onClickDeposit(e) {
    e.preventDefault();
    if (!depositAmount) return;
    let loggedInUserInUsers = appData.users.find((user) => {
      return user.email === loggedInUser.email;
    });
    loggedInUserInUsers.balance =
      parseInt(loggedInUser.balance) + depositAmount;
    setDepositAmount("");

    setAppData((existingData) => {
      const history = existingData.history;
      return {
        ...existingData,
        users: [...existingData.users],
        loggedInUser: { ...loggedInUserInUsers },
        history: [
          ...history,
          `${loggedInUser.email} deposited ${depositAmount}`,
        ],
      };
    });
  }

  return (
    <div className="container deposit-container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h1>Make a deposit</h1>
        </div>

        <div className="card-body">
          <h2>Account balance {appData.loggedInUser.balance}</h2>
          <form onSubmit={onClickDeposit} id="deposit-form">
            <input
              value={depositAmount}
              onChange={(e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value)) value = 0;
                value = parseInt(Math.abs(value));
                setDepositAmount(value);
              }}
              className="form-control"
              type="number"
              required
            />
          </form>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            form="deposit-form"
            className="d-block btn-lg mx-auto btn btn-primary"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
