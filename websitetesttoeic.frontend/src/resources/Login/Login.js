import axios from "axios";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const { REACT_APP_SERVER } = process.env;

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginSuccess = useRef();
    const loginFailed = useRef();
    // let navigate = useNavigate();

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
                    if (response.data !== "") {
                        sessionStorage.setItem("token", response.data);
                        var token = jwt_decode(response.data);
                        // console.log(token);
                        props.setCookie("user", JSON.stringify(token), 7);
                        props.setCookie("token", response.data, 7);
                        loginSuccess.current.hidden = false;
                        loginFailed.current.hidden = true;
                        window.location.replace("/");
                    } else {
                        console.log("login failed");
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
                                        <h2 className="fw-bold text-uppercase mb-3 text-center">????ng nh???p</h2>
                                        <p className="text-black-50 text-center mb-5">Vui l??ng nh???p email v?? m???t kh???u ????? ????ng nh???p!</p>
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
                                                M???t kh???u:
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
                                            ????ng nh???p th??nh c??ng!
                                        </div>
                                        <div className="alert alert-danger" role="alert" hidden ref={loginFailed}>
                                            ????ng nh???p th???t b???i, Vui L??ng th??? l???i!
                                        </div>
                                        <div className="d-inline-block w-100 text-end mt-3 mb-3">
                                            <button className="btn btn-primary" type="submit">
                                                ????ng nh???p
                                            </button>
                                        </div>
                                    </form>
                                    <div>
                                        <p className="mb-0  text-center">
                                            B???n ch??a c?? t??i kho???n!{" "}
                                            <Link to="/register" className="text-primary fw-bold">
                                                ????ng k??
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
