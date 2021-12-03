import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Carousel} from "../components/Carousel.js";
import axios from "axios";
import {$authHost, $host} from "../http";

export const MainPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const [ones, setOnes] = useState()
    const [twos, setTwos] = useState()




    const getOne = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/category/getOne/4`).then(res => {
                const book = res.data;
                setOnes(book);
                console.log(book)
            })
        } catch (e){

        }
    }, [token, request ])

    const getTwo = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/category/getOne/6`).then(res => {
                const book = res.data;
                setTwos(book);
                console.log(book)
            })
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
