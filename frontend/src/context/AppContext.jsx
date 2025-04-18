import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("access_token") || null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/get-user", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (data.success) {
                        setUserData(data.user);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setToken(null);
                    localStorage.removeItem("access_token");
                }
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, userData, setUserData }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;