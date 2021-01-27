import React, { Component } from 'react'
import gif from "./images/gif_404.gif"
export default class NotFount extends Component {
    render() {
        return (
            <div>
                <img style={{width:"100%" ,height:"100%"}} src={gif} alt=""/>
            </div>
        )
    }
}
