import React from "react";

import { Route, Routes as Switch } from "react-router";
import Loader from "../../components/Loader";

const Register = React.lazy(() => import("../auth/Register"));
const Login = React.lazy(() => import("../auth/Login"));
const ProtectedRoute = React.lazy(() => import("../../protected"));
const Routes = () => {
    return (
        <Switch>
            <Route path='/' element={null}>
                <Route index element={<Login />} />
                <Route
                    path='register'
                    element={
                        <React.Suspense fallback={<Loader />}>
                            <Register />
                        </React.Suspense>
                    }
                />
            </Route>
            <Route
                path='/dashboard/*'
                element={
                    <React.Suspense fallback={<Loader />}>
                        <ProtectedRoute />
                    </React.Suspense>
                }
            ></Route>
        </Switch>
    );
};

export default Routes;
