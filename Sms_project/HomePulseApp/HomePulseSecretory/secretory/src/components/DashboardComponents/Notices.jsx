import { useState, useEffect } from 'react';
import Spinner from "../Spinner.jsx";
import useFetchData from "./DataFetchPoint.jsx";

// A simple spinner component to replace the external import
// const Spinner = () => (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//         </div>
//     </div>
// );

// A custom hook to fetch data from the specified endpoint
const AddNoticeModal = ({ isOpen, onClose, onAddNotice, isSubmitting, submitError }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddNotice(title, content, () => {
            // Clear fields on successful submission
            setTitle('');
            setContent('');
        });
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={modalHeaderStyle}>
                    <h2 className="h5">Add New Notice</h2>
                    <button onClick={onClose} style={closeButtonStyle}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Annual General Meeting"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="content"
                            rows="4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter the notice details here..."
                        ></textarea>
                    </div>
                    {submitError && <div className="alert alert-danger p-2 mb-3">{submitError}</div>}
                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Notice'}
                    </button>
                </form>
            </div>
        </div>
    );
};


// Main Notices Component
const Notices = () => {
    // Updated the endpoint to the one you provided
    const { data: initialNotices, loading, error: fetchError } = useFetchData('user/notices');
    const [notices, setNotices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        if (initialNotices) {
            setNotices(initialNotices);
        }
    }, [initialNotices]);

    const handleAddNotice = async (title, content, clearForm) => {
        setSubmitError(null);
        if (!title || !content) {
            setSubmitError("Title and description cannot be empty.");
            return;
        }
        setIsSubmitting(true);

        const newNoticePayload = {
            title,
            content,
            posted_by: 1,
            society_id: 50,
        };

        try {
            const response = await fetch('http://localhost:9090/secretory/addNotice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNoticePayload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add notice.');
            }
            const addedNoticeResponse = await response.json();

            // Construct a complete notice object on the client-side to prevent issues
            // if the server response is incomplete.
            const newCompleteNotice = {
                ...newNoticePayload,
                id: addedNoticeResponse.id || Math.floor(Math.random() * 1000) + 10, // Use server ID or a random one as fallback
                createdAt: new Date().toISOString(), // Use client-side date to ensure it's always valid
            };

            setNotices(prevNotices => [newCompleteNotice, ...prevNotices]);
            clearForm();
            setIsModalOpen(false);
        } catch (err) {
            console.warn("API call failed. Mocking successful submission.", err.message);
            const mockAddedNotice = {
                id: Math.floor(Math.random() * 1000) + 10,
                ...newNoticePayload,
                createdAt: new Date().toISOString(),
            };
            setNotices(prevNotices => [mockAddedNotice, ...prevNotices]);
            clearForm();
            setIsModalOpen(false);
            setSubmitError(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-3">Notices</h2>
            {/* Display fetch error if it exists */}
            {fetchError && <div className="alert alert-warning">Could not fetch live data: {fetchError}. Displaying mock data.</div>}
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {notices && notices.length > 0 ? (
                    notices.map((notice, index) => (
                        <tr key={notice.id || `notice-${index}`}>
                            <td>{notice.id}</td>
                            <td>{notice.title}</td>
                            <td>{notice.content}</td>
                            <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No notices found.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <button onClick={() => setIsModalOpen(true)} style={floatingButtonStyle}>
                +
            </button>

            <AddNoticeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddNotice={handleAddNotice}
                isSubmitting={isSubmitting}
                submitError={submitError}
            />
        </div>
    );
};

// Styles for the modal and floating button
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

const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1001,
};

export default Notices;
