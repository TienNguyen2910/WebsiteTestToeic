import { Routes, Route } from "react-router-dom";
import App from "./App";

const { REACT_APP_SERVER } = process.env;

function Redirect() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </div>
    );
}

export default Redirect;
