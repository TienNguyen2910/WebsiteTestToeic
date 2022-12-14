import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { LineChart, Tooltip, YAxis, XAxis, CartesianGrid, Legend, ResponsiveContainer, Line } from "recharts";

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
    const [result, setResult] = useState({});

    const convertDataChart = (type) => {
        let data = [];
        if (result.length !== undefined) {
            if (type === 1) {
                result.slice(-12).map((element) => {
                    if (element.quiz.testId === 1) {
                        var date = new Date(element.startedAt);
                        data = [
                            ...data,
                            {
                                Date:
                                    date.toISOString().substring(0, 10) +
                                    " (" +
                                    date.getHours() +
                                    ":" +
                                    date.getMinutes() +
                                    ":" +
                                    date.getSeconds() +
                                    ")",
                                Full_Test: element.score,
                            },
                        ];
                    }
                });
            } else {
                result.slice(-12).map((element) => {
                    if (element.quiz.testId === 2) {
                        var date = new Date(element.startedAt);
                        data = [
                            ...data,
                            {
                                Date:
                                    date.toISOString().substring(0, 10) +
                                    " (" +
                                    date.getHours() +
                                    ":" +
                                    date.getMinutes() +
                                    ":" +
                                    date.getSeconds() +
                                    ")",
                                Mini_Test: element.score,
                            },
                        ];
                    }
                });
            }
            return data;
        }
    };

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
            setResult(response.data.resultsList);
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
                    setAlert("C???p nh???t th??ng tin th??nh c??ng!");
                    window.location.reload();
                })
                .catch((err) => {
                    setAlert("S??? c??? h??? th???ng. Vui l??ng th??? l???i!");
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
                        setAlert("C???p nh???t m???t kh???u th??nh c??ng!");
                    } else {
                        setAlert("M???t kh???u kh??ng ????ng. Vui l??ng th??? l???i!");
                    }
                })
                .catch((err) => {
                    setAlert("S??? c??? h??? th???ng. Vui l??ng th??? l???i!");
                });
            closeModal();
        }
        document.getElementById("passOld").value = "";
        document.getElementById("passNew").value = "";
        document.getElementById("passRe").value = "";
    };

    return (
        <div>
            <div className="container">
                <div className="mx-5 m-4 p-5 shadow bg-white">
                    <div className="text-center">
                        <h3>Th??ng tin t??i kho???n</h3>
                        <h5 className="small-text mt-3 text-danger d-block">{alert}</h5>
                    </div>
                    <p id="alert" style={{ display: "block", color: "red", textAlign: "center" }}></p>

                    <div className="mt-4" id="formData">
                        <div className="row justify-content-md-center">
                            <form className="col-7 ml-2">
                                <h6 className="my-3">
                                    <b>
                                        ??i???m cao nh???t ?????t ???????c: <span className="text-danger">{score}</span>
                                    </b>
                                </h6>
                                <div className="form-group">
                                    <label htmlFor="name">Vai tr??:</label>
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
                                    <label htmlFor="name">T??n t??i kho???n:</label>
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
                                    <input type="text" className="form-control" id="email" name="email" disabled value={user.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="videoID">Ng??y sinh:</label>
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
                                    <button type="button" className="btn btn-success" data-mdb-toggle="modal" data-mdb-target="#DMK">
                                        ?????i m???t kh???u
                                    </button>
                                    <button type="submit" className="btn btn-primary float-right ml-2" onClick={updateInfo}>
                                        L??u l???i
                                    </button>
                                    <button type="button" className="btn btn-danger cancel float-right" onClick={() => navigate(-1)}>
                                        Quay l???i
                                    </button>
                                </div>
                            </form>
                            <div style={{ width: "100%", height: 300 }} className="mt-5">
                                <ResponsiveContainer>
                                    <LineChart data={convertDataChart(1)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" stroke="#8884d8" activeDot={{ r: 8 }} dataKey="Full_Test" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div style={{ width: "100%", height: 300 }} className="my-4">
                                <ResponsiveContainer>
                                    <LineChart data={convertDataChart(2)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" stroke="#82ca9d" activeDot={{ r: 8 }} dataKey="Mini_Test" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <table className="table mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Lo???i ?????</th>
                                        <th scope="col">M?? ?????</th>
                                        <th scope="col">Ng??y thi</th>
                                        <th scope="col">??i???m</th>
                                        <th scope="col">C??ng c???</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(result).length !== 0 &&
                                        result.map((element, index) => {
                                            var date = new Date(element.startedAt);
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{element.quiz.testId === 1 ? "Full Test" : "Mini Test"}</td>
                                                    <td>{element.quiz.title}</td>
                                                    <td>
                                                        {date.toISOString().substring(0, 10) +
                                                            " (" +
                                                            date.getHours() +
                                                            ":" +
                                                            date.getMinutes() +
                                                            ":" +
                                                            date.getSeconds() +
                                                            ")"}
                                                    </td>
                                                    <td>{element.score}</td>
                                                    <td>
                                                        <Link to={`${"/" + element.quiz.testId + "/" + element.quizId + "/" + element.id}`}>
                                                            <i className="fa fa-list-alt text-warning fa-lg" aria-hidden="true"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="DMK" tabIndex="-1" aria-labelledby="DMKLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">?????i m???t kh???u:</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                                &times;
                            </button>
                        </div>

                        <form>
                            <div className="modal-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Nh???p m???t kh???u c?? (*):</td>
                                            <td>
                                                <input type="password" name="passOld" className="passOld" id="passOld" required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>M???t kh???u m???i (*):</td>
                                            <td>
                                                <input type="password" name="passNew" className="passNew" id="passNew" required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nh???p l???i M???t kh???u (*):</td>
                                            <td>
                                                <input
                                                    type="password"
                                                    name="passRe"
                                                    className="passRe"
                                                    id="passRe"
                                                    required
                                                    onKeyUp={() => checkRePass()}
                                                />
                                                <small id="alertPass" className="mt-2 text-danger" style={{ display: "none" }}>
                                                    M???t kh???u nh???p l???i ch??a h???p l??? !!!
                                                </small>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-success" onClick={DMK}>
                                    C???p nh???t
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
