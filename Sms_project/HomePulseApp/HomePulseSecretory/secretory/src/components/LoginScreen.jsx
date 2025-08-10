import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner.jsx";

// A simple spinner component for loading states, styled with Bootstrap classes.

// const decodeJwtManually = (token) => {
//     try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
//
//         return JSON.parse(jsonPayload);
//     } catch (e) {
//         console.error("Failed to decode JWT:", e);
//         return null;
//     }
// };

// The Login Screen component
const LoginScreen = ({ onLoginSuccess }) => {
    // State for form inputs, loading status, and error messages
    const [email, setEmail] = useState("sanjay.vaidya3@secretory");
    const [password, setPassword] = useState("sanjay1234");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            const API_URL = "http://localhost:9090/authenticate";
            const response = await axios.post(API_URL, { email, password });

            const token = response.data?.data?.jwttoken;
            const user = response.data?.data?.user

            if (token) {
                // console.log("Login successful, token:", token);
                localStorage.setItem('jwtToken', token);
                // const decodedToken = decodeJwtManually(token);
                // console.log("Decoded JWT Payload:", decodedToken);
                // const userId = decodedToken ? (decodedToken.id || decodedToken.sub) : null;

                // if (userId) {
                //     onLoginSuccess(userId);
                // } else {
                //     setError("Could not retrieve user ID from token. Check the console for the decoded payload.");
                // }
                onLoginSuccess(user);
            } else {
                setError("Login failed: Invalid response from server.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Login Failed: Email or Password is incorrect.");
        } finally {
            setLoading(false);
        }
    };

    // Clears the input fields and any error messages
    const handleCancel = () => {
        if (loading) return;
        setEmail("");
        setPassword("");
        setError("");
    };

    // Placeholder for forgot password functionality
    const handleForgotPassword = () => {
        if (loading) return;
        setError("");
        alert("Password recovery instructions have been sent to your email.");
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="card shadow-sm p-4">
                    <div className="card-body text-center">
                        <h1 className="card-title h3 mb-1 fw-normal">Welcome!</h1>
                        <p className="text-muted mb-4">Sign in to continue</p>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    autoComplete="email"
                                />
                                <label htmlFor="floatingInput">Enter Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    autoComplete="current-password"
                                />
                                <label htmlFor="floatingPassword">Enter Password</label>
                            </div>
                            <div className="text-end mb-3">
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="btn btn-link text-decoration-none"
                                    disabled={loading}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg px-4 gap-3"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner /> : "Sign In"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn btn-outline-secondary btn-lg px-4"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;