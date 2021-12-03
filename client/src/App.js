import React from 'react';
import 'materialize-css'
import { BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";

import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/Auth.Context";
import {NavBar} from "./components/navBar";
import {FootBar} from "./components/footer";



function App() {
  const {token, login, logout, userId} = useAuth()
    const isAuthenficated = !!token
    const routes = useRoutes(isAuthenficated)

  return (
      <AuthContext.Provider value={{
      token, login,logout, userId, isAuthenficated
      }}>
        <Router>
            <NavBar/>
            {isAuthenficated}

              <div className="content">
                  {routes}
              </div>
            <FootBar/>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
