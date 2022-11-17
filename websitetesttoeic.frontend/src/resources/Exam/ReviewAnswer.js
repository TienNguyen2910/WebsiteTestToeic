import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Questions from "../Component/Questions";
import "./Exam.css";

const { REACT_APP_CLIENT, REACT_APP_SERVER } = process.env;

function ReviewAnswer(props) {
    const [quiz, setQuiz] = useState({});
    const [listQuestions, setListQuestions] = useState([]);
    const [listResultDetail, setListResultDetail] = useState([]);
    const [result, setResult] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const scrollToHash = (id) => {
        if (id) {
            const anchor = document.getElementById(id);

            if (anchor) {
                anchor.scrollIntoView();
            }
        }
    };
    var numQuestions = 1;
    var numQuestionChoice = 1;

    const setAnswer = (idAnswer, idQuestion, isAnswer, Part) => {
        document.getElementById(idQuestion + "Question").classList.add("active");
    };

    useEffect(() => {
        listResultDetail.map((resultDetail, index) => {
            if (document.getElementById(`${resultDetail.answerSelectedId}AnswerLabel`) !== null) {
                var label = document.getElementById(`${resultDetail.answerSelectedId}AnswerLabel`);
                if (label.style.color !== "white") {
                    label.style.backgroundColor = "#ff5252";
                    label.style.color = "white";
                }
                document.getElementById(`${resultDetail.answerSelectedId}Answer`).click();
            }
        });
        for (var i = 1; i <= document.getElementsByClassName("custom-control custom-radio").length; i++) {
            document.getElementById(`${i}Answer`).disabled = true;
        }
    });

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            url: `${REACT_APP_SERVER}/Result/GetResult/${params.resultId}`,
        })
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                navigate("/");
            });
    }, []);

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            url: `${REACT_APP_SERVER}/ResultDetail/GetResultDetail/${params.resultId}`,
        })
            .then((response) => {
                setListResultDetail(response.data);
            })
            .catch((error) => {
                navigate("/");
            });
    }, [params.id]);

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Quiz/${params.idTest}`,
        }).then((response) => {
            setQuiz(response.data);
            setListQuestions(response.data.questionsList);
        });
    }, [params.idTest]);

    if (Object.keys(listQuestions).length !== 0)
        return (
            <div className="row">
                <div className="col-10 p-0">
                    <div className="shadow ml-4 mr-2 px-4 border border-light my-4 scroll bg-white">
                        <h3 className="text-center my-3">{quiz.title}</h3>
                        <h3 className="text-center my-3">{quiz.test.typeTest}</h3>
                        <div className="d-flex justify-content-center align-items-center my-4">
                            <audio controls>
                                <source src={`${REACT_APP_SERVER}/${listQuestions[0].audioFile}`} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        <h4 className="my-3">PART 1</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 1)
                                    return (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 1}
                                        />
                                    );
                            })}
                        </div>
                        <h4 className="my-3">PART 2</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 2)
                                    return (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 7}
                                        />
                                    );
                            })}
                        </div>
                        <h4 className="my-3">PART 3</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 3)
                                    return (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 32}
                                        />
                                    );
                            })}
                        </div>
                        <h4 className="my-3">PART 4</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 4)
                                    return (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 71}
                                        />
                                    );
                            })}
                        </div>
                        <h4 className="my-3">PART 5</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 5)
                                    return (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 101}
                                        />
                                    );
                            })}
                        </div>
                        <h4 className="my-3">PART 6</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 6)
                                    return question.contentScript === null ? (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 131}
                                        />
                                    ) : (
                                        <>
                                            <div className="col-12" key={index}>
                                                <p
                                                    className="p-3 my-3"
                                                    id="contentScipt"
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${question.contentScript === null ? "" : question.contentScript}`,
                                                    }}
                                                ></p>
                                            </div>
                                            <Questions
                                                reviewAnswer={true}
                                                setAnswer={setAnswer}
                                                Questions={question}
                                                index={numQuestions++}
                                                key={index + 131}
                                            />
                                        </>
                                    );
                            })}
                        </div>
                        <h4 className="my-3">PART 7</h4>
                        <div className="row">
                            {listQuestions.map((question, index) => {
                                if (question.numPart === 7)
                                    return question.contentScript === null ? (
                                        <Questions
                                            reviewAnswer={true}
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={numQuestions++}
                                            key={index + 147}
                                        />
                                    ) : (
                                        <>
                                            <div className="col-12" key={index}>
                                                <p
                                                    className="p-3 my-3"
                                                    id="contentScipt"
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${question.contentScript === null ? "" : question.contentScript}`,
                                                    }}
                                                ></p>
                                            </div>
                                            <Questions
                                                reviewAnswer={true}
                                                setAnswer={setAnswer}
                                                Questions={question}
                                                index={numQuestions++}
                                                key={index + 147}
                                            />
                                        </>
                                    );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="shadow mt-4 border-top-0 py-3 pl-3 border border-light scroll bg-white">
                        <p className="fw-bold">
                            Điểm của bạn: <span className="text-danger">{result.score}</span>
                        </p>
                        <h6 className="mt-2">Part 1:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 1)
                                return (
                                    <button
                                        id={element.id + "Question"}
                                        key={`${index}Question`}
                                        type="button"
                                        className="btn btn-outline-dark btn-sm"
                                        style={{
                                            display: "inline-flex",
                                            height: 30,
                                            width: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: 5,
                                        }}
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <h6 className="mt-2">Part 2:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 2)
                                return (
                                    <button
                                        id={element.id + "Question"}
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
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <h6 className="mt-2">Part 3:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 3)
                                return (
                                    <button
                                        id={element.id + "Question"}
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
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <h6 className="mt-2">Part 4:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 4)
                                return (
                                    <button
                                        id={element.id + "Question"}
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
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <h6 className="mt-2">Part 5:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 5)
                                return (
                                    <button
                                        id={element.id + "Question"}
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
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <h6 className="mt-2">Part 6:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 6)
                                return (
                                    <button
                                        id={element.id + "Question"}
                                        key={`${index}Question`}
                                        type="button"
                                        className="btn btn-outline-dark btn-sm"
                                        style={{
                                            display: "inline-flex",
                                            height: 30,
                                            width: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: 5,
                                        }}
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <h6 className="mt-2">Part 7:</h6>
                        {listQuestions.map((element, index) => {
                            if (element.numPart === 7)
                                return (
                                    <button
                                        id={element.id + "Question"}
                                        key={`${index}Question`}
                                        type="button"
                                        className="btn btn-outline-dark btn-sm"
                                        style={{
                                            display: "inline-flex",
                                            height: 30,
                                            width: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: 5,
                                        }}
                                        onClick={() => scrollToHash(element.id)}
                                    >
                                        {numQuestionChoice++}
                                    </button>
                                );
                        })}
                        <div className="my-3 text-right">
                            <Link className="btn btn-outline-danger mr-2" to={`/${params.idTest}`}>
                                Quay lại
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    else return <h3 className="text-center mt-4">Đề đang cập nhật...</h3>;
}

export default ReviewAnswer;
