// polyfill
import "../assets/styles/app.scss" 

import { Workbox } from "workbox-window"
import React from "react"
import ReactDOM from "react-dom"
import Config from "./Config"
import Editor from "./screens/Editor"
import Home from "./screens/Home"
import { Router } from "@reach/router"

ReactDOM.render(
    <Router>
        <Editor path="/" />
        <Home path="archive" /> 
        <Editor path="write/:documentId" />
    </Router>,
    document.getElementById("root")
)

if (Config.REGISTER_SERVICEWORKER) {
    let worker = new Workbox("/serviceworker.js")

    worker.addEventListener("installed", e => {
        console.info(`Service worker ${e.isUpdate ? "updated" : "installed"}`)
    })
    worker.register()
}