import React from 'react'
import {Link} from "react-router-dom";
import {Logout} from "./Logout";
import {Search} from "./Search";
export const NavBar =()=>{
    return(
        <div className="fixed-top">
            <nav className="navbar my-0">
                <a className="navbar-brand"  href="#">
                    <div className="v42_250">
                        <div className="v42_251" style={{backgroundImage: '/images/v42_251.png'}}>

                        </div>
                    </div>
                    <Link className="Nav_link text_align" to="/">LOVEBOOK</Link>
                </a>
                <Search/>
                <a className="navbar-brand"  href="#">
                    <Link className="Nav_link" to="/favs"><div className="v_favs" style={{backgroundImage: '/images/heart.png'}}>
                    </div></Link>
                </a>
                <a className="navbar-brand"  href="#">

                    <Link className="Nav_link" to="/shop"><div className="v_shop" style={{backgroundImage: 'shjp.png'}}>
                    </div></Link>
                </a>
                <a className="navbar-brand"  href="#">

                    <Link className="Nav_link" to="/me"><div className="v_me" style={{backgroundImage: 'images/pers.png'}}>
                    </div></Link>
                </a>
                <Logout/>
            </nav>
            <div className="container-fluid">
                <nav className="nav nav-fill" id="light">
                    <a className="nav-item bar"> <Link className="Nav_link" to="/">ГЛАВНАЯ</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/catalog">КАТАЛОГ</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/statistic">СТАТИСТИКА</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/about">О НАС</Link></a>
                </nav>
            </div>
        </div>

    )

}
