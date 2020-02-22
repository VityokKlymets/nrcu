import React, { CSSProperties } from "react"
import pauseIcon from "./assets/pause-icon.svg"
import playIcon from "./assets/play-icon.svg"
import nextIcon from "./assets/right-arrow.svg"
import { IMediaList } from "../store/types"
interface IProps {
  playing: boolean
  list: IMediaList
  onPlayClick()
  onPauseClick()
  onNextClick()
  onPrevClick()
}

function Contols({
  playing = false,
  onPlayClick,
  onPauseClick,
  onNextClick,
  onPrevClick,
  list
}: IProps) {
  function renderPlayBtn() {
    return (
      <button onClick={onPlayClick}>
        <img className="player-play-icon" src={playIcon} alt="" />
      </button>
    )
  }
  function renderPauseBtn() {
    return (
      <button onClick={onPauseClick}>
        <img className="player-pause-icon" src={pauseIcon} alt="" />
      </button>
    )
  }
  function renderNextBtn() {
    const length = list.length
    const style: CSSProperties = {
      opacity: length > 1 ? 1 : 0,
      pointerEvents: length > 1 ? "all" : "none"
    }
    return (
      <button style={style} onClick={onNextClick}>
        <img className="player-next-icon" src={nextIcon} alt="" />
      </button>
    )
  }
  function renderPrevBtn() {
    const length = list.length
    const style: CSSProperties = {
      opacity: length > 1 ? 1 : 0,
      pointerEvents: length > 1 ? "all" : "none"
    }
    return (
      <button style={style} onClick={onPrevClick}>
        <img className="player-prev-icon" src={nextIcon} alt="" />
      </button>
    )
  }
  return (
    <div className="controls">
      {renderPrevBtn()}
      {playing ? renderPauseBtn() : renderPlayBtn()}
      {renderNextBtn()}
    </div>
  )
}

export default Contols
