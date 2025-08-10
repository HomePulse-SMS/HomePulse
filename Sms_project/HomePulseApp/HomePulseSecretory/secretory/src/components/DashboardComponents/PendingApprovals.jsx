// Modal component for displaying user details and actions
import {useEffect, useState} from "react";
import useFetchData from "./DataFetchPoint.jsx";
import Spinner from "../Spinner.jsx";
import data from "bootstrap/js/src/dom/data.js";

const UserDetailModal = ({ user, isOpen, onClose, onApprove, onReject, isSubmitting, submitError }) => {
    if (!isOpen || !user) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={modalHeaderStyle}>
                    <h2 className="h5">User Approval Details</h2>
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
                        {/* This section is hardcoded as requested. You can map over actual document data later. */}
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

                    {/* Action Buttons */}
                    {submitError && <div className="alert alert-danger p-2 mb-3">{submitError}</div>}
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => onReject(user.id)}
                            disabled={isSubmitting}
                        >
                            Reject
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => onApprove(user.id)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Approving...' : 'Approve User'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Component for Pending Approvals
const PendingApprovals = () => {
    const { data: apiResponse, loading, error: fetchError } = useFetchData('notApproved');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // console.log("In PendingApproval: "+data);
    // console.log("In pendingApprovals: "+apiResponse);
    // // console.log("Under SocietyId: "+users.societyId);
    // // console.log("Under SocietyId: "+users.societyId.sname);

    useEffect(() => {
        // The API response nests the user array inside a 'data' property
        if (apiResponse) {
            setUsers(apiResponse);
        }
    }, [apiResponse]);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        setSubmitError(null); // Clear previous errors when opening a new modal
    };

    const handleApproveUser = async (userId) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch(`http://localhost:8080/secretory/approve/${userId}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); // Catch if response is not json
                throw new Error(errorData.message || 'Failed to approve user.');
            }

            // On success, remove the user from the list and close the modal
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            setIsModalOpen(false);
            setSelectedUser(null);

        } catch (err) {
            setSubmitError(err.message);
            console.error("Approval failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRejectUser = (userId) => {
        // This is a placeholder. Implement the PATCH/DELETE request to the reject endpoint when available.
        console.log(`User ${userId} rejected (client-side only).`);
        // setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    if (loading) return <Spinner />;

    return (

        <div className="p-4">
            <h2 className="h4 font-semibold mb-3">Pending User Approvals</h2>
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
                                <td><span className="badge bg-warning text-dark">Pending Approval</span></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No pending approvals found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <UserDetailModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
                onApprove={handleApproveUser}
                onReject={handleRejectUser}
                isSubmitting={isSubmitting}
                submitError={submitError}
            />
        </div>
    );
};

// Styles (reused from your example)
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

export default PendingApprovals;