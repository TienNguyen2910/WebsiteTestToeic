import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Questions from "../Component/Questions";
import "./Exam.css";

const { REACT_APP_CLIENT, REACT_APP_SERVER } = process.env;

function ReviewAnswer(props) {
    const [listQuestions, setListQuestions] = useState([]);
    const [listResultDetail, setListResultDetail] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState({});
    const scrollToHash = (id) => {
        if (id) {
            const anchor = document.getElementById(id);

            if (anchor) {
                anchor.scrollIntoView();
            }
        }
    };

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
            url: `${REACT_APP_SERVER}/Question/GetAllQuestion?QuizId=${params.id}`,
        })
            .then((response) => {
                setListQuestions(response.data);
            })
            .catch((error) => {
                navigate("/");
            });
    }, [params.id]);

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
            setLocation(response.data);
        });
    }, [params.idTest]);

    if (Object.keys(listQuestions).length !== 0)
        return (
            <div className="row">
                <div className="col-10 p-0">
                    <div className="shadow ml-4 mr-2 px-4 border border-light my-4 scroll bg-white">
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
                                        reviewAnswer={true}
                                        setAnswer={setAnswer}
                                        Questions={question}
                                        index={index + 1}
                                        key={index + 1}
                                    />
                                );
                            })}
                        </div>
                        <h4 className="my-3">PART 2</h4>
                        <div className="row">
                            {listQuestions.slice(6, 31).map((question, index) => {
                                return (
                                    <Questions
                                        reviewAnswer={true}
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
                                        reviewAnswer={true}
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
                                        reviewAnswer={true}
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
                                        reviewAnswer={true}
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
                                        reviewAnswer={true}
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
                                            reviewAnswer={true}
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
                                        reviewAnswer={true}
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
                                            reviewAnswer={true}
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
                    <div className="shadow mt-4 border-top-0 py-3 pl-3 border border-light scroll bg-white">
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
