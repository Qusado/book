import React from 'react'
import {Link} from "react-router-dom";
import {baseUrl} from  "./baseRoute"
export const BookCard =({book, authors, pub, cat})=> {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="div_book">
                        <div style={{overflow: 'hidden'}}>
                            <img className="book_img" src={baseUrl+`/${book.images}`}/>
                        </div>
                        <div className="row text-center">
                            <Link className="" to="#">
                                <button className='btn but_price m-1'>{book.price} p.</button>
                            </Link>
                            <Link className="" to={`/toOrder/${book.id_book}`}>
                                <button className='btn but_book btn-light m-1'>В корзину</button>
                            </Link>
                            <Link className="" to={`/toList/${book.id_book}`}>
                                <button className='btn but_book btn-light m-1'>Отложить</button>
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="col-md-7">
                    <div className="row">
                        <div className="book_text">
                            <h6>Название: {book.title}</h6>
                            <h6>Автор: {authors[0].fio}</h6>
                            <h6>Издательство:{pub[0].title_pub} </h6>
                        </div>
                        <div className="col-8 book_text tegs">

                            <h6>Теги:</h6>
                            <button className='btn btn-light m-1'> {cat[0].title_cat}</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="book_text">
                            <h6>Аннтотация: </h6>
                            <span>{book.demo} </span>

                            <h6>Комментарии: 0</h6>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
