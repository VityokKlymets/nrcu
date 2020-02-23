import React, { useRef, MouseEvent } from "react"

interface IProps {
  volume: number
  onVolumeChange(value: number)
}

function VolumeControl({ volume = 0, onVolumeChange }: IProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const clickHandler = (e: MouseEvent) => {
    if (!targetRef) {
      return
    }
    const target = targetRef.current
    const width = target.clientWidth || target.offsetWidth
    const x = e.pageX - target.offsetLeft
    let newVolume = x / width
    newVolume = newVolume > 0 ? newVolume : 0
    if (onVolumeChange) {
      onVolumeChange(newVolume)
    }
  }
  return (
    <div ref={targetRef} className={`volume-control`}>
      <div onClick={clickHandler} className="volume-wrapper">
        <div
          className="volume-inner"  
          style={{
            width: `${volume * 100}%`
          }}
        >
        </div>
      </div>
    </div>
  )
}
export default VolumeControl
