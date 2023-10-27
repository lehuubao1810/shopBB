import { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);


    const login = async (email, password) => {
        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.token) {
                Cookies.set("token", data.token); // save token in cookie
                setUser(data.token);
                setError(null);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            if (response.ok) {
                setUser(null);
                setError(null);
            } else {
                setError("Logout failed");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, error, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}