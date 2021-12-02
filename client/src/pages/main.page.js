import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Carousel} from "../components/Carousel.js";

export const MainPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const [ones, setOnes] = useState()
    const [twos, setTwos] = useState()

    const getOne = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/getOne/4`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setOnes(fetched)
        } catch (e){

        }
    }, [token, request ])

    const getTwo = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/getOne/6`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setTwos(fetched)
        } catch (e){

        }
    }, [token, request ])



    useEffect( () =>{
        getOne()
        getTwo()

    }, [getOne, getTwo])
    return(

        <div className="container">
            {!loading && ones && twos &&<Carousel ones={ones} twos={twos}/>}
        </div>
    )
}
