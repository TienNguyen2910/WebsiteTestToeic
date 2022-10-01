import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const { REACT_APP_SERVER } = process.env;

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const loginSuccess = useRef();
    const loginFailed = useRef();
    let navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleDateOfBirth = (e) => {
        setDateOfBirth(e.target.value);
    };

    // Submit
    const submitRegister = (e) => {
        e.preventDefault();
        if (username !== "" && email !== "" && password !== "") {
            axios({
                method: "post",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    username: username,
                    email: email,
                    password: password,
                    dateOfBirth: dateOfBirth,
                    roleId: 1,
                    role: {
                        id: 1,
                        roleName: "Client",
                    },
                },
                url: `${REACT_APP_SERVER}/User/Register`,
            })
                .then((response) => {
                    if (response.data != null) {
                        loginSuccess.current.hidden = false;
                        loginFailed.current.hidden = true;
                        navigate("/login");
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
            <div style={{ minHeight: "94vh" }} className="d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 p-5">
                            <div className="border border-3 border-success" />
                            <div className="card bg-white">
                                <div className="card-body p-5">
                                    <form className="mb-3 mt-md-4" onSubmit={submitRegister}>
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
                                                onChange={handleUsername}
                                                required
                                            />
                                        </div>
                                        <div className="datepicker mb-3">
                                            <label htmlFor="dateOfBirth" className="form-label">
                                                Date of Birth:
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="dateOfBirth"
                                                onChange={handleDateOfBirth}
                                                required
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
                                                onChange={handleEmail}
                                                required
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
                                                onChange={handlePassword}
                                                required
                                            />
                                        </div>
                                        <div className="alert alert-success" role="alert" hidden ref={loginSuccess}>
                                            Đăng ký tài khoản thành công!
                                        </div>
                                        <div className="alert alert-danger" role="alert" hidden ref={loginFailed}>
                                            Đăng ký tài khoản thất bại, Vui Lòng thử lại!
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
