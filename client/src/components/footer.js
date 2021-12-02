import React from 'react'

export const FootBar =()=> {
    return(
        <nav className="navbar fixed-bottom justify-content-center my-0">
            <div className="container justify-content-center">
                <div className="row col-12 justify-content-center">
                    <h3 className="text-center">Свяжитесь с нами</h3>
                </div>
                <div className="row ">
                     <div className="v_inst col mx-3" style={{backgroundImage: '/images/instapng.png'}}>
                    </div>
                    <div className="v_vk col mx-3" style={{backgroundImage: '/images/v43_2.png'}}>
                    </div>
                    <div className="v_you col mx-3" style={{backgroundImage: '/images/youtube-play--v1.png'}}>
                            </div>
                    <div className="v_tg col mx-3" style={{backgroundImage: '/images/telega.png'}}>
                    </div>
                </div>
                <div className="row col-12 justify-content-center">
                    <h5 className="text-center"> ©2021- lovebook - Ваш любимый магазин книг</h5>
                </div>
            </div>
        </nav>
    )
}
