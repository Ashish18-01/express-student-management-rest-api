import { useState } from "react";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        console.log(loginData);
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h1>StudentMS</h1>

                <p>Sign in to continue</p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;