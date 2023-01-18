import { createContext, ReactNode, useContext, useState } from "react"

type userContextType = {
    username: string,
    setUser: (username: string) => void
}

const userContextDefaultValues: userContextType = {
    username: '',
    setUser: (username: string) => {}
}

const UserContext = createContext<userContextType>(userContextDefaultValues)

export function useUser() {
    return useContext(UserContext)
}

type Props = {
    children: ReactNode
}

export function UserProvider({children}: Props) {
    const [username, setUsername] = useState<string>('')
    const setUser = (username: string) => {
        setUsername(username)
    }

    const value = {
        username,
        setUser
    }

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}

