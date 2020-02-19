import React, { useRef, useState, MouseEvent, RefObject } from "react";

interface IProps {
  volume: number;
  onVolumeChange(value: number);
}

function checkValue(value: number): number {
  if (value > 0 && value <= 1) {
    return value;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
}

function VolumeControl({ volume = 0, onVolumeChange }: IProps) {
  const [mute, setMute] = useState(false);
  const [value, setValue] = useState(volume);
  const targetRef = useRef<HTMLDivElement>(null);
  const onClickHandler = (e: MouseEvent) => {
    if (!targetRef) {
      return;
    }
    const target = targetRef.current;
    const height = target.clientHeight;
    const offset = target.offsetTop - window.scrollY;
    const y = e.clientY - offset;
    const progress = 1 - y / height;
    const volumeValue = checkValue(progress);

    if (!mute) {
      onVolumeChange(volumeValue);
    }
    setValue(volumeValue);
  };
  const onMuteHandler = () => {
    if (onVolumeChange) {
      onVolumeChange(mute ? value : 0);
    }
    setMute(muteValue => !muteValue);
  };
  return (
    <div className={`volume-control ${mute ? "muted" : ""}`}>
      <div onClick={onMuteHandler} className="volume-icon">
        {mute ? (
          <i className="fas fa-volume-mute" />
        ) : (
          <i className="fas fa-volume-up" />
        )}
      </div>
      <div onClick={onClickHandler} className="volume-wrapper">
        <div ref={targetRef} className="volume-inner">
          <div className="volume-background" />
          <div
            className="volume-progress"
            style={{
              height: `${value * 100}%`
            }}
          />
          <div
            className="slider-handler"
            style={{
              bottom: `${value * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default VolumeControl;
