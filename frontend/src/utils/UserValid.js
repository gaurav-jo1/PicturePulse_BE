import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const UserValid = () => {
    const {user} = useContext(AuthContext);
    return (
        user ? <div>{user.name}</div> : <div>No user</div>
    );
}

export default UserValid;