import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwtToken"); // if JWT auth
    if (!token) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:9090/secretory/getAll",
{
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersData = res.data?.data || [];
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter((u) =>
      `${u.fname} ${u.lname} ${u.email} ${u.contact}`
        .toLowerCase()
        .includes(term)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center my-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
        <p className="mt-3 text-secondary">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-3 fw-bold">{error}</div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">All Users</h2>

      {/* Search Bar */}
      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 shadow-sm"
          placeholder="🔍 Search by name, email, or contact..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Approval</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              
              <th>Flat No</th>
              <th>Wing</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.approval ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}
                  </td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  
                  <td>{user.flat_no}</td>
                  <td>{user.wing}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
