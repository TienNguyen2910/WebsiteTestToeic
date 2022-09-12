import { Link } from "react-router-dom";
import style from "./Home.module.css";

function Home() {
    return (
        <>
            {/*Main layout*/}
            <main className="mt-5">
                <div className="container">
                    {/*Section: Content*/}
                    <section>
                        <div className="row">
                            <div className="col-md-6 gx-5 mb-4">
                                <div
                                    className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
                                    data-mdb-ripple-color="light"
                                >
                                    <img src="https://mdbootstrap.com/img/new/slides/031.jpg" className="img-fluid" />
                                    <a href="#!">
                                        <div
                                            className="mask"
                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6 gx-5 mb-4">
                                <h4>
                                    <strong>Facilis consequatur eligendi</strong>
                                </h4>
                                <p className="text-muted">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur
                                    eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum
                                    sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.
                                </p>
                                <p>
                                    <strong>Doloremque vero ex debitis veritatis?</strong>
                                </p>
                                <p className="text-muted">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod itaque voluptate
                                    nesciunt laborum incidunt. Officia, quam consectetur. Earum eligendi aliquam illum
                                    alias, unde optio accusantium soluta, iusto molestiae adipisci et?
                                </p>
                            </div>
                        </div>
                    </section>
                    {/*Section: Content*/}
                    <hr className="my-5" />
                    {/*Section: Content*/}
                    <section className="text-center">
                        <h4 className="mb-5">
                            <strong>Facilis consequatur eligendi</strong>
                        </h4>
                        <div className="row">
                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card">
                                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                        <img
                                            src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                                            className="img-fluid"
                                        />
                                        <a href="#!">
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                            />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                        <a href="#!" className="btn btn-primary">
                                            Button
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="card">
                                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                        <img
                                            src="https://mdbootstrap.com/img/new/standard/nature/023.jpg"
                                            className="img-fluid"
                                        />
                                        <a href="#!">
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                            />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                        <a href="#!" className="btn btn-primary">
                                            Button
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="card">
                                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                        <img
                                            src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                                            className="img-fluid"
                                        />
                                        <a href="#!">
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                            />
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                        <a href="#!" className="btn btn-primary">
                                            Button
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*Section: Content*/}
                    <hr className="my-5" />
                </div>
            </main>
            {/*Main layout*/}
        </>
    );
}

export default Home;
