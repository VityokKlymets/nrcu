import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AudioUtil from "../utils/audio"
import { nextSong, pause, prevSong, play } from "../store/actions/playerActions"
import { getPlayer } from "../store/selectors/playerSelectors"
import Contols from "./Contols"
import Progress from "./Progress"
import VolumeControl from "./VolumeControl"
import { IPlayerState } from "../store/reducers/playerReducer"
import "./player.sass"

const audio = new AudioUtil()

function Player() {
  const initialTime = "0:00"
  const playerState: IPlayerState = useSelector(getPlayer)
  const [progress, setProgress] = useState(0)
  const dispatch = useDispatch()
  const [currentTime, setCurrentTime] = useState(initialTime)
  const [duration, setDuration] = useState(initialTime)
  const loadHandler = () => {
    setDuration(audio.getDuration())
  }
  const pauseHandler = () => {
    dispatch(pause())
  }
  const playHander = () => {
    dispatch(play())
  }
  const endedHandler = () => {
    dispatch(prevSong())
  }
  const timeUpdateHandler = () => {
    setProgress(audio.getProgress())
    setCurrentTime(audio.getTime())
  }
  const progressHandler = (time: number) => {
    audio.setTime(time)
  }
  const volumeChangeHandler = value => {
    audio.setVolume(value)
  }
  const nextHandler = () => {
    dispatch(nextSong())
  }
  const prevHandler = () => {
    dispatch(prevSong())
  }
  useEffect(() => {
    audio.addEvent("loadedmetadata", loadHandler)
    audio.addEvent("ended", endedHandler)
    audio.addEvent("timeupdate", timeUpdateHandler)
    return () => {
      audio.removeEvent("loadedmetadata", loadHandler)
      audio.removeEvent("ended", endedHandler)
      audio.removeEvent("timeupdate", timeUpdateHandler)
    }
  })
  useEffect(() => {
    if (!playerState.current) {
      return
    }
    const { path, $element } = playerState.current
    if (playerState.play) {
      audio.play(path)
      if (playerState.prevItem) {
        playerState.prevItem.$element.removeClass("playing")
      }
      $element.addClass("playing")
    } else {
      audio.pause()
      $element.removeClass("playing")
    }
  }, [playerState.play, playerState.current])

  return (
    <div className={`player-main ${window.CHANNEL_ID ? `radio-${window.CHANNEL_ID}` : ""}`}>
      <img src="https://api.suspilne.radio/promin.jpg" alt="" className="player-image" />
      <Contols
        list={playerState.list}
        playing={playerState.play}
        onPauseClick={pauseHandler}
        onPlayClick={playHander}
        onNextClick={nextHandler}
        onPrevClick={prevHandler}
      />
      <Progress
        time={currentTime}
        duration={duration}
        progress={progress}
        onProgress={progressHandler}
      />
      <VolumeControl volume={audio.getVolume()} onVolumeChange={volumeChangeHandler} />
    </div>
  )
}

export default Player
