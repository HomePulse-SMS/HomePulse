import LoginScreen from "./components/LoginScreen.jsx";
import {useState} from "react";
import CompleteProfile from "./components/CompleteProfile.jsx";
import Dashboard from "./components/Dashboard.jsx";

const App = () => {
    const [page, setPage] = useState('login'); // Can be 'login' or 'completeProfile'
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (loggedInUser) => {

        if (!loggedInUser) {
            // Optionally, you could set an error state here to show on the login page
            console.error("Login succeeded but user data was not provided.");
            return;
        }
        setUser(loggedInUser);
        // Check if the user's profile is complete
        const isProfileComplete = loggedInUser.fname && loggedInUser.lname && loggedInUser.contact;
        // Navigate based on profile status
        setPage(isProfileComplete ? 'dashboard' : 'completeProfile');
    };

    const handleProfileComplete = () => {
        setPage('dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        setPage('login');
    }

    const renderPage = () => {
        switch(page) {
            case 'completeProfile':
                return <CompleteProfile user={user} onProfileComplete={handleProfileComplete} />;
            case 'dashboard':
                return <Dashboard user={user} onLogout={handleLogout} />;
            case 'login':
            default:
                return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
        }
    }

    return (
        <>
            {/* This style tag dynamically imports Bootstrap CSS from a CDN. */}
            <style>
                {`@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');`}
            </style>

            {renderPage()}
        </>
    );
};

export default App
