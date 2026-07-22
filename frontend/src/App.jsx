import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                }
            />
            <Route
                path="/students"
                element={
                    <MainLayout>
                        <Students />
                    </MainLayout>
                }
            />
            <Route
                path="/profile"
                element={
                    <MainLayout>
                        <Profile />
                    </MainLayout>
                }
            />
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register />}
            />
        </Routes>
    );
}

export default App;