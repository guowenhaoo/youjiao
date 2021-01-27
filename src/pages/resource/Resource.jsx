import React, { Component } from 'react'
import { Switch, Route} from "react-router-dom"

import AddResource from "./pages/AddResource"
import ResourceList from "./pages/ResourceList"
import EditResource from "./pages/EditResource"
import NotFound from "../notFount/NotFount"

export default class Resource extends Component {
    render() {
        return (
            <Switch>
                <Route path="/resource/edit-resource" component={EditResource}></Route>
                <Route path="/resource/add-resource" component={AddResource}></Route>
                <Route path="/resource" component={ResourceList}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        )
    }
}
