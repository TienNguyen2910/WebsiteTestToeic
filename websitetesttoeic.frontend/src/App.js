// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

// Layout
import Header from "./resources/Layout/Header";
// import Footer from "./resources/Layout/Footer";

// Body
import Login from "./resources/Login/Login";
import Dashboard from "./resources/Dashboard/Dashboard";
import Admin from "./resources/Admin/Admin";
import Register from "./resources/Register/Register";
import "./App.css";
import Exam from "./resources/Exam/Exam";
import ReviewAnswer from "./resources/Exam/ReviewAnswer";
import Infor from "./resources/Infor/Infor";
import QuizManagement from "./resources/Admin/QuizManagement";
import AddQA from "./resources/Admin/AddQA";

function App(props) {
    return (
        <div className="App">
            {/* Header */}
            <Header getCookie={props.getCookie} />

            {/* Body */}
            {/* container (Bootstrap) */}
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login setCookie={props.setCookie} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/:idTest" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/quizmanagement" element={<QuizManagement getCookie={props.getCookie} />} />
                    <Route path="/infor" element={<Infor getCookie={props.getCookie} setCookie={props.setCookie} />} />
                </Routes>
            </div>
            {/* don't use container (Bootstrap) */}
            <div className="container-fluid">
                <Routes>
                    <Route path="/quizmanagement/addQA/:idQuiz" element={<AddQA getCookie={props.getCookie} />} />
                    <Route path="/:idTest/:id" element={<Exam getCookie={props.getCookie} />} />
                    <Route path="/:idTest/:id/:resultId" element={<ReviewAnswer getCookie={props.getCookie} />} />
                </Routes>
            </div>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
}

export default App;
