function Footer() {
    return (
        <div>
            <footer className="bg-light text-lg-start">
                <hr className="m-0" />
                <div className="text-center py-4 align-items-center">
                    <p>Follow MDB on social media</p>
                    <a
                        href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA"
                        className="btn btn-primary m-1"
                        role="button"
                        rel="nofollow"
                    >
                        <i className="fab fa-youtube" />
                    </a>
                    <a
                        href="https://www.facebook.com/mdbootstrap"
                        className="btn btn-primary m-1"
                        role="button"
                        rel="nofollow"
                    >
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a
                        href="https://twitter.com/MDBootstrap"
                        className="btn btn-primary m-1"
                        role="button"
                        rel="nofollow"
                    >
                        <i className="fab fa-twitter" />
                    </a>
                    <a
                        href="https://github.com/mdbootstrap/mdb-ui-kit"
                        className="btn btn-primary m-1"
                        role="button"
                        rel="nofollow"
                    >
                        <i className="fab fa-github" />
                    </a>
                </div>
                {/* Copyright */}
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2020 Copyright:
                    <a className="text-dark" href="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </a>
                </div>
                {/* Copyright */}
            </footer>
        </div>
    );
}

export default Footer;
