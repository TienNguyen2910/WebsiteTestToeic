import { Link } from "react-router-dom";

function Home() {
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
                                    <Link className="nav-link" to="./test" rel="nofollow">
                                        Thi thử
                                    </Link>
                                </li>
                            </ul>

                            <div className="navbar-nav d-flex flex-row">
                                <Link
                                    className="btn btn-outline-light"
                                    to="https://mdbootstrap.com/docs/standard/"
                                    role="button"
                                >
                                    LOGIN
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <div id="intro" className="bg-image vh-100 shadow-1-strong">
                    <video style={{ minWidth: "100%", minHeight: "100%" }} playsInline autoPlay muted loop>
                        <source className="h-100" src="https://mdbootstrap.com/img/video/Lines.mp4" type="video/mp4" />
                    </video>
                    <div className="mask">
                        <div className="container d-flex align-items-center justify-content-center text-center h-100">
                            <div className="text-white">
                                <h1 className="mb-3">ONLINE TOEIC TEST</h1>
                                <h5 className="mb-4">The best choice to study and practice toeic !!!</h5>
                                <a
                                    className="btn btn-outline-light btn-lg m-2"
                                    href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                                    role="button"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    Start here
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Home;
