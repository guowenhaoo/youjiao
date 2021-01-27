import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./pages/login/Login"
import Admin from "./pages/admin/Admin"
import NotFount from "./pages/notFount/NotFount"

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact component={ Login }></Route>
                    <Route path="/"  component={ Admin }></Route>
                    <Route exact component={ NotFount }></Route>
                </Switch>
            </Router>
        )
    }
}
export default App;
