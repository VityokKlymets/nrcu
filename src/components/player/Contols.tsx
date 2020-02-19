import React from "react";

interface IProps {
  playing: boolean;
  onPlayClick();
  onPauseClick();
  onNextClick();
  onPrevClick();
}

function Contols({
  playing = false,
  onPlayClick,
  onPauseClick,
  onNextClick,
  onPrevClick
}: IProps) {
  function renderPlayBtn() {
    return (
      <button onClick={onPlayClick}>
        <i className="fas fa-play" />
      </button>
    );
  }
  function renderPauseBtn() {
    return (
      <button onClick={onPauseClick}>
        <i className="fas fa-pause" />
      </button>
    );
  }
  return (
    <div className="controls">
      <button onClick={onPrevClick}>
        <i className="fas fa-backward" />
      </button>
      {playing ? renderPauseBtn() : renderPlayBtn()}
      <button onClick={onNextClick}>
        <i className="fas fa-forward" />
      </button>
    </div>
  );
}

export default Contols;
