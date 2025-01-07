import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// console.log(isAuthenticated());

const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/home"
      element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
    />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>

  );
};

export default AppRoutes;
