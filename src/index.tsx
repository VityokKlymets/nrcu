import React from "react"
import { render } from "react-dom"
import Jquery from "jquery"
import App from "./components/App"
import AsyncPage from "./components/utils/async-page"
import setup from "./setup"

declare global {
  interface Window {
    $: typeof Jquery
    AUDIO_URL: string,
    CHANNEL_ID: number
  }
}

window.$ = Jquery

const runJs = () => {
  $(".top-nav-menu").removeClass("open")
  setup()
}

const onWindowLoad = () => {
  runJs()
  const async = new AsyncPage("page-root")
  async.addEventListener("pageloaded", () => runJs())
}

$(onWindowLoad)

render(<App />, document.querySelector("#react-root"))
