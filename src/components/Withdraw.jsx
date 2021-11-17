import { useState } from "react";
import { useAppData } from "../Contexts/AppDataContext";

export default function Withdraw() {
  const [appData, setAppData] = useAppData();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState("");
  const { loggedInUser } = appData;
  function onClickWithdraw(e) {
    e.preventDefault();
    if (!withdrawAmount) return;
    setError(null);
    if (loggedInUser.balance < withdrawAmount) {
      return setError("You don't have enough funds");
    }

    let loggedInUserInUsers = appData.users.find((user) => {
      return user.email === loggedInUser.email;
    });
    loggedInUserInUsers.balance =
      parseInt(loggedInUser.balance) - withdrawAmount;
    setWithdrawAmount("");

    setAppData((existingData) => {
      const history = existingData.history;
      return {
        ...existingData,
        users: [...existingData.users],
        loggedInUser: { ...loggedInUserInUsers },
        history: [
          ...history,
          `${loggedInUser.email} withdrew ${withdrawAmount}`,
        ],
      };
    });
  }

  return (
    <div className="container mt-5 deposit-container">
      <div className="card">
        <div className="card-header text-center">
          <h1>Make a Withdrawl</h1>
        </div>

        <div className="card-body">
          <h2>Account balance {appData.loggedInUser.balance}</h2>
          <form id="withdraw-form" onSubmit={onClickWithdraw}>
            <input
              value={withdrawAmount}
              onChange={(e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value)) value = 0;
                value = Math.abs(value);
                setWithdrawAmount(value);
              }}
              className={`${error ? "text-danger" : ""} form-control`}
              required
              type="number"
            />
            {error && <div className="text-danger">{error}</div>}
          </form>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            className="d-block btn-lg mx-auto btn btn-primary"
            form="withdraw-form"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
