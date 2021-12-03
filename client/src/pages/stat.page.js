import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {ExportCSV} from "../components/ExportExlsx";
import {$host} from "../http";


export const StatPages = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [persons, setPersons] = useState()
    const [owners, setOwners] = useState()

    const getPersons = useCallback(async ()=>{
        try{

            const fetched = await $host.get(`/api/books/statistic/owners_statistic`).then(res => {
                const pers = res.data;
                setPersons(pers)
            })

        } catch (e){}
    }, [token, request])

    // const getOwners = useCallback(async ()=>{
    //     try{
    //         const fetched = await $host.get(`/api/books/owners`).then(res=>{
    //             const owners = res.data;
    //             setOwners(owners)
    //         })
    //     } catch (e){ }
    // }, [token, request])


    useEffect( () =>{
        getPersons()
    }, [getPersons])
    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Пользователь</th>
                                <th scope="col">Кол-во книг</th>
                            </tr>
                        </thead>
                        <tbody>
                        { !loading && persons && persons.map((person, index) => {
                            return(
                                <tr>
                                    <td>{person.name}</td>
                                    <td>{person.books}</td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                </div>
                { !loading && persons &&
                <ExportCSV csvData={persons} fileName="Lox" />}
            </div>
            <div className="row">
            </div>

        </div>


    )
}
