import "./Layout.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../Component/Nav";

const { REACT_APP_SERVER } = process.env;
// var slug = require("slug");

function Header(props) {
    const [listTest, setListTest] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            url: `${REACT_APP_SERVER}/Test`,
        }).then((response) => {
            // console.log(response.data);
            setListTest(response.data);
        });
    }, []);

    return (
        <header style={{ zIndex: 10 }}>
            <nav className="d-none d-lg-block navbar navbar-expand-lg navbar-light bg-light">
                <div className="container p-0">
                    <Link className="navbar-brand nav-link" to="./">
                        <strong>TOEIC</strong>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarExample01"
                        aria-controls="navbarExample01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link" aria-current="page" to="./">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item dropdown active">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Thi thử
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {listTest.map((test, index) => (
                                        <li key={index}>
                                            <Link className="dropdown-item" to={`/${test.id}`}>
                                                {test.typeTest}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <Nav getCookie={props.getCookie} className="btn btn-primary" />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
