import axios from "axios";
import { createContext, useState,useEffect } from "react";
import jwt_decode from "jwt-decode"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(false)

    // call logout

    function callLogout() {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }
    // Updating refresh token

    function updateAccess() {
        if (authTokens) {
        axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: authTokens.refresh
        })
          .then(function (response) {
                // console.log(response);
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                setLoading(true)
            })
            .catch(function (error) {
                console.log(error);
                callLogout()
        });
        }
    }


    // updating refresh token after revisit and access token expire time
    useEffect(() => {
        if (!loading) {
            updateAccess()
        }
        if (!authTokens) {
            setLoading(true)
        }
        let twentyMinutes = 1000 * 60 * 20
        let interval = setInterval(() => {
            if (authTokens) {
                updateAccess()
            }
        }, twentyMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading]) // eslint-disable-line

    return (
        <AuthContext.Provider value={{ user, setAuthTokens, setUser, authTokens, setLoading, callLogout, updateAccess, }}>
            {loading ? children : null }
        </AuthContext.Provider>
    )
}

export default AuthProvider;