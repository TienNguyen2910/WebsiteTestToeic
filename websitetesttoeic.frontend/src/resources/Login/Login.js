import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "94vh" }}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 p-5">
                            <div className="border border-3 border-primary" />
                            <div className="card bg-white">
                                <div className="card-body p-5">
                                    <form className="mb-3 mt-md-4">
                                        <h2 className="fw-bold text-uppercase mb-3 text-center">Đăng nhập</h2>
                                        <p className="text-black-50 text-center mb-5">
                                            Vui lòng nhập email và mật khẩu để đăng nhập!
                                        </p>
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
                                            <button className="btn btn-primary" type="submit">
                                                Đăng nhập
                                            </button>
                                        </div>
                                    </form>
                                    <div>
                                        <p className="mb-0  text-center">
                                            Bạn chưa có tài khoản!{" "}
                                            <Link to="/register" className="text-primary fw-bold">
                                                Đăng ký
                                            </Link>
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
