import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Questions from "../Component/Questions";
import "./Exam.css";
import Countdown from "react-countdown";

const { REACT_APP_CLIENT, REACT_APP_SERVER } = process.env;

function Exam() {
    const [listQuestions, setListQuestions] = useState({});
    const params = useParams();
    const location = useLocation();
    const myBtnRef = useRef();

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Question/GetAllQuestion?QuizId=${params.id}`,
        }).then((response) => {
            // console.log(response.data);
            setListQuestions(response.data);
        });
    }, [params.id]);

    useEffect(() => {
        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                myBtnRef.current.style.display = "block";
            } else {
                myBtnRef.current.style.display = "none";
            }
        };
    }, []);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            console.log("Hết giờ (demo)");
        }
        return (
            <h6 className="mb-3">
                {hours} : {minutes} : {seconds}
            </h6>
        );
    };

    if (Object.keys(listQuestions).length !== 0)
        return (
            <div className="row">
                <div className="col-10 p-0">
                    <div className="shadow ml-4 mr-2 px-4 border border-light mt-4 scroll">
                        {params.idTest === "1" ? (
                            <h3 className="text-center my-3">FULL TEST</h3>
                        ) : (
                            <h3 className="text-center my-3">MINI TEST</h3>
                        )}
                        <h3 className="text-center my-3">
                            {location.state.title ? location.state.title : window.location.replace(`/${params.idTest}`)}
                        </h3>
                        <div className="d-flex justify-content-center align-items-center my-4">
                            <audio controls autoPlay>
                                <source
                                    src={`${REACT_APP_CLIENT}/LuanVan_Demo/${listQuestions[0].audioFile}`}
                                    type="audio/mp3"
                                />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <h4 className="my-3">PART 1</h4>
                        <div className="row">
                            {listQuestions.slice(0, 6).map((question, index) => {
                                return <Questions Questions={question} index={index + 1} key={index} />;
                            })}
                        </div>
                        <h4 className="my-3">PART 2</h4>
                        <div className="row">
                            {listQuestions.slice(6, 31).map((question, index) => {
                                return <Questions Questions={question} index={index + 7} key={index} />;
                            })}
                        </div>
                        <h4 className="my-3">PART 3</h4>
                        <div className="row">
                            {listQuestions.slice(31, 70).map((question, index) => {
                                return <Questions Questions={question} index={index + 32} key={index} />;
                            })}
                        </div>
                        <h4 className="my-3">PART 4</h4>
                        <div className="row">
                            {listQuestions.slice(70, 100).map((question, index) => {
                                return <Questions Questions={question} index={index + 71} key={index} />;
                            })}
                        </div>
                        <h4 className="my-3">PART 5</h4>
                        <div className="row">
                            {listQuestions.slice(100, 130).map((question, index) => {
                                return <Questions Questions={question} index={index + 101} key={index} />;
                            })}
                        </div>
                        <h4 className="my-3">PART 6</h4>
                        <div className="row">
                            {listQuestions.slice(130, 146).map((question, index) => {
                                return question.contentScript === null ? (
                                    <Questions Questions={question} index={index + 131} key={index} />
                                ) : (
                                    <div key={index}>
                                        <div className="col-12 p-0">
                                            <p
                                                className="p-3"
                                                id="contentScipt"
                                                dangerouslySetInnerHTML={{
                                                    __html: `${
                                                        question.contentScript === null ? "" : question.contentScript
                                                    }`,
                                                }}
                                            ></p>
                                        </div>
                                        <Questions Questions={question} index={index + 131} key={index} />
                                    </div>
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 7</h4>
                        <div className="row">
                            {listQuestions.slice(146, 200).map((question, index) => {
                                return question.contentScript === null ? (
                                    <Questions Questions={question} index={index + 147} key={index} />
                                ) : (
                                    <div key={index}>
                                        <div className="col-12 p-0">
                                            <p
                                                className="p-3"
                                                id="contentScipt"
                                                dangerouslySetInnerHTML={{
                                                    __html: `${
                                                        question.contentScript === null ? "" : question.contentScript
                                                    }`,
                                                }}
                                            ></p>
                                        </div>
                                        <Questions Questions={question} index={index + 147} key={index} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="shadow mt-4 border-top-0 py-3 pl-3 border border-light scroll">
                        <h6 className="p-0">Thời gian còn lại:</h6>
                        <Countdown
                            date={
                                Object.keys(listQuestions).length === 200
                                    ? Date.now() + 120 * 1000 * 60
                                    : Date.now() + 60 * 1000 * 60
                            }
                            renderer={renderer}
                        />
                        <h6 className="mt-2">Part 1:</h6>
                        {listQuestions.slice(0, 6).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 2:</h6>
                        {listQuestions.slice(6, 31).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 7}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 3:</h6>
                        {listQuestions.slice(31, 70).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 32}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 4:</h6>
                        {listQuestions.slice(70, 100).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 71}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 5:</h6>
                        {listQuestions.slice(100, 130).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 101}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 6:</h6>
                        {listQuestions.slice(130, 146).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 131}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 7:</h6>
                        {listQuestions.slice(146, 200).map((element, index) => (
                            <button
                                key={`${index}Question`}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                // style={{ padding: "2px 10px", margin: "5px 5px" }}
                                style={{
                                    display: "inline-flex",
                                    height: 30,
                                    width: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 5,
                                }}
                            >
                                {index + 147}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    else return <h3 className="text-center mt-4">Đề đang cập nhật...</h3>;
}

export default Exam;
