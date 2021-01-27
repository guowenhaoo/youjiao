import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'

import LiveList from './pages/LiveList'
import LiveAdd from './pages/LiveAdd'
import NotFound from '../notFount/NotFount'
import EditLive from "./pages/EditLive"

export default class Lives extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/live/add-live"} component={LiveAdd}/>
                <Route path={"/live/edit-live"} component={EditLive}/>
                <Route path={"/live"} component={LiveList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}
