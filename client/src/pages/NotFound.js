import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <>
            <div>Oops! Nothing here!</div>
            <Link to="/">Would you like to go home?</Link>
        </>
    );
}

export default NotFound;