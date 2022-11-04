import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const { REACT_APP_SERVER } = process.env;

function Infor(props) {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [user, setUser] = useState({
        Id: Object.values(JSON.parse(props.getCookie("user")))[0],
        username: Object.values(JSON.parse(props.getCookie("user")))[2],
        email: Object.values(JSON.parse(props.getCookie("user")))[1],
        password: null,
        dateOfBirth: Object.values(JSON.parse(props.getCookie("user")))[3],
    });
    const [alert, setAlert] = useState();

    const handleUserName = (e) => {
        setUser({
            ...user,
            username: e.target.value,
        });
    };

    const handleDateOfBirth = (e) => {
        setUser({
            ...user,
            dateOfBirth: e.target.value,
        });
    };

    const closeModal = () => {
        document.getElementById("DMK").click();
    };

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/User/GetUserById?Id=${user.Id}`,
        }).then((response) => {
            setScore(Math.max(...response.data.resultsList.map((o) => o.score)));
            setUser({
                ...user,
                password: response.data.password,
            });
        });
    }, []);

    const updateInfo = (e) => {
        if (user.username !== "" && user.dateOfBirth !== "") {
            e.preventDefault();
            axios({
                method: "put",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    id: user.Id,
                    dateOfBirth: user.dateOfBirth,
                    username: user.username,
                },
                url: `${REACT_APP_SERVER}/User/UpdateUser`,
            })
                .then((response) => {
                    var newInfo = JSON.parse(props.getCookie("user"));
                    newInfo[Object.keys(newInfo)[2]] = response.data.userName;
                    newInfo[Object.keys(newInfo)[3]] = response.data.dateOfBirth;
                    props.setCookie("user", JSON.stringify(newInfo), 5);
                    setAlert("Cập nhật thông tin thành công!");
                    window.location.reload();
                })
                .catch((err) => {
                    setAlert("Sự cố hệ thống. Vui lòng thử lại!");
                });
        }
    };

    const checkRePass = () => {
        var passNew = document.getElementById("passNew").value;
        var passRe = document.getElementById("passRe").value;
        if (passNew !== passRe) {
            document.getElementById("alertPass").style.display = "block";
        } else {
            document.getElementById("alertPass").style.display = "none";
        }
    };

    const DMK = (e) => {
        var passOld = document.getElementById("passOld").value;
        var passNew = document.getElementById("passNew").value;
        var passRe = document.getElementById("passRe").value;
        if (passOld !== "" && passNew !== "" && passRe !== "") {
            e.preventDefault();
            axios({
                method: "post",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                url: `${REACT_APP_SERVER}/User/ResetPassword?id=${user.Id}&oldPass=${passOld}&newPass=${passNew}`,
            })
                .then((response) => {
                    if (response.data) {
                        setAlert("Cập nhật mật khẩu thành công!");
                    } else {
                        setAlert("Mật khẩu không đúng. Vui lòng thử lại!");
                    }
                })
                .catch((err) => {
                    setAlert("Sự cố hệ thống. Vui lòng thử lại!");
                });
            closeModal();
        }
        document.getElementById("passOld").value = "";
        document.getElementById("passNew").value = "";
        document.getElementById("passRe").value = "";
    };

    return (
        <div>
            <form className="container p">
                <div className="mx-5 my-4 ml-4 mr-4 p-5 shadow bg-white">
                    <div className="text-center">
                        <h3>Thông tin tài khoản</h3>
                        <h5 className="small-text mt-3 text-danger d-block">{alert}</h5>
                    </div>
                    <p id="alert" style={{ display: "block", color: "red", textAlign: "center" }}></p>

                    <div className="mt-4" id="formData" style={{ height: "72vh" }}>
                        <div className="row justify-content-md-center">
                            <div className="col-7 ml-2">
                                <h6 className="my-3">
                                    <b>
                                        Điểm cao nhất đạt được: <span className="text-danger">{score}</span>
                                    </b>
                                </h6>
                                <div className="form-group">
                                    <label htmlFor="name">Vai trò:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="role"
                                        name="role"
                                        value={Object.values(JSON.parse(props.getCookie("user")))[4]}
                                        disabled={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Tên tài khoản:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={user.username}
                                        onChange={handleUserName}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="videoID">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        disabled
                                        value={user.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="videoID">Ngày sinh:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={user.dateOfBirth.split("/").reverse().join("/").replaceAll("/", "-")}
                                        onChange={handleDateOfBirth}
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        data-mdb-toggle="modal"
                                        data-mdb-target="#DMK"
                                    >
                                        Đổi mật khẩu
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary float-right ml-2"
                                        onClick={updateInfo}
                                    >
                                        Lưu lại
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger cancel float-right"
                                        onClick={() => navigate(-1)}
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="modal fade" id="DMK" tabIndex="-1" aria-labelledby="DMKLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Đổi mật khẩu:</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                                &times;
                            </button>
                        </div>

                        <form>
                            <div className="modal-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Nhập mật khẩu cũ (*):</td>
                                            <td>
                                                <input
                                                    type="password"
                                                    name="passOld"
                                                    className="passOld"
                                                    id="passOld"
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mật khẩu mới (*):</td>
                                            <td>
                                                <input
                                                    type="password"
                                                    name="passNew"
                                                    className="passNew"
                                                    id="passNew"
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nhập lại Mật khẩu (*):</td>
                                            <td>
                                                <input
                                                    type="password"
                                                    name="passRe"
                                                    className="passRe"
                                                    id="passRe"
                                                    required
                                                    onKeyUp={() => checkRePass()}
                                                />
                                                <small
                                                    id="alertPass"
                                                    className="mt-2 text-danger"
                                                    style={{ display: "none" }}
                                                >
                                                    Mật khẩu nhập lại chưa hợp lệ !!!
                                                </small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-success" onClick={DMK}>
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Infor;