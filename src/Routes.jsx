import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllData from "./components/Alldata";
import CreateAccount from "./components/CreateAccount";
import Deposit from "./components/Deposit";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import Withdraw from "./components/Withdraw";
import AppDataProvider from "./Contexts/AppDataContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AllRoutes() {
  return (
    <>
      <AppDataProvider>
        <Router>
          <NavBar />

          <Routes>
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route exact path="/register" element={<CreateAccount />}></Route>
            <Route
              exact
              path="/withdraw"
              element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              exact
              path="/deposit"
              element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              }
            ></Route>
            <Route exact path="/all-data" element={<AllData />}></Route>

            <Route path="*" index element={<Home />}></Route>
          </Routes>
        </Router>
      </AppDataProvider>
    </>
  );
}
