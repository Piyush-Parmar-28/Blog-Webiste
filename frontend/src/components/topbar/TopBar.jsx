import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    return (
        <nav class="navbar fixed-top">
            <div class="container">
                <a class="navbar-brand">Eazy Blogs</a>

                <div className="d-flex flex-row align-items-center justify-content-center">
                    <ul className="d-flex flex-row m-0">
                        <li className="p-2">
                            <Link className="link" to="/">
                                HOME
                            </Link>
                        </li>
                        <li className="p-2">
                            <Link className="link" to="/write">
                                CREATE
                            </Link>
                        </li>
                        <li className="p-2" onClick={handleLogout}>
                            {user && "LOGOUT"}
                        </li>
                    </ul>

                    <div className="p-2">
                        {user ? (
                            <Link to="/settings">
                                <button type="button" class="btn btn-danger">
                                    <i class="bi bi-person-fill"></i>
                                </button>
                            </Link>
                        ) : (
                            <ul className="topList">
                                <li className="topListItem">
                                    <Link className="link" to="/login">
                                        LOGIN
                                    </Link>
                                </li>
                                <li className="topListItem">
                                    <Link className="link" to="/register">
                                        REGISTER
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
