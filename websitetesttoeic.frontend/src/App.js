// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

// Layout
import Header from "./resources/Layout/Header";
// import Footer from "./resources/Layout/Footer";

// Body
import Login from "./resources/Login/Login";
import Dashboard from "./resources/Dashboard/Dashboard";
import Register from "./resources/Register/Register";
import "./App.css";
import Exam from "./resources/Exam/Exam";

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
                    {/* <Route path="/:idTest/:id" element={<Exam />} /> */}
                </Routes>
            </div>
            {/* don't use container (Bootstrap) */}
            <div className="container-fluid">
                <Routes>
                    <Route path="/:idTest/:id" element={<Exam />} />
                </Routes>
            </div>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
}

export default App;
