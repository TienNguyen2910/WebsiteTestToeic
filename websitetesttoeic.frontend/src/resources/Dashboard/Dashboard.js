import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const { REACT_APP_SERVER } = process.env;
function Dashboard() {
    const [listQuiz, setListQuiz] = useState([]);
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
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-8 shadow-5 my-4">
                <div className="row mb-3">{params.idTest === "1" ? <h5>Full Test</h5> : <h5>Mini Test</h5>}</div>
                {listQuiz.map((quiz, index) => (
                    <div className="row" key={index}>
                        <Link className="btn btn-light text-left mt-2 p-3" to={`./${quiz.id}`} state={quiz} key={index}>
                            {quiz.title}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="col-4 shadow-5 my-4">
                <h5>Bảng xếp hạng</h5>
            </div>
        </div>
    );
}

export default Dashboard;
