import React, {useCallback, useContext, useEffect} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";

export const OrderPage = () =>{
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()

    const book_id = useParams().id_book

    const order = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/toOrder/${book_id}`, 'POST', null, {
                Authorization : `Bearer ${token}`
            })
            console.log('Data', fetched)
            history.push('/catalog')

        } catch (e){

        }
    }, [])

    useEffect( () =>{

        order()
    }, [])

    return(
        <>
        </>
    )
}
