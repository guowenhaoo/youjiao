import React, { Component } from 'react'

import {Switch, Route} from 'react-router-dom'

import ActivitiesList from './pages/ActivitiesList'
import ActivitiesAdd from './pages/ActivitiesAdd'
import NotFount from '../notFount/NotFount'
import  ActivitiesEdit  from "./pages/ActivitiesEdit";

export default class Activities extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/activities/activities-edit"} component={ActivitiesEdit}/>
                <Route path={"/activities/add-activities"} component={ActivitiesAdd}/>
                <Route path={"/activities"} component={ActivitiesList}/>
                <Route component={NotFount}/>
            </Switch>
        )
    }
}
