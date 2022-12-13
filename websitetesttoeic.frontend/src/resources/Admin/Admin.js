import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const { REACT_APP_SERVER } = process.env;

function Admin() {
    const [listUser, setListUser] = useState([]);
    const listDataUser = () => {
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
    };

    useEffect(() => {
        listDataUser();
    }, []);

    const DeleteUser = (id) => {
        axios({
            method: "delete",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/User/DeleteUser?Id=${id}`,
        }).then((response) => {
            response.data === true ? listDataUser() : alert("Bạn xóa không thành công !!!");
        });
    };
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
                            {listUser.map((user, index) => {
                                let maxScore =
                                    user.resultsList.length > 0
                                        ? user.resultsList.reduce((a, b) => (a.startedAt > b.startedAt ? a : b))
                                        : null;
                                return (
                                    <tr key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.dateOfBirth}</td>
                                        <td>{user.email}</td>
                                        <td>{maxScore !== null ? maxScore.quiz.title : null}</td>
                                        <td className="date timeago" title={user.resultsList.startedAt}>
                                            {maxScore !== null
                                                ? new Intl.DateTimeFormat("vi", {
                                                      month: "long",
                                                      day: "2-digit",
                                                      year: "numeric",
                                                  }).format(new Date(maxScore.startedAt))
                                                : null}
                                        </td>

                                        <td>
                                            {user.resultsList.length > 1
                                                ? user.resultsList.reduce((a, b) =>
                                                      a.startedAt > b.startedAt ? a.score : b.score
                                                  )
                                                : user.resultsList.length > 0 ? user.resultsList[0].score : null}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => DeleteUser(user.id)}>
                                                <i className="fa-solid fa-trash me-2"></i>Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;
