const { REACT_APP_CLIENT } = process.env;

function Questions(props) {
    if (props.Questions)
        return (
            <div
                className={props.Questions.numPart === 7 && props.Questions.image !== null ? "col-12" : "col-6"}
                id={props.Questions.id}
            >
                {props.Questions.numPart === 7 ? (
                    <>
                        {props.Questions.image ? (
                            <span>
                                <img
                                    className="p1-image mb-3"
                                    src={`${REACT_APP_CLIENT}/LuanVan_Demo/${props.Questions.image}`}
                                    alt={`${REACT_APP_CLIENT}/LuanVan_Demo/${props.Questions.image}`}
                                />
                            </span>
                        ) : (
                            ""
                        )}
                        <p
                            className="m-1"
                            dangerouslySetInnerHTML={{
                                __html: `${props.index}.  ${
                                    props.Questions.contentQuestion ? props.Questions.contentQuestion : ""
                                }`,
                            }}
                        ></p>
                    </>
                ) : (
                    <>
                        <p
                            className="m-1"
                            dangerouslySetInnerHTML={{
                                __html: `${props.index}.  ${
                                    props.Questions.contentQuestion ? props.Questions.contentQuestion : ""
                                }`,
                            }}
                        ></p>
                        {props.Questions.image ? (
                            <span>
                                <img
                                    className="p1-image"
                                    src={`${REACT_APP_CLIENT}/LuanVan_Demo/${props.Questions.image}`}
                                    alt={`${REACT_APP_CLIENT}/LuanVan_Demo/${props.Questions.image}`}
                                />
                            </span>
                        ) : (
                            ""
                        )}
                    </>
                )}

                <div className="m-2">
                    {props.Questions.answers.map((answer, index) => {
                        return (
                            <div className="custom-control custom-radio" key={index}>
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    id={`${answer.id}Answer`}
                                    name={props.Questions.id}
                                    onClick={() =>
                                        props.setAnswer(
                                            answer.id,
                                            props.Questions.id,
                                            answer.isAnswer,
                                            props.Questions.numPart
                                        )
                                    }
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor={`${answer.id}Answer`}
                                    dangerouslySetInnerHTML={{
                                        __html: `${answer.contentAnswer}`,
                                    }}
                                ></label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    else return;
}

export default Questions;
