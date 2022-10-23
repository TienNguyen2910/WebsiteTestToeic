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
                    <table className="table table-bordered" width="100%" cellspacing="0">
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
                            <tr>
                                <td scope="row">1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Link className="text-danger" to="#">
                                        <i class="fa-solid fa-trash me-2"></i>Delete
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;
