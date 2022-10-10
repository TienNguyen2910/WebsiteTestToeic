import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Component.css";

const { REACT_APP_CLIENT } = process.env;

function Nav(props) {
    const modal = useRef();

    const logOut = () => {
        document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        closeModal();
        window.location.reload();
    };

    const closeModal = () => {
        modal.current.click();
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
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
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
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                        <li>
                            <Link
                                className="dropdown-item"
                                to="#"
                                data-mdb-toggle="modal"
                                data-mdb-target="#exampleModal"
                            >
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* Modal xác nhận đăng xuất */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    ref={modal}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Đăng xuất
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">Bạn có chắc muốn đăng xuất?</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-danger" id="btn-logout" onClick={logOut}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;
