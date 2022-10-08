import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Questions from "../Component/Questions";
import "./Exam.css";

const { REACT_APP_CLIENT, REACT_APP_SERVER } = process.env;

function Exam() {
    const [listQuestions, setListQuestions] = useState({});
    const params = useParams();
    const location = useLocation();
    const myBtnRef = useRef();

    // console.log(params.idTest);
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Question/GetAllQuestion?QuizId=${params.idTest}`,
        }).then((response) => {
            // console.log(response.data);
            setListQuestions(response.data);
        });
    }, []);

    useEffect(() => {
        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                myBtnRef.current.style.display = "block";
            } else {
                myBtnRef.current.style.display = "none";
            }
        };
    }, []);

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    if (Object.keys(listQuestions).length !== 0)
        return (
            <>
                <button
                    onClick={topFunction}
                    id="myBtnTop"
                    className="btn btn-success"
                    title="Go to top"
                    ref={myBtnRef}
                >
                    Top
                </button>
                {params.idTest === "1" ? (
                    <h3 className="text-center my-3">FULL TEST</h3>
                ) : (
                    <h3 className="text-center my-3">MINI TEST</h3>
                )}

                <h3 className="text-center my-3">{location.state.title}</h3>
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
                        return <Questions Questions={question} index={index + 131} key={index} />;
                    })}
                </div>
                <h4 className="my-3">PART 7</h4>
                <div className="row">
                    {listQuestions.slice(146, 200).map((question, index) => {
                        return <Questions Questions={question} index={index + 147} key={index} />;
                    })}
                </div>
            </>
        );
}

export default Exam;
