import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import api from "../../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.data.token);

            alert("Login Successful!");

            navigate("/dashboard");
        } catch (error) {
            alert(
                error.response?.data?.message || "Login Failed!"
            );
        } finally {
            setLoading(false);
        }
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

                    <Button type="submit" loading={loading}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;