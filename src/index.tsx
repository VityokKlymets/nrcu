import React from "react"
import { render } from "react-dom"
import Jquery from "jquery"
import App from "./components/App"
import AsyncPage from "./components/utils/async-page"
import setupElements from "./setupElements"

declare global {
  interface Window {
    $: typeof Jquery
    AUDIO_URL: string
  }
}

window.$ = Jquery

const js = () => {
  setupElements()
}

const onWindowLoad = () => {
  js()
  const async = new AsyncPage("page-root")
  async.addEventListener("pageloaded", () => js())
}

$(onWindowLoad)

render(<App />, document.querySelector("#react-root"))
