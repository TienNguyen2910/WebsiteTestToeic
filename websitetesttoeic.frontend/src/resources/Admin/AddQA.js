import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import xlsx from "xlsx";
const { REACT_APP_SERVER } = process.env;

function AddQA(props) {
    const params = useParams();
    const [quiz, setQuiz] = useState({});
    const [QA, setQA] = useState([]);
    const [newQA, setNewQA] = useState([]);

    useEffect(() => {
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
    }, []);

    const handleFileExcel = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet, { range: 1, defval: "", blankrows: true });
                setQA(QA.concat(formatJSON(json)));
                setNewQA(newQA.concat(formatJSON(json)));
                const TypeQuiz = Object.keys(xlsx.utils.sheet_to_json(worksheet, { raw: false, range: `A1:B2` })[0])[0];
                if (TypeQuiz === "Full Test" && json.length === 200) {
                    console.log("Hợp lý full test");
                } else if (TypeQuiz === "Mini Test" && json.length === 100) {
                    console.log("Hợp lý mini test");
                }
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const handleFileAudio = (e) => {
        const newQA = QA.map((obj, index) => {
            if (index === 0) {
                return { ...obj, audioFile: "File-audio/" + e.target.files[0].name };
            }
            return obj;
        });
        setQA(newQA);
    };

    const handleFileImage = (e) => {
        const newQA = QA.map((obj, index) => {
            if (index === parseInt(e.target.className)) {
                return { ...obj, image: "Image-LuanVan/" + e.target.files[0].name };
            }
            return obj;
        });
        setQA(newQA);
    };

    const deleteRow = (index) => {
        console.log(index);
    };

    const formatJSON = (json) => {
        json.map((element, index) => {
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
                {
                    questionId: null,
                    contentAnswer: element.ContentAnswer_3,
                    isAnswer: element.IsAnswer === "D" ? true : false,
                    question: null,
                    resultDetailsList: null,
                },
            ];
        });
        return json;
    };

    const submitQA = () => {
        console.log(QA);
        console.log(QA[0].audioFile);
        if (newQA.length > 0 && QA[0].audioFile !== "") {
            axios({
                method: "post",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.getCookie("token")}`,
                },
                data: newQA,
                url: `${REACT_APP_SERVER}/Question/AddQuestion`,
            }).then((response) => {
                console.log(newQA);
                setNewQA([]);
                if (response.data) {
                    alert("Thêm câu hỏi thành công!");
                } else {
                    alert("Lỗi. Vui lòng thử lại!!!");
                }
            });
        } else alert("Vui lòng import file audio trước khi submit!");
    };

    return (
        <>
            <div className="shadow bg-white p-4 mt-3">
                <h3 className="text-center">{quiz.title}</h3>
                <h3 className="text-center">{quiz.test ? quiz.test.typeTest : null}</h3>
                <div>
                    <label>File excel mẫu: </label>
                    <a className="mx-2" href="/LuanVan_Demo/FullTest.xlsx" target="_blank">
                        Full Test
                    </a>
                    <label> | </label>
                    <a className="ml-2" href="/LuanVan_Demo/MiniTest.xlsx" target="_blank">
                        Mini Test
                    </a>
                </div>
                <div>
                    <label htmlFor="excel">Import file excel:</label>
                    <input type="file" id="excel" className="ml-2" onChange={handleFileExcel} />
                </div>
                {QA.length > 0 ? (
                    <div>
                        <table className="table table-hover align-middle my-4">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th>NumPart</th>
                                    <th>ContentQuestion</th>
                                    <th>ContentScript</th>
                                    <th>ContentAnswer</th>
                                    <th>ContentAnswer_1</th>
                                    <th>ContentAnswer_2</th>
                                    <th>ContentAnswer_3</th>
                                    <th>IsAnswer</th>
                                    <th>Image</th>
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
                                            <td className={index}>{element.answers[3].contentAnswer}</td>
                                            <td className={index}>
                                                {element.answers.map((element, index) => {
                                                    if (element.isAnswer) return element.contentAnswer.substring(0, 1);
                                                })}
                                            </td>
                                            <td>
                                                <input className={index} type="file" onChange={handleFileImage}></input>
                                            </td>
                                            <td className="text-center">
                                                <a
                                                    className="text-success"
                                                    to="#"
                                                    data-mdb-toggle="modal"
                                                    data-mdb-target="#modalUpdate"
                                                >
                                                    <i className="fa-solid fa-edit me-2"></i>
                                                </a>
                                                <a className="text-danger" to="#">
                                                    <i
                                                        className="fa-solid fa-trash me-2"
                                                        onClick={() => deleteRow(index)}
                                                    ></i>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <label htmlFor="excel">Import file audio:</label>
                        <input type="file" id="audio" className="ml-2" onChange={handleFileAudio} />
                        <button className="btn btn-success d-block ml-auto" onClick={submitQA}>
                            Lưu Lại
                        </button>
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
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUpdatelLabel">
                                Modal title
                            </h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddQA;
