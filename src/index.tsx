import React from "react"
import ReactDOM from "react-dom"
import Jquery from "jquery"
import App from "./components/App"
import AsyncPage from "./components/utils/async-page"
import Preloader from './components/utils/preloader'

import setup from "./setup"

declare global {
  interface Window {
    $: typeof Jquery
    AUDIO_URL: string,
    CHANNEL_ID: number,
    async:AsyncPage
  }
}

window.$ = Jquery


const preloader = Preloader.getInstance()
const runJs = () => {
  $(".top-nav-menu").removeClass("open")
  setup()
}

runJs()

const async = new AsyncPage("page-root")

window.async = async

async.addEventListener("pageloaded", () => runJs())
async.addEventListener("pageloaded", () => preloader.hide())
async.addEventListener("pageloading", () => preloader.show())


ReactDOM.render(<App />, document.querySelector("#react-root"))
