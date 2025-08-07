import App from "../App.jsx";

const CompleteProfile = () => {
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '500px' }}>
                <div className="card shadow-sm p-4">
                    <div className="card-body">
                        <h1 className="card-title text-center h3 mb-4">Complete Your Profile</h1>
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="John" />
                                </div>
                                <div className="col">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Contact</label>
                                <input type="tel" className="form-control" id="contact" placeholder="+1 (555) 123-4567" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Save Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile