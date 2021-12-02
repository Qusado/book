import React, {useCallback, useContext, useEffect, useState} from 'react'
import { useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";

export const TabFilter = (props) => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [cats, setCats] = useState()
    const [checked, setChecked] = useState([])



    const getCats = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setCats(fetched)
             console.log('Data2', fetched)

        } catch (e){

        }
    }, [])

    const handleToggle = (item) => {
        const currentIndex = checked.indexOf(item);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(item)
        }else {
            newChecked.slice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }


    useEffect( () =>{
        getCats()

    }, [])


    return(

                 <div>
                    {!loading && cats && cats.map((cat, index) => {
                        return(
                            <div className="form-check">
                                <input className="form-check-input"
                                       type="checkbox"
                                       value={`${cat.id_cat}`}
                                       id="flexCheckDefault"
                                       key={index}
                                       checked={checked.indexOf(cat.id_cat) === -1? false : true}
                                       onChange={()=>handleToggle(cat.id_cat)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {cat.title_cat}
                                </label>
                            </div>
                        );
                    })}
</div>
)
}
