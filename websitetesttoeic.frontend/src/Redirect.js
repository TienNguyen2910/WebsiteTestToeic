import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./resources/Home/Home";

function Redirect() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<App />} />
            </Routes>
        </div>
    );
}

export default Redirect;
