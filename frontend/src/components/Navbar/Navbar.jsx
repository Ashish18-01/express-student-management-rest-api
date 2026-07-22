import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">StudentMS</h2>
            <ul className="nav-links">
                <li>
                    <NavLink to="/">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/students">Students</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;