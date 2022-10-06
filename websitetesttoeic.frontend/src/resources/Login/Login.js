import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const { REACT_APP_SERVER } = process.env;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginSuccess = useRef();
    const loginFailed = useRef();
    let navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            axios({
                method: "post",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                url: `${REACT_APP_SERVER}/User/Login?email=${email}&password=${password}`,
            })
                .then((response) => {
                    if (response.data != null) {
                        sessionStorage.setItem("token", response.data);
                        sessionStorage.setItem("email", email);
                        loginSuccess.current.hidden = false;
                        loginFailed.current.hidden = true;
                        navigate("/dashboard");
                    } else {
                        loginSuccess.current.hidden = true;
                        loginFailed.current.hidden = false;
                    }
                })
                .catch((err) => {
                    loginSuccess.current.hidden = true;
                    loginFailed.current.hidden = false;
                });
        }
        return false;
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "94vh" }}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 p-5">
                            <div className="border border-3 border-primary" />
                            <div className="card bg-white">
                                <div className="card-body p-5">
                                    <form className="mb-3 mt-md-4" onSubmit={submit}>
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
                                                required
                                                onChange={handleEmail}
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
                                                required
                                                onChange={handlePassword}
                                            />
                                        </div>
                                        <div className="alert alert-success" role="alert" hidden ref={loginSuccess}>
                                            Đăng nhập thành công!
                                        </div>
                                        <div className="alert alert-danger" role="alert" hidden ref={loginFailed}>
                                            Đăng nhập thất bại, Vui Lòng thử lại!
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
