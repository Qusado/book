import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Use} from '../components/User.js'

export const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState()
    const [user, setUser] = useState()

    const getBooks = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/profile/myBooks`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setBooks(fetched)
        } catch (e){

        }
    }, [token, request ])

    const getUser = useCallback(async ()=>{
        console.log(userId)
        try{
            const fetched = await request(`/api/persons/${userId}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            console.log('Data', fetched)
            setUser(fetched)
            console.log(user)
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
