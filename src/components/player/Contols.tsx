import React from "react"
import pauseIcon from "./assets/pause-icon.svg"
import playIcon from "./assets/play-icon.svg"
import nextIcon from './assets/right-arrow.svg'
interface IProps {
  playing: boolean
  onPlayClick()
  onPauseClick()
  onNextClick()
  onPrevClick()
}

function Contols({ playing = false, onPlayClick, onPauseClick, onNextClick, onPrevClick }: IProps) {
  function renderPlayBtn() {
    return (
      <button onClick={onPlayClick}>
        <img className='player-play-icon' src={playIcon} alt=""/>
      </button>
    )
  }
  function renderPauseBtn() {
    return (
      <button onClick={onPauseClick}>
         <img className='player-pause-icon' src={pauseIcon} alt=""/>
      </button>
    )
  }
  function renderNextBtn() {
    return (
      <button onClick={onNextClick}>
         <img className='player-next-icon' src={nextIcon} alt=""/>
      </button>
    )
  }
  function renderPrevBtn() {
    return (
      <button onClick={onPrevClick}>
         <img className='player-prev-icon' src={nextIcon} alt=""/>
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
