import React, { Component } from 'react'
import { Switch,Route,Redirect } from "react-router-dom"

import AccountSetting from "./components/AccountSetting"
import MemberCount from "./components/MemberCount"

export default class Setting extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Redirect path="/setting" exact to="/setting/accountsetting"></Redirect>
                    <Route path="/setting/account" component={AccountSetting}></Route>
                    <Route path="/setting/member" component={MemberCount}></Route>
                </Switch>
            </div>
        )
    }
}
