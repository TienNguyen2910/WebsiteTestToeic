import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import "../Component/Component.css";
const { REACT_APP_SERVER } = process.env;
const { REACT_APP_CLIENT } = process.env;
function Dashboard() {
    const [listQuiz, setListQuiz] = useState([]);
    const [listResult, setListResult] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Quiz?TestId=${params.idTest}`,
        }).then((response) => {
            // console.log(response.data);
            setListQuiz(response.data);
        });
    }, [params.idTest]);

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Result/GetAllResults`,
        }).then((response) => {
            setListResult(response.data);
        });
    }, []);
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-8 shadow-5 my-4">
                <div className="row mb-3">{params.idTest === "1" ? <h5>Full Test</h5> : <h5>Mini Test</h5>}</div>
                {listQuiz.map((quiz, index) => (
                    <div className="row" key={index}>
                        <Link className="btn btn-light text-left mt-2 p-3" to={`./${quiz.id}`} key={index}>
                            {quiz.title}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="col-4 shadow-5 my-4 rating">
                <h5>Bảng xếp hạng</h5>
                <section className="py-5">
                    <ul className="timeline-with-icons">
                        {listResult.map((result, index) => (
                            <li className="timeline-item mb-5" key={index}>
                                <span className={`timeline-icon text-white ${index === 0 ? "bg-danger" : ""}`}>{index + 1}</span>
                                <div className="item-left d-inline">
                                    <img
                                        src={`${REACT_APP_CLIENT}/default.jpg`}
                                        className="rounded-circle"
                                        height={35}
                                        alt="Portrait of a Woman"
                                        loading="lazy"
                                    />
                                    <h5 className="d-inline px-2 small">{result.user.userName}</h5>
                                </div>
                                <div className="item-right d-inline fw-bold">
                                    <span>{result.score}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
