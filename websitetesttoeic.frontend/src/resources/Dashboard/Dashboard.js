<<<<<<< HEAD
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const { REACT_APP_SERVER } = process.env;
function Dashboard() {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Quiz`,
        }).then((response) => {
            console.log(response.data);
            setListQuiz(response.data);
        });
    }, [])
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-8 shadow-5 my-4">
                <div className="row mb-3">
                    <h5>Full Test</h5>
                </div>
                {listQuiz.map((quiz, index) => (
                    <div className="row">
                        <Link className="btn btn-light text-left" to="#" key={index}>{quiz.Title}</Link>
                    </div>
                ))}

                <div className="row">
                    <button className="btn btn-light text-left">Test 2</button>
                </div>
            </div>
            <div className="col-4 shadow-5 my-4">
                <h5>Bảng xếp hạng</h5>
=======
function Dashboard() {
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-8 shadow-5 my-4">
                <h1>Lịch sử thi</h1>
            </div>
            <div className="col-4 shadow-5 my-4">
                <h1>Xếp hạng</h1>
>>>>>>> master
            </div>
        </div>
    );
}

export default Dashboard;
