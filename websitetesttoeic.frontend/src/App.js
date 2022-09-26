import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

// Layout
import Header from "./resources/Layout/Header";
import Footer from "./resources/Layout/Footer";

// Body
import Home from "./resources/Home/Home";
import Login from "./resources/Login/Login";
import Dashboard from "./resources/Dashboard/Dashboard";
import Register from "./resources/Register/Register";
import "./App.css";

function App() {
    return (
        <div className="App">
            {/* Header */}
            <Header />

            {/* Body */}
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
}

export default App;
