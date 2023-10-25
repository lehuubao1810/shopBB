import { useContext, createContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
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

export default AuthContextProvider;