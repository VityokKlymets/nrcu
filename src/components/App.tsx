import React, { FC, useEffect } from "react"
import Player from "./player/Player"
import { Provider } from "react-redux"
import store from "./store"

interface IProps {}

const App: FC<IProps> = () => {
  return (
    <Provider store={store}>
      <Player />
    </Provider>
  )
}

export default App
