import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    // call logout

    function callLogout() {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }
    // Updating refresh token

    const mutationR = useMutation(
        (body) => axios.post("http://127.0.0.1:8000/api/token/refresh/", body),
        {
            onSuccess(data) {
                setAuthTokens(data.data)
                setUser(jwt_decode(data.data.access))
                localStorage.setItem('authTokens', JSON.stringify(data.data))
                setLoading(false)
            },
            onError(error) {
                callLogout()
                console.log(error)
            },
        }
    );

    function updateAccess() {
        if (authTokens) {
            mutationR.mutate({ refresh: authTokens.refresh })
        }
    }

    // updating refresh token after revisit and access token expire time

    useEffect(() => {
        if (loading) {
            updateAccess()
            setLoading(false)
        }
        let fourMinutes = 1000 * 60 * 15
        let interval = setInterval(() => {
            if (authTokens) {
                updateAccess()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading]) // eslint-disable-line

    return (
        <AuthContext.Provider value={{ user, setAuthTokens, setUser, authTokens, setLoading, callLogout, updateAccess, }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;