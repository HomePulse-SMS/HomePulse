import { useEffect, useState } from "react";
import useFetchData from "./DataFetchPoint.jsx"; // Assuming this custom hook is in the same directory
import Spinner from "../Spinner.jsx"; // Assuming this spinner component exists

// Modal component for displaying approved user details
const ApprovedUserDetailModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={modalHeaderStyle}>
                    <h2 className="h5">Approved User Details</h2>
                    <button onClick={onClose} style={closeButtonStyle}>&times;</button>
                </div>
                <div className="p-4">
                    {/* User Details Section */}
                    <div className="mb-3">
                        <strong>Name:</strong> {user.fname} {user.lname}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="mb-3">
                        <strong>Contact:</strong> {user.contact}
                    </div>
                    <div className="mb-3">
                        <strong>Society:</strong> {user.societyId?.sname || 'N/A'}
                    </div>
                    <div className="mb-3">
                        <strong>Wing-Room:</strong> {user.wing}-{user.room_no}
                    </div>

                    {/* Document Section (Hardcoded) */}
                    <hr />
                    <div className="my-3">
                        <h3 className="h6">Uploaded Documents</h3>
                        {/* This section is hardcoded. You can adapt it to display actual document data. */}
                        <ul className="list-group">
                            <li className="list-group-item">
                                <a href="#" onClick={(e) => e.preventDefault()}>Agreement_Copy.pdf</a> (Hardcoded)
                            </li>
                            <li className="list-group-item">
                                <a href="#" onClick={(e) => e.preventDefault()}>Identity_Proof.pdf</a> (Hardcoded)
                            </li>
                        </ul>
                    </div>
                    <hr />

                    {/* Action Buttons - Removed for approved users */}
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Main Component for Approved Users
const ApprovedUsers = () => {
    // Fetches data from the 'approved' endpoint
    const { data: apiResponse, loading, error: fetchError } = useFetchData('approved');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // The API response might nest the user array inside a 'data' property
        if (apiResponse) {
            setUsers(apiResponse);
        }
    }, [apiResponse]);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            <h2 className="h4 font-semibold mb-3">Approved Users</h2>
            {fetchError && <div className="alert alert-danger">Could not fetch data: {fetchError}</div>}

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Society Name</th>
                        <th>Wing</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.societyId?.sname || 'N/A'}</td>
                                <td>{user.wing}</td>
                                <td><span className="badge bg-success">Approved</span></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No approved users found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <ApprovedUserDetailModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={handleCloseModal}
            />
        </div>
    );
};

// Styles (reused for consistency)
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '500px',
    overflow: 'hidden',
};

const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #dee2e6',
};

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    lineHeight: 1,
};

export default ApprovedUsers;
