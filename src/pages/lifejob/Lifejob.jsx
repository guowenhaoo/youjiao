import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'

import LifeList from './pages/LifeList'
import AddLife from './pages/AddLift'
import EditLifeJob from './pages/EditLifeJob'
import NotFound from './../notFount/NotFount'

export default class Lifejob extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/lifejob/edit-lifejob"} component={EditLifeJob}/>
                <Route path={"/lifejob/add-life"} component={AddLife}/>
                <Route path={"/lifejob"} component={LifeList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}
