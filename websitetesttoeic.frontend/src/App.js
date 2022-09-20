import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

// Layout
import Header from "./resources/Layout/Header";
import Footer from "./resources/Layout/Footer";

// Body
import Home from "./resources/Home/Home";
import Login from "./resources/Login/Login";
import Dashboard from "./resources/Dashboard/Dashboard";
import "./App.css";

function App() {
    return (
        <div className="App">
            {/* Header */}
            <Header />

            {/* Body */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
}

export default App;
