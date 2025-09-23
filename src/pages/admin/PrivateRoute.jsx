import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");
    const expiry = localStorage.getItem("expiry");

    // Nếu có token và chưa hết hạn thì cho vào
    if (token && expiry && Date.now() < parseInt(expiry)) {
        return children;
    }

    // Nếu chưa login hoặc token hết hạn → quay về trang login
    return <Navigate to="/admin/adminLogin" replace />;
};

export default PrivateRoute;
