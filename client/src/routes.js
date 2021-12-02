import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ProfilePage}  from './pages/profile.page.js'
import { AuthPage } from './pages/auth.page.js'
import { LoginPage } from './pages/login.page.js'
import { MainPage } from './pages/main.page.js'
import {ShopPage} from "./pages/shop.page";
import {FavsPage} from "./pages/favs.page";
import {AboutPage} from "./pages/about.page";
import {CatalogPage} from "./pages/catalog.page";
import {StatPages} from "./pages/stat.page";
import {AddBookPage} from "./pages/addBook.page";
import {EditBookPage} from "./pages/editBook.page";
import {BookPage} from "./pages/book.page";
import {MyBooksPage} from "./pages/myBooks.page";
import {DeletePage} from "./pages/delete.page";
import {OrderPage} from "./pages/order.page";
import {ListPage} from "./pages/list.page";
import {Logout} from "./components/Logout";




export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route exact path="/me" component={ProfilePage}/>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/catalog" component={CatalogPage}/>
                <Route exact path="/about" component={AboutPage}/>
                <Route exact path="/statistic" component={StatPages}/>

                <Route exact path="/toOrder/:id_book" component={OrderPage}/>
                <Route exact path="/shop" component={ShopPage}/>

                <Route exact path="/toList/:id_book" component={ListPage}/>
                <Route exact path="/favs" component={FavsPage}/>

                <Route exact path="/book/add" component={AddBookPage}/>
                <Route exact path="/book/edit/:id_book" component={EditBookPage}/>
                <Route exact path="/book/delete/:id_book" component={DeletePage}/>

                <Route exact path="/books/:id_book" component={BookPage}/>
                <Route exact path="/profile/myBooks" component={MyBooksPage}/>


                <Logout exact/>

                <Redirect to="/profile"/>
            </Switch>
        )
    }


    return (
        <Switch>
            <Route path="/register" exact>
                <AuthPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/catalog" component={CatalogPage}/>
            <Route exact path="/about" component={AboutPage}/>
            <Route exact path="/statistic" component={StatPages}/>
            <Route exact path="/books/:id_book" component={BookPage}/>
            <Redirect to="/login" />
        </Switch>
    )
}
