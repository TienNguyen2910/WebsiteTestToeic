import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import xlsx from "xlsx";
import "./AddQA.css";
const { REACT_APP_SERVER } = process.env;

function AddQA(props) {
    const params = useParams();
    const [quiz, setQuiz] = useState({});
    const [QA, setQA] = useState([]);
    const [questionEdit, setQuestionEdit] = useState({});
    const navigate = useNavigate();

    const refeshListQuiz = () => {
        axios({
            method: "get",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            url: `${REACT_APP_SERVER}/Quiz/${params.idQuiz}`,
        }).then((response) => {
            setQuiz(response.data);
            setQA(response.data.questionsList);
        });
    };

    useEffect(() => {
        refeshListQuiz();
    }, []);

    const handleQuestionEdit = (e, type) => {
        setQuestionEdit({ ...questionEdit, [type]: e.target.value });
    };

    const handleAnswerEdit = (e, index) => {
        var tempAnswer = [];
        questionEdit.answers.map((element, indeX) => {
            tempAnswer.push(element);
            if (indeX === index) tempAnswer[indeX].contentAnswer = e.target.value;
        });
        setQuestionEdit({ ...questionEdit, answers: tempAnswer });
    };

    const handleIsAnswer = (e) => {
        var tempAnswer = [];
        var select = e.target.value === "A" ? 0 : e.target.value === "B" ? 1 : e.target.value === "C" ? 2 : 3;
        questionEdit.answers.map((element, indeX) => {
            tempAnswer.push(element);
            if (indeX === select) tempAnswer[indeX].isAnswer = true;
            else tempAnswer[indeX].isAnswer = false;
        });
        setQuestionEdit({ ...questionEdit, answers: tempAnswer });
    };

    const handleFileImage = (e) => {
        const url = `${REACT_APP_SERVER}/Question/UploadFile`;
        const formData = new FormData();
        formData.append("files", e.target.files[0]);
        const config = {
            headers: {
                accept: "*/*",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
        };
        axios
            .post(url, formData, config)
            .then((response) => {
                if (response.status === 200) {
                    setQuestionEdit({ ...questionEdit, image: `Image-LuanVan/${e.target.files[0].name}` });
                } else {
                    alert("Upload image thất bại!!!");
                    e.target.value = null;
                }
            })
            .catch((err) => {
                alert("Upload image thất bại!!!" + err);
                e.target.value = null;
            });
    };

    const handleFileExcel = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
                if (quiz.test.typeTest === "Full Test" && QA.concat(formatJSON(json)).length > 200) {
                    alert("Tối đa full test chỉ 200 câu");
                } else if (quiz.test.typeTest === "Mini Test" && QA.concat(formatJSON(json)).length > 65) {
                    alert("Tối đa mini test chỉ 65 câu");
                } else {
                    submitQA(json);
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const handleFileAudio = (e) => {
        const url = `${REACT_APP_SERVER}/Question/UploadFile`;
        const formData = new FormData();
        formData.append("files", e.target.files[0]);
        const config = {
            headers: {
                accept: "*/*",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
        };

        axios.post(url, formData, config).then((response) => {
            if (response.status === 200) {
                const url2 = `${REACT_APP_SERVER}/Question/UpdateQuestion?Id=${QA[0].id}`;
                const config2 = {
                    headers: {
                        accept: "text/plain",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.getCookie("token")}`,
                    },
                };
                axios({
                    method: "put",
                    headers: config2,
                    data: { ...JSON.parse(JSON.stringify(QA[0])), audioFile: `File-audio/${e.target.files[0].name}` },
                    url: url2,
                }).then((response) => {
                    refeshListQuiz();
                });
            } else {
                alert("Lỗi khi upload. Vui lòng thử lại!");
                document.getElementById("audio").value = null;
            }
        });
    };

    const formatJSON = (json) => {
        json.map((element) => {
            element.quizId = parseInt(params.idQuiz);
            element.answers = [
                {
                    questionId: null,
                    contentAnswer: element.ContentAnswer,
                    isAnswer: element.IsAnswer === "A" ? true : false,
                    question: null,
                    resultDetailsList: null,
                },
                {
                    questionId: null,
                    contentAnswer: element.ContentAnswer_1,
                    isAnswer: element.IsAnswer === "B" ? true : false,
                    question: null,
                    resultDetailsList: null,
                },
                {
                    questionId: null,
                    contentAnswer: element.ContentAnswer_2,
                    isAnswer: element.IsAnswer === "C" ? true : false,
                    question: null,
                    resultDetailsList: null,
                },
            ];

            if (element.ContentAnswer_3 !== "") {
                element.answers.push({
                    questionId: null,
                    contentAnswer: element.ContentAnswer_3,
                    isAnswer: element.IsAnswer === "D" ? true : false,
                    question: null,
                    resultDetailsList: null,
                });
            }
        });
        return json;
    };

    const submitQA = (json) => {
        if (json.length > 0) {
            axios({
                method: "post",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.getCookie("token")}`,
                },
                data: json,
                url: `${REACT_APP_SERVER}/Question/AddQuestion`,
            }).then((response) => {
                if (response.data) {
                    refeshListQuiz();
                    alert("Thêm câu hỏi thành công!");
                } else {
                    alert("Lỗi. Vui lòng thử lại!!!");
                }
            });
        } else alert("Chưa có dữ liệu mới để thêm, vui lòng thử lại!");
        document.getElementById("excel").value = null;
    };

    const submitQuestionEdit = (e) => {
        axios({
            method: "put",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            data: questionEdit,
            url: `${REACT_APP_SERVER}/Question/UpdateQuestion?Id=${questionEdit.id}`,
        }).then((response) => {
            if (response.data) {
                refeshListQuiz();
            } else alert("Cập nhật thất bại!!");
            document.getElementById("modalUpdate").click();
        });
    };

    const deleteQuestion = (id) => {
        axios({
            method: "delete",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.getCookie("token")}`,
            },
            url: `${REACT_APP_SERVER}/Question/DeleteQuestion?Id=${id}`,
        }).then((response) => {
            if (response.data) refeshListQuiz();
        });
    };

    const deleteImage = () => {
        setQuestionEdit((prev) => {
            return { ...prev, image: "" };
        });
        document.getElementById("inputImage").value = "";
    };

    return (
        <>
            <div className="shadow bg-white p-4 mt-3">
                <h3 className="text-center">{quiz.title}</h3>
                <h3 className="text-center">{quiz.test ? quiz.test.typeTest : null}</h3>
                <div>
                    <label>File excel mẫu: </label>
                    <a className="mx-2" href="/LuanVan_Demo/Excel.xlsx" target="_blank">
                        Tải xuống
                    </a>
                </div>
                <div>
                    <label htmlFor="excel">Import file excel:</label>
                    <input
                        type="file"
                        id="excel"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="ml-2"
                        onChange={handleFileExcel}
                    />
                </div>
                {QA.length > 0 ? (
                    <div>
                        <table className="table table-hover my-4 addtable" style={{ tableLayout: "fixed" }}>
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Part</th>
                                    <th>Câu hỏi</th>
                                    <th>Nội dung script</th>
                                    <th>Đáp án A</th>
                                    <th>Đáp án B</th>
                                    <th>Đáp án C</th>
                                    <th>Đáp án D</th>
                                    <th>Đáp án đúng</th>
                                    <th>Hình ảnh</th>
                                    <th>Chi tiết đáp án</th>
                                    <th>Công cụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {QA.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td className={index}>{element.numPart}</td>
                                            <td className={index}>{element.contentQuestion}</td>
                                            <td className={index}>{element.contentScript}</td>
                                            <td className={index}>{element.answers[0].contentAnswer}</td>
                                            <td className={index}>{element.answers[1].contentAnswer}</td>
                                            <td className={index}>{element.answers[2].contentAnswer}</td>
                                            <td className={index}>
                                                {element.answers[3] ? element.answers[3].contentAnswer : ""}
                                            </td>
                                            <td className={index}>
                                                {element.answers.map((element, index) => {
                                                    if (element.isAnswer) return element.contentAnswer.substring(0, 1);
                                                })}
                                            </td>
                                            <td className={index}>
                                                {element.image ? (
                                                    <img
                                                        width={100}
                                                        height={100}
                                                        src={`${REACT_APP_SERVER + "/" + element.image}`}
                                                    ></img>
                                                ) : null}
                                            </td>
                                            <td className={index}>{element.answerDetail}</td>
                                            <td>
                                                <a
                                                    className="text-success"
                                                    to="#"
                                                    data-mdb-toggle="modal"
                                                    data-mdb-target="#modalUpdate"
                                                    onClick={() => {
                                                        document.getElementById("inputImage").value = "";
                                                        setQuestionEdit(JSON.parse(JSON.stringify(QA[index])));
                                                        QA[index].answers.map((element, indeX) => {
                                                            if (element.isAnswer) {
                                                                var select =
                                                                    indeX === 0
                                                                        ? "A"
                                                                        : indeX === 1
                                                                        ? "B"
                                                                        : indeX === 2
                                                                        ? "C"
                                                                        : "D";
                                                                document.getElementById("IsAnswer").value = select;
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <i className="fa-solid fa-edit me-2"></i>
                                                </a>
                                                <a
                                                    className="text-danger"
                                                    to="#"
                                                    onClick={() => deleteQuestion(element.id)}
                                                >
                                                    <i className="fa-solid fa-trash me-2"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="mb-4 d-flex align-items-center">
                            File audio:
                            {QA[0].audioFile ? (
                                <audio controls className="ml-3">
                                    <source src={`${REACT_APP_SERVER + "/" + QA[0].audioFile}`} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            ) : (
                                "(Trống)"
                            )}
                        </div>
                        <label htmlFor="excel">Import file audio:</label>
                        <input type="file" id="audio" className="ml-2" accept=".mp3" onChange={handleFileAudio} />
                        <div className="d-block text-right">
                            <button className="btn btn-danger text-left" onClick={() => navigate(-1)}>
                                Quay lại
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Modal Update */}
            <div
                className="modal fade"
                id="modalUpdate"
                tabIndex="-1"
                aria-labelledby="modalUpdateLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUpdatelLabel">
                                Cập nhật thông tin
                            </h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Part:</td>
                                        <td>
                                            <input
                                                type="number"
                                                max={7}
                                                min={1}
                                                className="numPart w-100"
                                                id="numPart"
                                                required
                                                value={questionEdit.numPart ? questionEdit.numPart : ""}
                                                onChange={(e) => handleQuestionEdit(e, "numPart")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Câu hỏi:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="contentQuestion w-100"
                                                id="contentQuestion"
                                                required
                                                value={questionEdit.contentQuestion ? questionEdit.contentQuestion : ""}
                                                onChange={(e) => handleQuestionEdit(e, "contentQuestion")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nội dung script:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="contentScript w-100"
                                                id="contentScript"
                                                required
                                                value={questionEdit.contentScript ? questionEdit.contentScript : ""}
                                                onChange={(e) => handleQuestionEdit(e, "contentScript")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đáp án A:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="ContentAnswer w-100"
                                                id="ContentAnswer"
                                                required
                                                value={
                                                    questionEdit.answers ? questionEdit.answers[0].contentAnswer : ""
                                                }
                                                onChange={(e) => handleAnswerEdit(e, 0)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đáp án B:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="ContentAnswer_1 w-100"
                                                id="ContentAnswer_1"
                                                required
                                                value={
                                                    questionEdit.answers ? questionEdit.answers[1].contentAnswer : ""
                                                }
                                                onChange={(e) => handleAnswerEdit(e, 1)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đáp án C:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="ContentAnswer_2 w-100"
                                                id="ContentAnswer_2"
                                                required
                                                value={
                                                    questionEdit.answers ? questionEdit.answers[2].contentAnswer : ""
                                                }
                                                onChange={(e) => handleAnswerEdit(e, 2)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đáp án D:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="ContentAnswer_3 w-100"
                                                id="ContentAnswer_3"
                                                value={
                                                    questionEdit.answers && questionEdit.answers[3] !== undefined
                                                        ? questionEdit.answers[3].contentAnswer
                                                        : ""
                                                }
                                                onChange={(e) => handleAnswerEdit(e, 3)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Đáp án đúng:</td>
                                        <td>
                                            <select
                                                className="form-select IsAnswer"
                                                aria-label="Default select example"
                                                id="IsAnswer"
                                                onChange={(e) => handleIsAnswer(e)}
                                            >
                                                <option value={"A"}>A</option>
                                                <option value={"B"}>B</option>
                                                <option value={"C"}>C</option>
                                                <option value={"D"}>D</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Chi tiết đáp án:</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="answerDetail w-100"
                                                id="answerDetail"
                                                value={questionEdit.answerDetail ? questionEdit.answerDetail : ""}
                                                onChange={(e) => handleQuestionEdit(e, "answerDetail")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Hình ảnh:</td>
                                        <td>
                                            <img
                                                className="mb-3"
                                                src={`${REACT_APP_SERVER + "/" + questionEdit.image}`}
                                                width={100}
                                                height={100}
                                            ></img>
                                            <button className="btn btn-danger mb-3 ml-2 btn-sm" onClick={deleteImage}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <div className="d-block">
                                                <input
                                                    type="file"
                                                    id="inputImage"
                                                    accept=".png"
                                                    className="Image w-100"
                                                    onChange={handleFileImage}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                                Đóng
                            </button>
                            <button type="submit" className="btn btn-primary" onClick={submitQuestionEdit}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddQA;
