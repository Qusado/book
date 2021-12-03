import React, {useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {useHistory} from 'react-router-dom'
import {$host} from "../http";

export const AuthPage = () => {
    const message = useMessage()
    const history = useHistory()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()

    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerhandler = async () => {
        try {
            const fetched = await $host.post('/api/persons/register', {...form})
                .catch(error => message(error.message));
            const data = fetched.data;


            //const data = fetched.data;
            //console.log(data);
           // message(data.response.data.message);


            history.push('/login')
            // const data = await request('/api/persons/register', 'POST', {...form})
            // message(data.message)
            // history.push('/login')
        } catch (e) {
        }
    }

    return(
        <div className="container">
            <div className="row col-12 justify-content-center">
                <h5 className="text-center color_block">Регистрация</h5>
            </div>
            <div className="row justify-content-md-center">
                <div className="card col-8 offset-s3 fon_auth">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label b">Email address</label>
                            <input
                                type="email"
                                className="form-control _req _email"
                                aria-describedby="emailHelp"
                                id="email"
                                name="email"
                                onChange={changeHandler}
                                value={form.email}
                            />
                            <span className="" />
                        </div>
                        <span className="_err-message-span" />
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label b">Password</label>
                            <input type="password" className="form-control _req _password"
                                   name="password" id="password"
                                   onChange={changeHandler}
                                   value={form.password}/>
                            <span className="" />
                        </div>
                        <span className="_err-message-span" />

                    </div>
                    <button
                        className=" btn btn-light"
                        onClick={registerhandler}
                        disabled={loading}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>

    )
}
