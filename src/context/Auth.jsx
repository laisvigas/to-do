import { useEffect, useState, createContext, useContext } from "react";
import { loggedUser, logoutUser } from "../firebase/authentication";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loggedUser((user) => {
            setUser(user);
            setAuthenticated(!!user);
            setLoading(false);
        });
    }, []);

    const logout = async () => {
        try {
            await logoutUser(); 
            setAuthenticated(false); 
            setUser(null); 
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
