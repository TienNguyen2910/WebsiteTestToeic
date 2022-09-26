function Register() {
    return (
        <>
            <div style={{ minHeight: "94vh" }} className="d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 p-5">
                            <div className="border border-3 border-success" />
                            <div className="card bg-white">
                                <div className="card-body p-5">
                                    <form className="mb-3 mt-md-4">
                                        <h2 className="fw-bold text-uppercase mb-2 text-center">Đăng ký</h2>
                                        <p className="text-black-50 text-center mb-5">
                                            Vui lòng nhập thông tin tài khoản của bạn!
                                        </p>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">
                                                Tên tài khoản:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                placeholder="Nguyen Van A"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label ">
                                                Email:
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
                                                Mật khẩu:
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
                                                Đăng ký
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
