import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Use} from '../components/User.js'
import {$authHost, $host} from "../http";

export const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState()
    const [user, setUser] = useState()

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

    const getUser = useCallback(async ()=>{
        try{
            const fetched = await $authHost.get(`/api/persons/${userId}`).then(res => {
                const user = res.data;
                setUser(user)
            })
        } catch (e){

        }
    }, [token, userId, request])

    useEffect( () =>{
        getBooks()
        getUser()
    }, [getBooks, getUser])

    return(
        <div className="container">
            <h5 className="text-center color_block">Профиль</h5>
            {/*</div>*/}
            <div className="prof">
                <div className="row">
                    <div className="line col-md-4">


                        <div>
                            {!loading && user && <Use user={user}/>}
                        </div>


                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-7 text">
                                    <h6>Мои интересы:</h6>
                                    <button className='btn btn-sm btn-success m-1'> Психология</button>
                                    <button className='btn btn-sm btn-info m-1'> Путешествия</button>
                                    <button className='btn btn-sm btn-light m-1'> Мотивация</button>
                                    <button className='btn btn-sm btn-dark m-1'> Фриланс</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="text">
                                   <h6> <Link className="link" to="/profile/myBooks">Мои книги</Link>: {!loading && books && books.length }</h6>
                                    <button className='btn btn-light m-1 add_but'><Link className="link" to="/book/add">Добавить книгу</Link> </button>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
