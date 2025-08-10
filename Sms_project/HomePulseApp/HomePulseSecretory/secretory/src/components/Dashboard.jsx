
import React, { useState } from "react";
// import axios from "axios";
import Notices from "./DashboardComponents/Notices.jsx";



// const Spinner = () => (
//     <div className="spinner-border spinner-border-sm" role="status">
//         <span className="visually-hidden">Loading...</span>
//     </div>
// );

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                    &#9776; Menu
                </button>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome, {user?.fname || 'User'}
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
    const menuItems = [
        { key: 'notices', label: 'Notices' },
        { key: 'approved', label: 'Not Approved Users' },
        { key: 'allUsers', label: 'All Users' },
        { key: 'allVisitors', label: 'All Visitors' },
        { key: 'notApproved', label: 'Approved Users' },
        // Add other menu items here based on your endpoints
    ];

    return (
        <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarLabel">Menu</h5>
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

// --- CONTENT PAGES FOR DASHBOARD ---

// Generic Fetch Hook for content pages
// const useFetchData = (endpoint) => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const token = localStorage.getItem('jwtToken');
//             console.log("In Dashboard Token: "+token);
//             if (!token) {
//                 setError("Authentication token not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 const response = await axios.get(`http://localhost:8080/secretory/${endpoint}`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 setData(response.data?.data || []);
//             } catch (err) {
//                 setError(`Failed to fetch data from ${endpoint}.`);
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData()
//     }, [endpoint]);
//
//     return { data, loading, error };
// };
//
// // Example Page: Notices
// const Notices = () => {
//     const { data: notices, loading, error } = useFetchData('user/notices');
//
//     if (loading) return <Spinner />;
//     if (error) return <div className="alert alert-danger">{error}</div>;
//
//     return (
//         <div>
//             <h2>Notices</h2>
//             <table className="table table-striped">
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Date</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {notices.map(notice => (
//                     <tr key={notice.id}>
//                         <td>{notice.id}</td>
//                         <td>{notice.title}</td>
//                         <td>{notice.content}</td>
//                         <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

    <Notices />

// Example Page: Not Approved Users
// const NotApprovedUsers = () => {
//     const { data: users, loading, error } = useFetchData('approved');
//
//     if (loading) return <Spinner />;
//     if (error) return <div className="alert alert-danger">{error}</div>;
//
//     return (
//         <div>
//             <h2>Not Approved Users</h2>
//             <table className="table table-striped">
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Contact</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {users.map(user => (
//                     <tr key={user.id}>
//                         <td>{user.id}</td>
//                         <td>{user.fname} {user.lname}</td>
//                         <td>{user.email}</td>
//                         <td>{user.contact}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// Placeholder for other pages
const PlaceholderContent = ({ title }) => <div><h2>{title}</h2><p>This page is under construction.</p></div>;

// Main Dashboard Layout
const DashboardLayout = ({ user, onLogout }) => {
    const [currentView, setCurrentView] = useState('notices'); // Default view

    const renderContent = () => {
        switch (currentView) {
            case 'notices': return <Notices />;
            case 'notApproved': return <NotApprovedUsers />;
            case 'allUsers': return <PlaceholderContent title="All Users" />;
            case 'allVisitors': return <PlaceholderContent title="All Visitors" />;
            case 'approved': return <PlaceholderContent title="Approved Users" />;
            default: return <Notices />;
        }
    };

    return (
        <div>
            <Sidebar onNavigate={setCurrentView} />
            <div className="main-content">
                <Navbar user={user} onLogout={onLogout} />
                <main className="container-fluid p-4">
                    {renderContent()}
                </main>
            </div>

const Dashboard = ({ user, onLogout }) => {
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '600px' }}>
                <div className="card shadow-sm p-4 text-center">
                    <div className="card-body">
                        <h1 className="card-title h3 mb-3">Dashboard</h1>
                        <p className="lead text-muted">Welcome, {user.fname || 'User'}!</p>
                        <button className="btn btn-danger mt-3" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default DashboardLayout;

export default Dashboard;

