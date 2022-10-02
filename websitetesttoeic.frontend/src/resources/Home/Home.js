import { Link } from "react-router-dom";
const { REACT_APP_SERVER } = process.env;

function Home() {
    // console.log(process.env.REACT_APP_SERVER);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark d-none d-lg-block" style={{ zIndex: 2000 }}>
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
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                Action
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                Another action
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="navbar-nav d-flex flex-row">
                                <Link className="btn btn-outline-light" to="./login" role="button">
                                    Đăng nhập
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div id="intro" className="bg-image vh-100 shadow-1-strong">
                    {/* <video style={{ minWidth: "100%", minHeight: "100%" }} playsInline autoPlay muted loop>
                        <source className="h-100" src="https://mdbootstrap.com/img/video/Lines.mp4" type="video/mp4" />
                    </video> */}
                    <img
                        src="https://wallpaper.dog/large/20498061.jpg"
                        alt="Girl in a jacket"
                        style={{ backgroundSize: "cover" }}
                    />
                    <div className="mask">
                        <div className="container d-flex align-items-center justify-content-center text-center h-100">
                            <div className="text-white">
                                <h1 className="mb-3">ONLINE TOEIC TEST</h1>
                                <h5 className="mb-4">Hãy cố gắng mỗi ngày bạn sẽ đạt được mục tiêu !!!</h5>
                                <Link
                                    className="btn btn-outline-light btn-lg m-2"
                                    to="./dashboard"
                                    role="button"
                                    rel="nofollow"
                                >
                                    Start here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Home;
