import Dashboard from "./Dashboard";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useAppData } from "../Contexts/AppDataContext";

export default function Home() {
  const [appData] = useAppData();
  const { activeHomeElem } = appData;
  switch (activeHomeElem) {
    case "login":
      return <Login />;
    case "register":
      return <CreateAccount />;
    default:
      return <Dashboard />;
  }
}
