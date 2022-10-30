import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const { REACT_APP_SERVER } = process.env;

function Admin() {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/User/GetAllUsers`,
        }).then((response) => {
            // console.log(response.data);
            setListUser(response.data);
        });
    }, []);
    return (
        <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Quản lý thành viên</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" width="100%" cellSpacing="0">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th>Họ Tên</th>
                                <th>Ngày tháng năm sinh</th>
                                <th>Email</th>
                                <th>Đề thi</th>
                                <th>Ngày thi</th>
                                <th>Điểm thi</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser.map((user, index) => (
                                <tr key={index}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.resultsList.length > 0
                                            ? user.resultsList.reduce((a, b) =>
                                                  a.startedAt > b.startedAt ? a.quiz.title : b.quiz.title
                                              )
                                            : null}
                                    </td>
                                    <td className="date timeago" title={user.resultsList.startedAt}>
                                        {new Intl.DateTimeFormat("vi", {
                                            month: "long",
                                            day: "2-digit",
                                            year: "numeric",
                                        }).format(
                                            new Date(
                                                user.resultsList.length > 0
                                                    ? user.resultsList.reduce((a, b) =>
                                                          a.startedAt > b.startedAt ? a.startedAt : b.startedAt
                                                      )
                                                    : null
                                            )
                                        )}
                                    </td>
                                    <td>
                                        {user.resultsList.length > 0
                                            ? user.resultsList.reduce((a, b) =>
                                                  a.startedAt > b.startedAt ? a.score : b.score
                                              )
                                            : ""}
                                    </td>
                                    <td>
                                        <Link className="text-danger" to="#">
                                            <i className="fa-solid fa-trash me-2"></i>Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;