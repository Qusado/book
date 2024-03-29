import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
import {$host} from "../http";
import {baseUrl} from "../components/baseRoute";


export const AddBookPage = () =>{

    const history = useHistory()
    const message = useMessage()
    const {userId, token} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()
    const [genres, setGenres] = useState()
    const [pubs, setPubs] = useState()
    const [cats, setCats] = useState()
    const [authors, setAuthors] = useState()


     const getAuthor = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/authors/`, {
                params: {
                    id_user: userId
                },
                headers:{
                    authorization:"Bearer "+token,
                }
            }).then(res=>{
                const auts = res.data;
                setAuthors(auts)
            })
        } catch (e){

        }
    }, [token, request ])

    const getPub = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/publishers/`, {
                params: {
                    id_user: userId
                },
                headers:{
                    authorization:"Bearer "+token,
                }
            }).then(res=>{
                const pubs = res.data;
                setPubs(pubs)
            })
        } catch (e){

        }
    }, [token, request ])

    const getCats = useCallback(async ()=>{
        try{
            const fetched = await $host.get(`/api/category/`, {
                params: {
                    id_user: userId
                },
                headers:{
                    authorization:"Bearer "+token,
                }
            }).then(res=>{
                const cats = res.data;
                setCats(cats)
            })
        } catch (e){

        }
    }, [token, request ])

    const getGen = useCallback(async ()=>{
        try{

            const fetched = await $host.get(`/api/genres/`, {
                params: {
                    id_user: userId
                },
                headers:{
                    authorization:"Bearer "+token,
                }
            }).then(res=>{
                const gens = res.data;
                setGenres(gens)
            })
        } catch (e){

        }
    }, [token,  request ])

    useEffect( () =>{
        message(error)
        clearError()
        getGen()
        getAuthor()
        getPub()
        getCats()

    }, [getGen, getAuthor, getPub, getCats,error, message, clearError])

    const addhandler = async () => {

        try {
            var form = document.querySelector('form');
            var formData = new FormData(form);
            console.log("form",...formData)
            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         Authorization : `Bearer ${token}`,
            //         ContentType : `multipart/form-data`,
            //         Accept : "application/json",
            //         type : "formData",
            //         user_id : userId
            //     },
            //     body: formData
            // };

            const fetched = await $host.post(`/api/books/`, formData,  {
                params: {
                    id_user: userId
                },
                headers:{
                    Authorization : `Bearer ${token}`,
                    ContentType : `multipart/form-data`,
                    Accept : "application/json",
                    type : "formData",
                    id_user : userId
                }
            }).catch(error=>{
                message(error.response.data.message)
            }).then(res =>{
                const data = res.data;
                message(data.message);
                if(data.status === 201){
                    history.push("/catalog");
                }
            })
            // const response = await fetch(baseUrl+`/api/books/`, requestOptions);
            // const data = await response.json();
            // message(data.message);
            //    if(response.status === 201){
            //        history.push("/catalog");
            //    }
        } catch (e) {

        }
    }

    return(
        <div className="container">
            <h5 className="text-center color_block">Добавление книги</h5>
            <div className="add_">

                <form className="row" id="form">
                    <div className="col-7">

                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10">
                                <input

                                    type="text"
                                    className="form-control form-control-sm"
                                    id="title"
                                    name="title"
                                />
                            </div>
                        </div>
                        <span className="_err-message-span" />
                        <div className="mb-3 row">
                            <label htmlFor="author" className="col-sm-2 col-form-label">Автор</label>
                            <div className="col-sm-10">
                                <select className="form-control form-control-sm"
                                         aria-label="multiple select example"
                                        id="author"
                                        name="author"
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
                        <span className="_err-message-span" />
                        <div className="mb-3 row">
                            <label htmlFor="pub" className="col-sm-2 col-form-label">Издательство</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control form-control-sm"
                                    aria-label="Default select example"
                                    id="pub"
                                    name="pub"
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

                        </div><span className="_err-message-span" />
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3 row">
                                    <label htmlFor="gen" className="col-sm-4 col-form-label">Жанры</label>
                                    <div className="col-sm-8">
                                        <select
                                            className="form-control form-control-sm"
                                            aria-label="Default select example"
                                            id="gen"
                                            name="gen"
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
                                <span className="_err-message-span" />
                                <div className="mb-3 row">
                                    <label htmlFor="cat" className="col-sm-4 col-form-label">Категория</label>
                                    <div className="col-sm-8">
                                        <select className="form-control form-control-sm"
                                                aria-label="Default select example"
                                                id="cat"
                                                name="cat"

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
                                <span className="_err-message-span" />
                                <div className="mb-3 row">
                                    <label htmlFor="price" className="col-sm-4 col-form-label">Цена</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            id="price"
                                            name="price"
                                        />
                                    </div>
                                </div>
                                <span className="_err-message-span" />
                            </div>
                            <div className="col-6">
                                <div className="mb-3 row">
                                    <label htmlFor="demo" className="col-sm-3 col-form-label">Аннотация</label>
                                    <div className="col-sm-9">
                                <textarea
                                    className="form-control form-control-sm"
                                    name="demo"
                                    id="demo"    rows="3"
                                >

                                </textarea>
                                    </div>
                                </div>
                                <span className="_err-message-span" />
                            </div>
                        </div>
                    </div>
                    <div className="col-5">

                        <div className="form-group">
                            <input type="file" className="form-control-file"
                                   name="images"
                                   id="images"
                                   required="required"

                            />
                        </div>
                        <div>
                            <img src="/images/45.png"
                                 className="add_img"
                            />
                        </div>

                        <div className="add">
                            <button
                                type="button"
                                className="btn btn-light m-1 add_but"
                                onClick={addhandler}
                                disabled={loading}
                            >
                                Добавить книгу
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
