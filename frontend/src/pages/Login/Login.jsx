import { useState } from "react";
import "./Login.css";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";

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
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit">
                        Login
                    </Button>

                </form>

            </div>
        </div>
    );
}

export default Login;