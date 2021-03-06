import React, {useState} from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)

    const userIsLoggedIn = !!token;

    const loginHadler = (token) => {
        setToken(token)
    }

    const logoutHandler = () => {
        setToken(null)
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHadler,
        logout: logoutHandler
    }

    return(<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>) 
}

export default AuthContext