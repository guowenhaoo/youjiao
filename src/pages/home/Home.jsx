import React, { Component } from 'react'
import { Switch, Route} from "react-router-dom"

import HomeList from './pages/HomeList'
import SiteSetting from './pages/SiteSetting'
import NotFount from "../notFount/NotFount"

export default class home extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home/sitesetting" exact component={SiteSetting}></Route>
                <Route path="/home" exact component={HomeList}></Route>
                <Route component={NotFount}></Route>
            </Switch>
        )
    }
}
