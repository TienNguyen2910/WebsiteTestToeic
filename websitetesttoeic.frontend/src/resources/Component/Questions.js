const { REACT_APP_CLIENT } = process.env;

function Questions(props) {
    // console.log(props);
    if (props.Questions)
        return (
            <div className="col-6">
                <p 
                    className="m-1" 
                    dangerouslySetInnerHTML={{
                        __html: 
                            `${props.index}.  ${
                                props.Questions.contentQuestion ? props.Questions.contentQuestion : ""
                            }`
                    }}
                >
                </p>
                {props.Questions.image ? (
                    <span>
                        <img
                            className="p1-image"
                            src={`${REACT_APP_CLIENT}/LuanVan_Demo/${props.Questions.image}`}
                            alt={`${REACT_APP_CLIENT}/LuanVan_Demo/${props.Questions.image}`}
                        />
                    </span>
                ) : ""}

                <div className="m-2">
                    {/* Group of default radios - option 1 */}
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            className="custom-control-input"
                            id={`A${props.Questions.id}`}
                            name={props.Questions.id}
                        />
                        <label className="custom-control-label" htmlFor={`A${props.Questions.id}`}>
                            {`A. ${"Option 1"}`}
                        </label>
                    </div>
                    {/* Group of default radios - option 2 */}
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            className="custom-control-input"
                            id={`B${props.Questions.id}`}
                            name={props.Questions.id}
                        />
                        <label className="custom-control-label" htmlFor={`B${props.Questions.id}`}>
                            {`B. ${"Option 2"}`}
                        </label>
                    </div>
                    {/* Group of default radios - option 3 */}
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            className="custom-control-input"
                            id={`C${props.Questions.id}`}
                            name={props.Questions.id}
                        />
                        <label className="custom-control-label" htmlFor={`C${props.Questions.id}`}>
                            {`C. ${"Option 3"}`}
                        </label>
                    </div>
                    {/* Group of default radios - option 4 */}
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            className="custom-control-input"
                            id={`D${props.Questions.id}`}
                            name={props.Questions.id}
                        />
                        <label className="custom-control-label" htmlFor={`D${props.Questions.id}`}>
                            {`D. ${"Option 4"}`}
                        </label>
                    </div>
                </div>
            </div>
        );
    else return;
}

export default Questions;
