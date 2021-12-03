import React, {useCallback, useContext, useEffect} from "react";
import {useMessage} from "../hooks/message.hook";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {$host} from "../http";

export const OrderPage = () =>{
    const history = useHistory()
    const {userId, token} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()

    const book_id = useParams().id_book

    const order = useCallback(async ()=>{
        try{
            const fetched = await $host.post(`/api/books/toOrder/${book_id}`, {},{
                params: {
                    id_user: userId
                },
                headers:{
                    authorization:"Bearer "+token,
                }
            });
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
