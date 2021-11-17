import { useLocation, useNavigate } from "react-router-dom";
import { useAppData } from "../Contexts/AppDataContext";
import BankIcon from "../assets/bank.png";
export default function NavBar() {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [appData] = useAppData();
  const { loggedInUser } = appData;
  function isLinkActive(linkName) {
    let path = location.pathname.split("/")[1];
    if (linkName === "home") {
      if (!path) return true;
      if (location.pathname.split("/").length > 2) return true;
      if (
        ![
          "withdraw",
          "login",
          "register",
          "deposit",
          "all-data",
          "home",
        ].includes(path)
      ) {
        return true;
      }
    } else {
      if (path === linkName) return true;
      else return false;
    }
  }

  return (
    <>
      <nav className="navbar text-light navbar-expand-sm navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" onClick={() => navigateTo("/")} href="/#">
            <img
              style={{
                maxHeight: 35,
                marginRight: 5,
              }}
              className="brand-icon-image"
              src={BankIcon}
              alt="bank icon"
            />
            DevelopersBank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navmenu" className=" collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li
                onClick={() => navigateTo("/")}
                className={`nav-item link-primary nav-link ${
                  isLinkActive("home") ? "active" : ""
                }`}
              >
                Home
              </li>
              {loggedInUser ? (
                <>
                  <li
                    onClick={() => navigateTo("/withdraw")}
                    className={`nav-item nav-link ${
                      isLinkActive("withdraw") ? "active" : ""
                    }`}
                  >
                    Withdraw
                  </li>
                  <li
                    onClick={() => navigateTo("/deposit")}
                    className={`nav-item nav-link ${
                      isLinkActive("deposit") ? "active" : ""
                    }`}
                  >
                    Deposit
                  </li>
                </>
              ) : (
                <>
                  <li
                    key="login"
                    onClick={() => navigateTo("/login")}
                    className={`nav-item nav-link ${
                      isLinkActive("login") ? "active" : ""
                    }`}
                  >
                    Login
                  </li>
                  <li
                    key="register"
                    onClick={() => navigateTo("/register")}
                    className={`nav-item nav-link ${
                      isLinkActive("register") ? "active" : ""
                    }`}
                  >
                    Create Account
                  </li>
                </>
              )}

              <li
                onClick={() => navigateTo("/all-data")}
                className={`nav-item nav-link ${
                  isLinkActive("all-data") ? "active" : ""
                }`}
              >
                All Data
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
