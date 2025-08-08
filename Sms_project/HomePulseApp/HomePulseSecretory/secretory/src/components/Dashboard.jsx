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

export default Dashboard;