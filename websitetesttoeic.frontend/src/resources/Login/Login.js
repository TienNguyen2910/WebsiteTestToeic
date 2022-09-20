function Login() {
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="border border-3 border-primary" />
                            <div className="card bg-white">
                                <div className="card-body p-5">
                                    <form className="mb-3 mt-md-4">
                                        <h2 className="fw-bold text-uppercase mb-2 text-center">LOGIN</h2>
                                        <p className="text-black-50 text-center mb-5">
                                            Please enter your email and password!
                                        </p>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label ">
                                                Email address:
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label ">
                                                Password:
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="*******"
                                            />
                                        </div>
                                        <div className="d-inline-block w-100 text-end mt-3 mb-3">
                                            <button className="btn btn-success" type="submit">
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                    <div>
                                        <p className="mb-0  text-center">
                                            Don't have an account?{" "}
                                            <a href="signup.html" className="text-primary fw-bold">
                                                Sign Up
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
