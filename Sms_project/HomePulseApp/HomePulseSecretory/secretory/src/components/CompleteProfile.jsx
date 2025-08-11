import {useState} from "react";
import axios from "axios";
import Spinner from "./Spinner.jsx";

// const Spinner = () => (
//     <div className="spinner-border spinner-border-sm" role="status">
//         <span className="visually-hidden">Loading...</span>
//     </div>
// );

const CompleteProfile = ({ user, onProfileComplete  }) => {
    const [firstName, setFirstName] = useState("Sanjay");
    const [lastName, setLastName] = useState("Vaidya");
    const [contact, setContact] = useState("9746236382");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        const userId = user.id || user.sub;
        if (!userId) {
            setError("User ID is missing. Cannot update profile.");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('jwtToken');
        // console.log("Complete Profile token: "+ token);
        if (!token) {
            setError("Authentication error. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const API_URL = `http://localhost:9090/secretory/updateProfile/${userId}`;
            const payload = {
                fname: firstName,
                lname: lastName,
                contact: contact,
            };

            await axios.put(API_URL, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setSuccessMessage("Profile updated successfully! Redirecting...");

            // Wait 1.5 seconds before redirecting
            setTimeout(() => {
                onProfileComplete();
            }, 1500);


        } catch (err) {
            console.error("Profile update error:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '500px' }}>
                <div className="card shadow-sm p-4">
                    <div className="card-body">
                        <h1 className="card-title text-center h3 mb-4">Complete Your Profile</h1>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 mb-3">
                                <div className="col">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Contact</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="contact"
                                    placeholder="+1 (555) 123-4567"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? <Spinner /> : "Save Profile"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;