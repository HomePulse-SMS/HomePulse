import LoginScreen from "./components/LoginScreen.jsx";
import {useEffect, useState} from "react";
import CompleteProfile from "./components/CompleteProfile.jsx";
import DashboardLayout from "./components/Dashboard.jsx";

const App = () => {
    const [page, setPage] = useState('login'); // Can be 'login' or 'completeProfile'
    const [user, setUser] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
        script.integrity = "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL";
        script.crossOrigin = "anonymous";
        script.async = true;

        document.body.appendChild(script);

        // Cleanup function to remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        }
    }, []);

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
            case 'dashboard':
                return user ? <DashboardLayout user={user} onLogout={handleLogout} /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />;
            case 'completeProfile':
                return user ? <CompleteProfile user={user} onProfileComplete={handleProfileComplete} /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />;
            case 'login':
            default:
                return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
        }
    }

    return (
        <>
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
                    @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');
                `}
            </style>
            {renderPage()}
        </>
    );
};

export default App
