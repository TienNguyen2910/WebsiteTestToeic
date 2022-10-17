const { REACT_APP_CLIENT } = process.env;

function Questions(props) {
    // console.log(props);
    if (props.Questions)
        return (
            <div className="col-6">
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

                <div className="m-2">
                    {props.Questions.answers.map((answer, index) => {
                        return (
                            <div className="custom-control custom-radio" key={index}>
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    id={`${answer.id}`}
                                    name={props.Questions.id}
                                />
                                <label className="custom-control-label" htmlFor={`${answer.id}`}
                                    dangerouslySetInnerHTML={{
                                        __html: `${
                                            answer.contentAnswer
                                        }`,
                                    }}
                                >
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    else return;
}

export default Questions;
