import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode"

export const AuthContext = createContext()

const AuthProvider = (props) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const mutationR = useMutation(
        (body) => axios.post("http://127.0.0.1:8000/api/token/refresh/", body),
        {
            onSuccess(data) {
                setAuthTokens(data.data)
                setUser(jwt_decode(data.data.access))
                localStorage.setItem('authTokens', JSON.stringify(data.data))
            },
            onError(error) {
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem('authTokens')
                console.log(error)
            },
        }
    );

    function updateAccess() {
        console.log("Update token called")
        mutationR.mutate({refresh: authTokens.refresh })
    }

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens) {
                updateAccess()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens]) // eslint-disable-line

    return (
        <AuthContext.Provider value={{ user, setAuthTokens, setUser,authTokens }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;