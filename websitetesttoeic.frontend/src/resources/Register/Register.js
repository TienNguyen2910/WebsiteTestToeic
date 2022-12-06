import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const { REACT_APP_SERVER } = process.env;

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const loginSuccess = useRef();
    const loginFailed = useRef();
    const refRePassword = useRef();
    const refEmail = useRef();
    const refAlertRePassword = useRef();
    const refAlertDuplicateEmail = useRef();
    let navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        axios({
            method: "post",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/User/checkDuplicateEmail?email=${e.target.value ? e.target.value : "default"}`,
        }).then((response) => {
            if (response.data) {
                refEmail.current.classList.add("border-danger");
                refAlertDuplicateEmail.current.hidden = false;
            } else {
                refEmail.current.classList.remove("border-danger");
                refAlertDuplicateEmail.current.hidden = true;
            }
        });
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleRePassword = (e) => {
        setRePassword(e.target.value);
        if (e.target.value !== password) {
            refRePassword.current.classList.add("border-danger");
        } else {
            refRePassword.current.classList.remove("border-danger");
        }
    };
    const handleDateOfBirth = (e) => {
        setDateOfBirth(e.target.value);
    };

    // Submit
    const submitRegister = (e) => {
        if (password !== rePassword) {
            refAlertRePassword.current.hidden = false;
        }
        e.preventDefault();
        if (username !== "" && email !== "" && password !== "" && password === rePassword && refAlertDuplicateEmail.current.hidden === true) {
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
                                        <p className="text-black-50 text-center mb-5">Vui lòng nhập thông tin tài khoản của bạn!</p>
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
                                                Ngày sinh:
                                            </label>
                                            <input type="date" className="form-control" id="dateOfBirth" onChange={handleDateOfBirth} required />
                                        </div>
                                        <div>
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
                                                ref={refEmail}
                                            />
                                        </div>
                                        <div className="text-danger small mt-2" hidden ref={refAlertDuplicateEmail}>
                                            Email đã tồn tại. Vui lòng thử lại
                                        </div>
                                        <div className="my-3">
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
                                        <div className="mb-3">
                                            <label htmlFor="rePassword" className="form-label">
                                                Nhập lại mật khẩu:
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="rePassword"
                                                placeholder="*******"
                                                onChange={handleRePassword}
                                                required
                                                ref={refRePassword}
                                            />
                                            <div className="text-danger small mt-2" hidden ref={refAlertRePassword}>
                                                Mật khẩu nhập lại chưa trùng. Vui lòng thử lại!!!
                                            </div>
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
