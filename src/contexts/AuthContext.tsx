import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UserType } from "../types/userType";

export const AuthContext = createContext({
    authenticated: false,
    userData:
        {
            first_name: "",
            last_name: "",
            email: "",
            token: "",
        } || null,

    login: (_userData: UserType) => {},

    logout: () => {},
});

interface AuthContextProviderProps {
    children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [authenticated, setAuthenticated] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setUserData] = useState<UserType | any>({
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        token: "",
    });

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        setAuthenticated(false);
        setUserData(null);
        window.location.href = "/";
    };

    const login = (userData: UserType) => {
        setAuthenticated(true);
        setUserData(userData);
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setAuthenticated(true);
            const data = Cookies.get("user");

            if (data) {
                try {
                    const user = JSON.parse(data);
                    setUserData({
                        ...user,
                        token,
                    });
                } catch (error) {
                    console.error("Error parsing user data:", error);
                }
            } else {
                console.error("User data is undefined");
            }
        } else {
            console.error("Token is undefined");
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userData,
                authenticated,
                logout,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
