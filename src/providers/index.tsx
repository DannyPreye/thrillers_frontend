import React from "react";
import AuthContextProvider from "../contexts/AuthContext";

interface Props {
    children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
    return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default Providers;
