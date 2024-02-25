import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import DashboardRoutes from "../app/routes/DashboardRoutes";

const ProtectedRoute = () => {
    const { authenticated } = useContext(AuthContext);

    return authenticated ? <DashboardRoutes /> : <Navigate to='/' />;
};

export default ProtectedRoute;
