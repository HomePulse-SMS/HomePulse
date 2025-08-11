import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AllVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:9090/secretory/getAllVisitor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const visitorsData = res.data?.data || [];
      setVisitors(visitorsData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch visitors.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format datetime string nicely
  const formatDateTime = (datetimeStr) => {
    if (!datetimeStr) return "-";
    const date = new Date(datetimeStr);
    return date.toLocaleString();  // You can customize format here
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center my-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
        <p className="mt-3 text-secondary">Loading visitors...</p>
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
      <h2 className="text-center mb-4 fw-bold">All Visitors</h2>

      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Type</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              {/* <th>Vehicle Number</th> */}
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.contactNumber}</td>
                  <td>{v.type}</td>
                 <td>{formatDateTime(v.entryTime)}</td>
                <td>{formatDateTime(v.exitTime)}</td>
                         

                  
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted py-4">
                  No visitors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVisitors;
