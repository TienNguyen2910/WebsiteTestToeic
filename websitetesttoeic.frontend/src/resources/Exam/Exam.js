import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Questions from "../Component/Questions";
import "./Exam.css";
import Countdown from "react-countdown";

const { REACT_APP_CLIENT, REACT_APP_SERVER } = process.env;

function Exam(props) {
    const [listQuestions, setListQuestions] = useState({});
    const [location, setLocation] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const startDate = useRef(Date.now());
    const reviewAns = useRef();
    const btnSubmit = useRef();
    const goBack = useRef();
    const [calResult, setCalResult] = useState();
    const [result, setResult] = useState({
        UserId: Object.values(JSON.parse(props.getCookie("user")))[0],
        QuizId: params.id,
        StartedAt: new Date().toISOString(),
        EndedAt: null,
    });

    const [resultDetail, setResultDetail] = useState([]);

    const setAnswer = (idAnswer, idQuestion, isAnswer, Part) => {
        document.getElementById(idQuestion + "Question").classList.add("active");
        if (!resultDetail.some((element) => element.QuestionId === idQuestion))
            setResultDetail([
                ...resultDetail,
                {
                    QuestionId: idQuestion,
                    ResultId: null,
                    AnswerSelectedId: idAnswer,
                    IsAnswerTrue: isAnswer,
                    Part: Part,
                },
            ]);
        else {
            var index = resultDetail.findIndex((element) => element.QuestionId === idQuestion);
            resultDetail[index].AnswerSelectedId = idAnswer;
            resultDetail[index].IsAnswerTrue = isAnswer;
        }
    };

    const addHours = (numOfHours, date = new Date()) => {
        date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
        return date.toISOString();
    };

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            url: `${REACT_APP_SERVER}/Question/GetAllQuestion?QuizId=${params.id}`,
        })
            .then((response) => {
                setListQuestions(response.data);
            })
            .catch((error) => {
                navigate("/");
            });
        setResult({ ...result, QuizId: params.id, EndedAt: addHours(2) });
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
            setLocation(response.data);
        });
    }, [params.idTest]);

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

    const scrollToHash = (id) => {
        if (id) {
            const anchor = document.getElementById(id);

            if (anchor) {
                anchor.scrollIntoView();
            }
        }
    };

    const listeningScore = (numCorrect) => {
        if (numCorrect < 7) return 5;
        else if (numCorrect < 31) return (numCorrect - 5) * 5;
        else if (numCorrect < 39) return (numCorrect - 4) * 5;
        else if (numCorrect < 45) return (numCorrect - 2) * 5;
        else if (numCorrect < 54) return (numCorrect - 1) * 5;
        else if (numCorrect < 58) return numCorrect * 5;
        else if (numCorrect < 70) return (numCorrect + 1) * 5;
        else if (numCorrect < 75) return (numCorrect + 2) * 5;
        else if (numCorrect < 80) return (numCorrect + 3) * 5;
        else if (numCorrect < 85) return (numCorrect + 4) * 5;
        else if (numCorrect < 88) return (numCorrect + 5) * 5;
        else if (numCorrect < 93) return (numCorrect + 6) * 5;
        else return 495;
    };

    const readingScore = (numCorrect) => {
        if (numCorrect < 10) return 5;
        else if (numCorrect < 25) return (numCorrect - 8) * 5;
        else if (numCorrect < 39) return (numCorrect - 6) * 5;
        else if (numCorrect < 43) return (numCorrect - 5) * 5;
        else if (numCorrect < 47) return (numCorrect - 4) * 5;
        else if (numCorrect < 52) return (numCorrect - 3) * 5;
        else if (numCorrect < 55) return (numCorrect - 2) * 5;
        else if (numCorrect < 64) return (numCorrect - 1) * 5;
        else if (numCorrect < 82) return numCorrect * 5;
        else if (numCorrect < 89) return (numCorrect - 1) * 5;
        else if (numCorrect < 92) return numCorrect * 5;
        else if (numCorrect < 93) return (numCorrect + 6) * 5;
        else if (numCorrect < 97) return (numCorrect + 2) * 5;
        else return 495;
    };

    const submit = () => {
        let listen = 0;
        let read = 0;
        for (let i = 0; i < resultDetail.length; i++) {
            if (
                resultDetail[i].Part === 1 ||
                resultDetail[i].Part === 2 ||
                resultDetail[i].Part === 3 ||
                (resultDetail[i].Part === 4 && resultDetail[i].IsAnswerTrue === true)
            )
                listen++;
            if (
                resultDetail[i].Part === 5 ||
                resultDetail[i].Part === 6 ||
                (resultDetail[i].Part === 7 && resultDetail[i].IsAnswerTrue === true)
            )
                read++;
        }
        result.Score = listeningScore(listen) + readingScore(read);
        axios({
            method: "POST",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
            data: result,
            url: `${REACT_APP_SERVER}/Result/AddResult`,
        }).then((response) => {
            resultDetail.map((element) => {
                element.ResultId = response.data;
                delete element.IsAnswerTrue;
                delete element.Part;
            });
            axios({
                method: "POST",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                },
                data: resultDetail,
                url: `${REACT_APP_SERVER}/ResultDetail/AddResultDetail`,
            }).then((response) => {
                if (response.data) {
                    setCalResult(`Điểm của bạn: ${result.Score}`);
                    reviewAns.current.hidden = false;
                    goBack.current.hidden = false;
                    btnSubmit.current.hidden = true;
                }
            });
        });
    };

    if (Object.keys(listQuestions).length !== 0)
        return (
            <div className="row">
                <div className="col-10 p-0">
                    <div className="shadow ml-4 mr-2 px-4 border border-light my-4 scroll">
                        {params.idTest === "1" ? (
                            <h3 className="text-center my-3">FULL TEST</h3>
                        ) : (
                            <h3 className="text-center my-3">MINI TEST</h3>
                        )}
                        <h3 className="text-center my-3">
                            {location.title ? location.title : window.location.replace(`/${params.idTest}`)}
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
                                return (
                                    <Questions
                                        Questions={question}
                                        index={index + 1}
                                        key={index + 1}
                                        setAnswer={setAnswer}
                                    />
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 2</h4>
                        <div className="row">
                            {listQuestions.slice(6, 31).map((question, index) => {
                                return (
                                    <Questions
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 7}
                                        key={index + 7}
                                    />
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 3</h4>
                        <div className="row">
                            {listQuestions.slice(31, 70).map((question, index) => {
                                return (
                                    <Questions
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 32}
                                        key={index + 32}
                                    />
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 4</h4>
                        <div className="row">
                            {listQuestions.slice(70, 100).map((question, index) => {
                                return (
                                    <Questions
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 71}
                                        key={index + 71}
                                    />
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 5</h4>
                        <div className="row">
                            {listQuestions.slice(100, 130).map((question, index) => {
                                return (
                                    <Questions
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 101}
                                        key={index + 101}
                                    />
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 6</h4>
                        <div className="row">
                            {listQuestions.slice(130, 146).map((question, index) => {
                                return question.contentScript === null ? (
                                    <Questions
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 131}
                                        key={index + 131}
                                    />
                                ) : (
                                    <>
                                        <div className="col-12" key={index}>
                                            <p
                                                className="p-3 my-3"
                                                id="contentScipt"
                                                dangerouslySetInnerHTML={{
                                                    __html: `${
                                                        question.contentScript === null ? "" : question.contentScript
                                                    }`,
                                                }}
                                            ></p>
                                        </div>
                                        <Questions
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={index + 131}
                                            key={index + 131}
                                        />
                                    </>
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 7</h4>
                        <div className="row">
                            {listQuestions.slice(146, 200).map((question, index) => {
                                return question.contentScript === null ? (
                                    <Questions
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 147}
                                        key={index + 147}
                                    />
                                ) : (
                                    <>
                                        <div className="col-12" key={index}>
                                            <p
                                                className="p-3 my-3"
                                                id="contentScipt"
                                                dangerouslySetInnerHTML={{
                                                    __html: `${
                                                        question.contentScript === null ? "" : question.contentScript
                                                    }`,
                                                }}
                                            ></p>
                                        </div>
                                        <Questions
                                            setAnswer={setAnswer}
                                            Questions={question}
                                            index={index + 147}
                                            key={index + 147}
                                        />
                                    </>
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
                                    ? startDate.current + 120 * 1000 * 60
                                    : startDate.current + 60 * 1000 * 60
                            }
                            renderer={renderer}
                        />
                        <h6 className="mt-2">Part 1:</h6>
                        {listQuestions.slice(0, 6).map((element, index) => (
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
                                {index + 1}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 2:</h6>
                        {listQuestions.slice(6, 31).map((element, index) => (
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
                                {index + 7}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 3:</h6>
                        {listQuestions.slice(31, 70).map((element, index) => (
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
                                {index + 32}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 4:</h6>
                        {listQuestions.slice(70, 100).map((element, index) => (
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
                                {index + 71}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 5:</h6>
                        {listQuestions.slice(100, 130).map((element, index) => (
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
                                {index + 101}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 6:</h6>
                        {listQuestions.slice(130, 146).map((element, index) => (
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
                                {index + 131}
                            </button>
                        ))}
                        <h6 className="mt-2">Part 7:</h6>
                        {listQuestions.slice(146, 200).map((element, index) => (
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
                                {index + 147}
                            </button>
                        ))}
                        <button
                            className="my-3 btn btn-outline-primary d-flex ml-auto mr-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            {" "}
                            Nộp bài{" "}
                        </button>
                    </div>
                </div>
                {/* // Modal */}
                <div className="modal fade" tabIndex="-1" id="exampleModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xác nhận?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <p>Bạn đã hoàn thành {resultDetail.length}/200 đáp án (^.^)!</p>
                                <p>
                                    {resultDetail.length < 5
                                        ? "Vui lòng hoàn thành ít nhất 5 câu trước khi nộp bài!"
                                        : " "}
                                </p>
                                <p className="fw-bold">{calResult}</p>
                                <Link hidden ref={reviewAns}>
                                    Xem lại đáp án
                                </Link>
                            </div>
                            <div className="modal-footer">
                                <button
                                    hidden
                                    ref={goBack}
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        document.getElementById("exampleModal").click();
                                        navigate(-1);
                                    }}
                                >
                                    Quay lại
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    ref={btnSubmit}
                                    hidden={resultDetail.length < 5 ? true : false}
                                    onClick={submit}
                                >
                                    Nộp bài
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    else return <h3 className="text-center mt-4">Đề đang cập nhật...</h3>;
}

export default Exam;
