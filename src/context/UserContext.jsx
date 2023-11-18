import { createContext, useState } from "react";

export const UserAuthContext = createContext(null);

export default function UserContext({children}) {
    const [user, setUser] = useState(null);

    return (
        <UserAuthContext.Provider value={{user,setUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}