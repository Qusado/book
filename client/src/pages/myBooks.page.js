import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";
import {Link} from "react-router-dom";
import { $host} from "../http";


export const MyBooksPage = () =>{
    const {userId, token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState()

    const getBooks = useCallback(async ()=>{
        try{
            const fetched = await $host.get('/api/books/profile/myBooks', {
                    params: {
                        id_user: userId
                    },
                    headers:{
                        authorization:"Bearer "+token,
                    }
                }
                ).then(res => {
                const books = res.data;
                setBooks(books)
            })
        } catch (e){

        }
    }, [token, request ])

    useEffect( () =>{
        getBooks()
    }, [getBooks])


    return(
        <div className="container">
            <h5 className="text-center color_block">Мои книги</h5>
            <div className="row">
                <div className="col-12">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {!loading && books && books.map((book, index) => {
                            return(
                                <div className="col-md-4 mb-3">
                                    <div className="card catalog" key={index}>
                                        <Link className="Nav_link" to={`/books/${book.id_book}`}> <h2>{book.title}</h2></Link>
                                        <div className="card-body">
                                            <p>{book.demo}</p>
                                            <div className="row">
                                                <Link className="Nav_link col-6"  to={`/book/delete/${book.id_book}`}>
                                                    <img className="logo del" src="/images/garbage.png"/>
                                                </Link>
                                                <Link className="Nav_link col-6 " to={`/book/edit/${book.id_book}`}>
                                                    <img className="logo edit" src="/images/edit.png"/>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}


                    </div>
                </div>

            </div>
        </div>
    )
}
