import { Link } from "react-router-dom";
import "./Component.css";

const { REACT_APP_CLIENT } = process.env;

function Nav(props) {
    const logOut = () => {
        document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.replace("/");
    };

    if (Object.keys(JSON.parse(props.getCookie("user"))).length === 0) {
        return (
            <div className="navbar-nav d-flex flex-row">
                <Link
                    className={props.className !== undefined ? props.className : "btn btn-outline-light"}
                    to="./login"
                    role="button"
                >
                    Đăng nhập
                </Link>
            </div>
        );
    } else {
        return (
            <div className="navbar-nav d-flex flex-row">
                {/* Avatar */}
                <li className="dropdown">
                    <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src={`${REACT_APP_CLIENT}/default.jpg`}
                            className="rounded-circle"
                            height={22}
                            alt="Portrait of a Woman"
                            loading="lazy"
                        />
                        <span className="mx-2">{Object.values(JSON.parse(props.getCookie("user")))[1]}</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                        <li>
                            <Link className="dropdown-item" to="#" onClick={logOut}>
                                <div>
                                    <i className="fa-solid fa-right-from-bracket me-3" />
                                    <span>Đăng xuất</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </li>
            </div>
        );
    }
}

export default Nav;
