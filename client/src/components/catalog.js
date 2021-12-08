import React from 'react'
import {Link} from "react-router-dom";
import {$authHost} from "../http";
import {baseUrl} from "./baseRoute";

export const Catalog =({books})=> {
   return(
       <>
               { books && books.map((book, index) => {
                   return(
                        <div className="col-md-3 mb-4">
                           <div className="card h-100 catalog" key={index}>
                               <Link className="Nav_link" to={`/books/${book.id_book}`}> <h6>{book.title}</h6></Link>
                               <div className="card-body">
                                   <div className="box_img">
                                       <img className="mini_book" src={baseUrl+`/${book.images}`}/>
                                   </div>
                                   <button className='btn but_price2'>{book.price} p.</button>
                               </div>
                           </div>
                        </div>
                   );
               })}
       </>
   )
}
