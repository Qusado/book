import React, { useContext, useEffect, useState } from 'react'
import {NavLink, useHistory} from "react-router-dom";
import { AuthContext } from '../context/Auth.Context.js';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {$host} from "../http";


export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const message = useMessage()
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

    const loginhandler = async () => {
        try {
           const data = await $host.post('/api/persons/login',{...form})
               .catch(error => message(error.data.message))
               .then(response => auth.login(response.data.token, response.data.userId));
            history.push("/profile");
        } catch (e) {}

    }
    return(
        <div className="container">
            <div className="row col-12 justify-content-center">
                <h5 className="text-center color_block">Авторизация</h5>
            </div>
            <div className="row justify-content-md-center">
                <div className="card col-8 offset-s3 fon_auth">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label b">Email address</label>
                            <input type="email" className="form-control _req _email" name="email" id="email"
                                   aria-describedby="emailHelp" onChange={changeHandler}
                                   value={form.email}/>
                            <span className="" />
                        </div>
                        <span className="_err-message-span" />
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label b">Password</label>
                            <input type="password" className="form-control _req _password"
                                   name="password" id="password" onChange={changeHandler}
                                   value={form.password}/>
                            <span className="" />
                        </div>
                        <span className="_err-message-span" />
                        <div className="">нет аккаунта? <NavLink to="/register">Зарегистрируйтесь</NavLink></div>

                    </div>
                    <button
                        className="btn btn-light"
                        onClick={loginhandler}
                        disabled={loading}>
                        Login
                    </button>
                </div>
            </div>

        </div>
    )
}
