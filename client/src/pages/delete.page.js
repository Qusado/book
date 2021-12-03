import React, {useCallback, useContext, useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Link, useHistory, useParams} from "react-router-dom";
import {$host} from "../http";

export const DeletePage = () =>{
    const message = useMessage()
    const history = useHistory()
    const {token, userId} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()

    const book_id = useParams().id_book

    const deleteBook = useCallback(async ()=>{
        try{
            const fetched = await $host.delete(`/api/books/delete/${book_id}`);
            history.push('/profile/myBooks')
        } catch (e){

        }
    }, [])

    useEffect( () =>{
        deleteBook()
    }, [])




    return(
        <>

        </>
    )
}
