import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
    if (user) {
        axios.get("/profile");
    }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}