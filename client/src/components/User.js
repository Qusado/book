import React, {useContext} from 'react'

export const Use =({user})=> {
    return(
        <div>
            <img className="prof_img" src={`/images/users/${user.photo}`}/>
            <h5 className="card-title">@{user.name}</h5>
        </div>
    )
}
