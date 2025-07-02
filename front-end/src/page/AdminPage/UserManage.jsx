import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify } from "../../components/Toastify";
import "./AdminPage.scss"; // Import AdminPage.scss for styling

function UserManage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get(apiPaths.userList);
      setUsers(response.data);
    } catch (error) {
      ErrorToastify("Error fetching users: " + error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="crudContainer"> {/* Apply shared CRUD container styles */}
      <h2>Users</h2>
      <table className="crud-table"> {/* Apply shared CRUD table styles */}
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
            <th>Authority</th>
            <th>Activation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.gender === 0 ? "Male" : "Female"}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.authority === "1" ? "Admin" : "User"}</td>
              <td>{user.activation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManage;
