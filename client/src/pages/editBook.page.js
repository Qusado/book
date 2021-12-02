import React, {useCallback, useContext, useEffect, useState} from "react";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import { useHistory, useParams} from "react-router-dom";

export const EditBookPage = () =>{
    const message = useMessage()
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()
    const [genres, setGenres] = useState()
    const [pubs, setPubs] = useState()
    const [cats, setCats] = useState()
    const [authors, setAuthors] = useState()
    const [book, setBook] = useState()
    const [form, setForm] = useState({
        title: '', author: '', pub: '', gen:'', cat:'', price:'', demo:'', images:''
    })
    const [authorByBook, setAuthorByBook] = useState()
    const [genreByBook, setGenreByBook] = useState()

    const book_id = useParams().id_book

    const getBook = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setBook(fetched)
            console.log('Data', fetched)
         //
        } catch (e){

        }
    }, [])

    const getBook_author = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/authors/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setAuthorByBook(fetched)
            } catch (e){

            }

    }, [])

    const getBook_genre = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/genres/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setGenreByBook(fetched)
            console.log('Data', fetched)
            //
        } catch (e){

        }
    }, [])

    const getAuthor = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/authors/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setAuthors(fetched)
        } catch (e){

        }
    }, [])

    const getPub = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/publishers/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setPubs(fetched)

        } catch (e){

        }
    }, [])

    const getCats = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setCats(fetched)

        } catch (e){

        }
    }, [])

    const getGen = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/genres/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setGenres(fetched)


        } catch (e){

        }
    }, [])

    useEffect( () =>{

        getGen()
        getAuthor()
        getPub()
        getCats()
        getBook()
        message(error)
        clearError()
        getBook_author()
        getBook_genre()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const edithandler = async () => {
        try {
            const data = await request(`/api/books/update/${book_id}`, 'PUT', {...form})
            console.log('Data', data)
            history.push("/profile/myBooks");
        } catch (e) {}
    }


    return(
        <div className="container">
            <h5 className="text-center color_block">Редактирование книги</h5>

            <div>
                <div className="row">
                    <div className="col-7">

                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="title"
                                    name="title"
                                    onChange={changeHandler}
                                    value = {!loading && book && book.title}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="author" className="col-sm-2 col-form-label">Автор</label>
                            <div className="col-sm-10">
                                <select className="form-control form-control-sm"
                                        aria-label="select example"
                                        id="author"
                                        name="author"
                                        onChange={changeHandler}
                                        value = {!loading && authorByBook && authorByBook.y}
                                >
                                    {!loading && authors && authors.map((author, index) => {
                                        return(
                                            <option
                                                value={`${author.id_autor}`}
                                                key={index}
                                            >{author.fio}
                                            </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="pub" className="col-sm-2 col-form-label">Издательство</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control form-control-sm"
                                    aria-label="Default select example"
                                    id="pub"
                                    name="pub"
                                    onChange={changeHandler}
                                    value={!loading && book && book.pub_fk}
                                >
                                    {!loading && pubs && pubs.map((pub, index) => {
                                        return(
                                            <option
                                                value={`${pub.id_pub}`}
                                                key={index}
                                            >{pub.title_pub}
                                            </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="gen" className="col-sm-2 col-form-label">Жанры</label>
                            <div className="col-sm-5">
                                <select
                                    className="form-control form-control-sm"
                                    aria-label="Default select example"
                                    id="gen"
                                    name="gen"
                                    onChange={changeHandler}
                                    value = {!loading && genreByBook && genreByBook.id_genre}
                                >
                                    {!loading && genres && genres.map((genre, index) => {
                                        return(
                                            <option
                                                value={`${genre.id_genres}`}
                                                key={index}
                                            >{genre.title_genres}
                                            </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="cat" className="col-sm-2 col-form-label">Категория</label>
                            <div className="col-sm-5">
                                <select className="form-control form-control-sm"
                                        aria-label="Default select example"
                                        id="cat"
                                        name="cat"
                                        onChange={changeHandler}
                                        value={!loading && book && book.cat_fk}
                                    // onChange={e=>setBook(e.target.value)}

                                >
                                    {!loading && cats && cats.map((cat, index) => {
                                        return(
                                            <option
                                                value={`${cat.id_cat}`}
                                                key={index}>{cat.title_cat}
                                            </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">Цена</label>
                            <div className="col-sm-5">
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    id="price"
                                    name="price"
                                    onChange={changeHandler}
                                    value = {!loading && book && book.price}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="demo" className="col-sm-2 col-form-label">Аннотация</label>
                            <div className="col-sm-10">
                                <textarea
                                    className="form-control form-control-sm"
                                    name="demo"
                                    id="demo"    rows="3"
                                    onChange={changeHandler}
                                    value = {!loading && book && book.demo}
                                >

                                </textarea>
                            </div>
                        </div>

                    </div>
                    <div className="col-5">
                        <div className="mb-3 row">
                            <label htmlFor="formFile" className="col-sm-2 col-form-label">Обложка</label>
                            <div className="col-sm-10">
                                <input className="form-control form-control-sm"
                                       type="file"
                                       id="images"
                                       name="images"
                                       //value = {}
                                />
                            </div>
                        </div>
                        <div>
                            <img src="/images/45.png" className="add_img"/>
                        </div>
                        <div className="add">
                            <button
                                className="btn btn-light m-1 add_but"
                                onClick={edithandler}
                                disabled={loading}

                            >
                               Редактировать книгу
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
