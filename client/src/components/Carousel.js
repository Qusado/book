import React from 'react'
import {Link} from "react-router-dom";
import {$authHost} from "../http";
import {baseUrl} from "./baseRoute";

export const Carousel =({ones, twos})=> {
    console.log(ones);
    return(
        <div className="row justify-content-md-center">
            <section className="pt-4 pb-2 ">
                <div className="container carousel_body">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mb-3">Горячие новинки приключений</h3>
                        </div>

                        <div className="col-12">
                            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">


                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${ones[0].id_book}`)}>
                                                    <div className="card card_main" >
                                                        <h5>{ones[0].title}</h5>
                                                        <div className="card-body">
                                                            <p>{ones[0].demo}</p>
                                                            <img className="im_carousel" src={baseUrl+`/${ones[0].images}`}/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${ones[1].id_book}`)}>
                                                    <div className="card h-100 card_main" >
                                                        <h5>{ones[1].title}</h5>
                                                        <div className="card-body">
                                                            <p>{ones[1].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${ones[1].images}`}/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${ones[2].id_book}`)}>
                                                    <div className="card h-100 card_main" >
                                                        <h5>{ones[2].title}</h5>

                                                        <div className="card-body">
                                                            <p>{ones[2].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${ones[2].images}`}/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>


                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${ones[3].id_book}`)}>
                                                    <div className="card h-100 card_main" >

                                                        <h5>{ones[3].title}</h5>
                                                        <div className="card-body">
                                                            <p>{ones[3].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${ones[3].images}`}/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="pt-4 pb-2 mb-4">
                <div className="container carousel_body">
                    <div className="row">
                        <div className="col-6 header">
                            <h3 className="mb-3">Фантастика</h3>
                        </div>

                        <div className="col-12">
                            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${twos[0].id_book}`)}>
                                                    <div className="card h-100 card_main" >
                                                        <h5>{twos[0].title}</h5>
                                                        <div className="card-body">
                                                            <p>{twos[0].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${twos[0].images}`}/>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${twos[1].id_book}`)}>
                                                    <div className="card h-100 card_main" >
                                                         <h5>{twos[1].title}</h5>
                                                        <div className="card-body">
                                                            <p>{twos[1].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${twos[1].images}`}/>

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${twos[2].id_book}`)}>
                                                    <div className="card h-100 card_main" >
                                                         <h5>{twos[2].title}</h5>
                                                        <div className="card-body">
                                                            <p>{twos[2].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${twos[2].images}`}/>

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <Link className="Nav_link" to={$authHost.get(`/books/${twos[3].id_book}`)}>
                                                    <div className="card h-100 card_main" >
                                                        <h5>{twos[3].title}</h5>
                                                        <div className="card-body">
                                                            <p>{twos[3].demo}</p>
                                                            <img className="im_carousel" src={baseUrl +`/${twos[3].images}`}/>

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
