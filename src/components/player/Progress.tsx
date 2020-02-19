import React, { Fragment, useRef, RefObject, MouseEvent } from "react";
interface IProps {
  progress: number;
  time: string;
  duration: string;
  onProgress?(progress: number);
}
function Progress({
  progress = 0,
  time = "",
  duration = "",
  onProgress = null
}: IProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const clickHandler = (e: MouseEvent) => {
    if (!targetRef) {
      return;
    }
    const target = targetRef.current;
    const width = target.clientWidth || target.offsetWidth;
    const x = e.pageX - target.offsetLeft;
    let newTime = (x / width) * 100;
    newTime = newTime > 0 ? newTime : 0;
    if (onProgress) {
      onProgress(newTime);
    }
  };
  return (
    <Fragment>
      <div className="time">{time}</div>
      <div ref={targetRef} onClick={clickHandler} className="progress-wrapper">
        <div className="background" />
        <div
          className="bar"
          style={{
            width: `${progress}%`
          }}
        />
        <div
          className="handler"
          style={{
            left: `${progress}%`
          }}
        />
      </div>
      <div className="duration">{duration}</div>
    </Fragment>
  );
}

export default Progress;
