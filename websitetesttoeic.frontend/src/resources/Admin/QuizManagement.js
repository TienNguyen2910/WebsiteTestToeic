import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const { REACT_APP_SERVER } = process.env;

function QuizManagement(props) {
    const [user, setUser] = useState([]);

    const refeshUser = (e) => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/User/GetUserById?Id=${Object.values(JSON.parse(props.getCookie("user")))[0]}`,
        }).then((response) => {
            setUser(response.data);
        });
    };
    useEffect(() => {
        refeshUser();
    }, []);

    const closeModal = () => {
        document.getElementById("addQuiz").click();
    };

    const submitQuiz = (e) => {
        let title = document.getElementById("title").value;
        let testid = document.getElementById("testid").value;
        if (title !== "") {
            e.preventDefault();
            axios({
                method: "post",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.getCookie("token")}`,
                },
                url: `${REACT_APP_SERVER}/Quiz/${title + ", " + testid + ", " + Object.values(JSON.parse(props.getCookie("user")))[0]}`,
            }).then((response) => {
                refeshUser();
                document.getElementById("addQuiz").click();
            });
        }
    };

    const deleteQuiz = (quiz) => {
        axios({
            method: "delete",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            url: `${REACT_APP_SERVER}/Quiz/DeleteQuiz?id=${quiz.id}`,
        }).then((response) => {
            console.log(response);
            console.log("Delete success!!");
            if (response.data) refeshUser();
            else alert("X??a th???t b???i!!");
        });
    };

    return (
        <div className="card shadow mb-4 mt-4">
            <div className="card-header">
                <h6 className="m-0 font-weight-bold text-primary d-inline">Qu???n l?? ????? thi</h6>
                <button className="btn btn-success float-end" data-mdb-toggle="modal" data-mdb-target="#addQuiz">
                    Th??m ????? thi
                </button>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" width="100%" cellSpacing="0">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th>Ti??u ?????</th>
                                <th>Lo???i test</th>
                                <th>S??? c??u h???i</th>
                                <th>Th???i l?????ng thi</th>
                                <th>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.quizzesList
                                ? user.quizzesList.map((quiz, index) => (
                                      <tr key={index}>
                                          <td scope="row">{index + 1}</td>
                                          <td>{quiz.title}</td>
                                          <td>{quiz.testId === 1 ? "Full Test" : "Mini Test"}</td>
                                          <td>{quiz.testId === 1 ? "200 c??u" : "65 c??u"}</td>
                                          <td>{quiz.testId === 1 ? "120 ph??t" : "40 ph??t"}</td>

                                          <td className="text-center">
                                              <Link className="text-warming" to={`/quizmanagement/addQA/${quiz.id}`}>
                                                  <i className="fa-solid fa-gear me-2"></i>
                                              </Link>
                                              <Link className="text-danger" to="#" onClick={() => deleteQuiz(quiz)}>
                                                  <i className="fa-solid fa-trash me-2"></i>
                                              </Link>
                                          </td>
                                      </tr>
                                  ))
                                : null}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="addQuiz" tabIndex="-1" aria-labelledby="addQuizLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Th??m ????? thi:</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                                &times;
                            </button>
                        </div>

                        <form>
                            <div className="modal-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td className="align-middle">Nh???p ti??u ????? ????? thi: </td>
                                            <td>
                                                <input type="text" name="title" className="w-100" id="title" required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">Ch???n lo???i ????? thi:</td>
                                            <td>
                                                <select className="form-select" aria-label="Default select example" id="testid">
                                                    <option value={1}>Full Test</option>
                                                    <option value={2}>Mini Test</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-success" onClick={submitQuiz}>
                                    Th??m
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizManagement;
