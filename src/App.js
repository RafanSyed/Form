import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name,
      last_name,
      email,
      gender,
    };

    axios
      .post("http://localhost:8080/users", newUser)
      .then((response) => {
        setUsers((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
  };

  return (
    <div className="app">
      <div className="card">
        <header className="card-header">
          <div className="avatar-circle">UI</div>
          <div>
            <h1 className="title">User Info</h1>
            <p className="subtitle">
              Add users and see them instantly in the list below.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="John"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn">
            Add User
          </button>
        </form>

        <div className="table-wrapper">
          <div className="table-header">
            <h2 className="table-title">All Users</h2>
            <span className="pill">
              Total: <strong>{users.length}</strong>
            </span>
          </div>

          {users.length === 0 ? (
            <p className="empty-state">
              No users yet. Add someone above to get started.
            </p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id ?? index}>
                    <td>{index + 1}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge">{user.gender}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
