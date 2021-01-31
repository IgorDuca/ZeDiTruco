import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom"

import Landing from "./Pages/Landing"
import Jogar from "./Pages/Jogar"

export default function Routes() {
     return (
          <BrowserRouter>
               <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/jogar/:id" component={Jogar} />
               </Switch>
          </BrowserRouter>
     )
}