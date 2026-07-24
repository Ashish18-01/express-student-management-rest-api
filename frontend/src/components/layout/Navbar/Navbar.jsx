import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <h2 className="logo">StudentMS</h2>

            <ul className="nav-links">

                <li>
                    <NavLink to="/dashboard">
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/students">
                        Students
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </li>

                {!token ? (
                    <li>
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                ) : (
                    <li>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </li>
                )}

            </ul>

        </nav>
    );
}

export default Navbar;