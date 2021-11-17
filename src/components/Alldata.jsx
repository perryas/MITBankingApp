import { useAppData } from "../Contexts/AppDataContext";

export default function AllData() {
  const [appData] = useAppData();
  const { users, history } = appData;
  return (
    <div className="mt-5 container all-data-container ">
      <div className="card">
        <div className="card-header">
          <h1 className="text-center">All the data in the store</h1>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.email}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr style={{ height: 5 }} />
          <ul className="list-group">
            {history.map((event, index) => {
              return (
                <li key={index} className="list-group-item">
                  {event}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
