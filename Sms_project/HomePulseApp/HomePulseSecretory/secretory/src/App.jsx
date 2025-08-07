import LoginScreen from "./components/LoginScreen.jsx";
import {useState} from "react";
import CompleteProfile from "./components/CompleteProfile.jsx";

const App = () => {
    const [page, setPage] = useState('login'); // Can be 'login' or 'completeProfile'

    const handleLoginSuccess = () => {
        setPage('completeProfile');
    };

    return (
        <>
            {/* This style tag dynamically imports Bootstrap CSS from a CDN. */}
            <style>
                {`@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');`}
            </style>

            {/* Conditional rendering based on the page state */}
            {page === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
            {page === 'completeProfile' && <CompleteProfile />}
        </>
    );
};

export default App
