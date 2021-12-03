import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";
import {$host} from "../http";

export const ShopPage = () =>{
    const {userId, token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState()


    const getBook = useCallback(async ()=>{
        try{

            const fetched = await $host.get('/api/books/order/myBooks', {
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
        getBook()

    }, [getBook])
    return(
        <div className="container">
            <h5 className="text-center color_block">Корзина</h5>
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
                                                <div className="col-6">
                                                    <button className='btn but_price2'>{book.price} p.</button>
                                                </div>
                                                <div className="col-6">
                                                    <button className='btn btn-light card_button col-6 '>Оплатить</button>
                                                </div>
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
