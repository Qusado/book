import React, {useContext} from 'react';
import {baseUrl} from "./baseRoute";


export const Use =({user})=> {
    return(
        <div>
            <img className="prof_img" src={baseUrl+`/${user.photo}`}/>
            <h5 className="card-title">@{user.name}</h5>
        </div>
    )
}
