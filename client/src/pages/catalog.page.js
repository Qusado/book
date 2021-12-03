import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";
import {Catalog} from "../components/catalog";
import {Filter} from "../components/filter";
import {$host} from "../http";


export const CatalogPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState([])
    const [Filters, setFilters] = useState({
        cats: [],
        price:[]
        }
    )
    const [searchResults, setSearchResults] = useState([]);

    const getBooks = useCallback(async ()=>{
        try{
            // const fetched = await request(`/api/books/`, 'GET', null, {
            //     Authorization : `Bearer ${token}`
            // });
            // setBooks(fetched)
            // setSearchResults(fetched)
            const fetched = await $host.get(`/api/books`).then(res => {
                const book = res.data;
                setBooks(book)
                setSearchResults(book)
            })

        } catch (e){

        }
    }, [token, request ])



    const showFilteredResult = (filt)=>{
        const filteredArray =[];
        books.filter(obj =>{
             filt['cats'].forEach(element =>
             {
                if(obj.cat_fk===element)
                {
                    filteredArray.push(obj);
                }
            })
        });
        setSearchResults(filteredArray);
    }




    const handleFilters = (filters, category) => {
        const  newFilters = {...Filters}
        newFilters[category] = filters
        showFilteredResult(newFilters)
        setFilters(newFilters)
    }


    useEffect( () =>{
        getBooks()
    }, [getBooks])



    return(
        <div className="container">

            <div className="row py-3">
                <div className="col-9">

                    <div className="row row-cols-1 row-cols-md-3 g-4" >

                        {!loading && books  ? (
                            <Catalog books={searchResults}/>
                        ) : !loading && books && searchResults ? (
                            <Catalog books={searchResults}/>
                            ):(
                                <h3></h3>
                        )
                        }

                </div>
                </div>
                <div className="col-3">
                    <Filter
                        handleFilters = {filters =>
                            handleFilters(filters, 'cats')
                           }
                    />
                </div>
            </div>
        </div>
    )
}
