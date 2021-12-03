import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";
import {BookCard} from '../components/BookCard.js';
import {$host} from "../http";


export const BookPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [cat, setCat] = useState()
    const [pub, setPub] = useState()
    const [book, setBook] = useState()
    const [authors, setAuthors] = useState()
    const book_id = useParams().id_book

    const getBook = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/books/${book_id}`).then(res => {
                const book = res.data;
                setBook(book)
            })
        } catch (e){

        }
    }, [token, book_id, request ])

    const getAuthor = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/authors/${book_id}`).then(res => {
                const authors = res.data;
                setAuthors(authors)
            })

        } catch (e){

        }
    }, [token, book_id, request ])

    const getPub = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/publishers/${book_id}`).then(res => {
                const pubs = res.data;
                setPub(pubs)
            })

        } catch (e){

        }
    }, [token, book_id, request ])

    const getCat = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/category/${book_id}`).then(res => {
                const cats = res.data;
                setCat(cats)
            })

        } catch (e){

        }
    }, [token, book_id, request ])

    useEffect( () =>{
        getBook()
        getAuthor()
        getPub()
        getCat()
    }, [getBook, getAuthor, getPub, getCat])


    return(
        <div className="container">
            {!loading && pub && cat && authors && book && <BookCard book={book} authors={authors} pub={pub} cat={ cat} />}
        </div>
    )
}
