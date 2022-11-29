const { REACT_APP_SERVER } = process.env;

function Questions(props) {
    if (props.Questions)
        return (
            <div className={props.Questions.numPart === 7 && props.Questions.image !== null ? "col-12" : "col-6"} id={props.Questions.id}>
                {props.Questions.numPart === 7 ? (
                    <>
                        {props.Questions.image ? (
                            <span>
                                <img
                                    className="p1-image mb-3"
                                    src={`${REACT_APP_SERVER}/${props.Questions.image}`}
                                    alt={`${REACT_APP_SERVER}/${props.Questions.image}`}
                                />
                            </span>
                        ) : (
                            ""
                        )}
                        <p
                            className="m-0 mb-1"
                            dangerouslySetInnerHTML={{
                                __html: `${props.index}.  ${props.Questions.contentQuestion ? props.Questions.contentQuestion : ""}`,
                            }}
                        ></p>
                    </>
                ) : (
                    <>
                        <p
                            className="m-0 mb-1"
                            dangerouslySetInnerHTML={{
                                __html: `${props.index}.  ${props.Questions.contentQuestion ? props.Questions.contentQuestion : ""}`,
                            }}
                        ></p>
                        {props.Questions.image ? (
                            <span>
                                <img
                                    className="p1-image"
                                    src={`${REACT_APP_SERVER}/${props.Questions.image}`}
                                    alt={`${REACT_APP_SERVER}/${props.Questions.image}`}
                                />
                            </span>
                        ) : (
                            ""
                        )}
                    </>
                )}

                <div className="my-2">
                    {props.Questions.answers.map((answer, index) => {
                        return (
                            <div className="custom-control custom-radio" key={index} style={{ margin: "2px 0px" }}>
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    id={`${answer.id}Answer`}
                                    name={props.Questions.id}
                                    onClick={() => props.setAnswer(answer.id, props.Questions.id, answer.isAnswer, props.Questions.numPart)}
                                />
                                <label
                                    className="custom-control-label"
                                    style={answer.isAnswer && props.reviewAnswer ? { backgroundColor: "#4caf50", color: "white" } : null}
                                    htmlFor={`${answer.id}Answer`}
                                    id={`${answer.id}AnswerLabel`}
                                    dangerouslySetInnerHTML={{
                                        __html: `${answer.contentAnswer}`,
                                    }}
                                ></label>
                            </div>
                        );
                    })}
                    {props.reviewAnswer ? (
                        <div>
                            <p className="m-0 my-2">
                                <a
                                    className="text-primary"
                                    data-bs-toggle="collapse"
                                    href={`#collapse${props.Questions.id}`}
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls={`collapse${props.Questions.id}`}
                                >
                                    Hiển thị chi tiết đáp án &nbsp; <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </a>
                            </p>
                            <div className="collapse" id={`collapse${props.Questions.id}`}>
                                <div className="card card-body p-0">
                                    <p
                                        className="py-2 px-4 my-2"
                                        style={{ backgroundColor: "#F5F5F5" }}
                                        dangerouslySetInnerHTML={{
                                            __html: `${props.Questions.answerDetail}`,
                                        }}
                                    ></p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    else return;
}

export default Questions;
