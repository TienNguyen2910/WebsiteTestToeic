import "./Layout.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header style={{ zIndex: 10 }}>
            <nav className="d-none d-lg-block navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
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
                            <li className="nav-item active">
                                <Link className="nav-link" to="./dashboard" rel="nofollow">
                                    Luyện tập
                                </Link>
                            </li>

                            <li className="nav-item active">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Thi Thử
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link class="dropdown-item" href="#"></Link>
                                        
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item me-3 me-lg-0">
                                <Link className="btn btn-primary" to="./login" rel="nofollow">
                                    Đăng nhập
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
