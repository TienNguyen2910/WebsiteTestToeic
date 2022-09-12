import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>Body</h1>
            <Link to="./login">Login</Link>
            <br />
            <Link to="./test">Test</Link>
        </>
    );
}

export default Home;
