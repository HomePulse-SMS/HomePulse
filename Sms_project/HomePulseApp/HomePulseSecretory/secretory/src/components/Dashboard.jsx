import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Notices from "./DashboardComponents/Notices.jsx";
import AllUsers from "./DashboardComponents/AllUsers.jsx";  
import AllVisitors from "./DashboardComponents/AllVisitors.jsx";  


import PendingApprovals from "./DashboardComponents/PendingApprovals.jsx";
import ApprovedUsers from "./DashboardComponents/Approved.jsx"; // Ensure Bootstrap JS is imported

// Top Navigation Bar
const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                    &#9776; Menu
                </button>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome, {user?.fname || 'Secretary'}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Side Navigation Menu
const Sidebar = ({ onNavigate }) => {
    // Corrected the keys to logically match their labels
    const menuItems = [
        { key: 'notices', label: 'Notices' },
        { key: 'notApproved', label: 'Not Approved Users' },
        { key: 'approved', label: 'Approved Users' },
        { key: 'allUsers', label: 'All Users' },
        { key: 'allVisitors', label: 'All Visitors' },
    ];

    return (
        <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarLabel">Dashboard Menu</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="nav flex-column">
                    {menuItems.map(item => (
                        <li className="nav-item" key={item.key}>
                            <button className="nav-link text-white" onClick={() => onNavigate(item.key)} data-bs-dismiss="offcanvas">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Placeholder for other pages that are not yet built
const PlaceholderContent = ({ title }) => (
    <div>
        <h2 className="h4 font-semibold mb-3">{title}</h2>
        <p>This page is under construction. 🚧</p>
    </div>
);

// Main Dashboard Layout
const DashboardLayout = ({ user, onLogout }) => {
    const [currentView, setCurrentView] = useState('notices'); // Default view is 'notices'

    // This function determines which component to render based on the state
    const renderContent = () => {
        switch (currentView) {
            case 'notices':
                return <Notices />;
            case 'notApproved':
                return <PendingApprovals />;
             case 'allUsers': return <AllUsers />;    

           case 'allVisitors':
            return <AllVisitors />;
            case 'approved':
                return <ApprovedUsers title="Approved Users" />;
            default:
                return <Notices />;
        }
    };

    return (
        <div>
            <Sidebar onNavigate={setCurrentView} />
            {/* The main content area that pushes over when the sidebar is open */}
            <div className="main-content">
                <Navbar user={user} onLogout={onLogout} />
                <main className="container-fluid p-4">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;