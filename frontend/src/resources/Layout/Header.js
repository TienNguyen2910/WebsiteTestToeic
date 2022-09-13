import "./Layout.css";

function Header() {
    return (
        <header>
            <nav
                className="container d-none d-lg-block navbar navbar-expand-lg navbar-light bg-light"
                style={{ zIndex: 2000 }}
            >
                <div className="container-fluid">
                    <a className="navbar-brand nav-link" target="_blank" href="https://mdbootstrap.com/docs/standard/">
                        <strong>MDB</strong>
                    </a>
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
                                <a className="nav-link" aria-current="page" href="#intro">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    Learn Bootstrap 5
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://mdbootstrap.com/docs/standard/" target="_blank">
                                    Download MDB UI KIT
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item me-3 me-lg-0">
                                <a
                                    className="nav-link"
                                    href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a
                                    className="nav-link"
                                    href="https://www.facebook.com/mdbootstrap"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a
                                    className="nav-link"
                                    href="https://twitter.com/MDBootstrap"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <a
                                    className="nav-link"
                                    href="https://github.com/mdbootstrap/mdb-ui-kit"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* <div id="intro" className="bg-image vh-100 shadow-1-strong">
                <video style={{ minWidth: "100%", minHeight: "100%" }} playsInline autoPlay muted loop>
                    <source className="h-100" src="https://mdbootstrap.com/img/video/Lines.mp4" type="video/mp4" />
                </video>
                <div className="mask">
                    <div className="container d-flex align-items-center justify-content-center text-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">Learn Bootstrap 5 with MDB</h1>
                            <h5 className="mb-4">Best & free guide of responsive web design</h5>
                            <a
                                className="btn btn-outline-light btn-lg m-2"
                                href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                                role="button"
                                rel="nofollow"
                                target="_blank"
                            >
                                Start tutorial
                            </a>
                            <a
                                className="btn btn-outline-light btn-lg m-2"
                                href="https://mdbootstrap.com/docs/standard/"
                                target="_blank"
                                role="button"
                            >
                                Download MDB UI KIT
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
        </header>
    );
}

export default Header;
