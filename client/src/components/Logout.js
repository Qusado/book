import React, {useContext} from 'react'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";

export const Logout =()=> {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logouthandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push("/")
    }
    if(auth.token){
        return(
            <a className="navbar-brand link" onClick={logouthandler} href="/">LogOut </a>
        )
    }else{
        return (
            <></>
        )
    }

}
