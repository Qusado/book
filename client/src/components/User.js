import React, {useContext} from 'react'

export const Use =({user})=> {
    return(
        <div>
            <img className="prof_img" src={process.env.REACT_APP_API_URL+`/${user.photo}`}/>
            <h5 className="card-title">@{user.name}</h5>
        </div>
    )
}
