class AudioUtil {
    audio: HTMLAudioElement;
    constructor(src?: string) {
      this.audio = new Audio(src);
    }
  
    play(src) {
      if (!src) return;
      if (this.audio.src !== src) this.audio.src = src;
      this.audio.play();
    }
    pause() {
      this.audio.pause();
    }
    addEvent(type, func) {
      this.audio.addEventListener(type, func, true);
    }
    removeEvent(type, func) {
      this.audio.removeEventListener(type, func, true);
    }
    getProgress() {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
  
      return progress;
    }
    getDuration() {
      return this._timeToString(this.audio.duration);
    }
    getTime() {
      return this._timeToString(this.audio.currentTime);
    }
    getVolume() {
      return this.audio.volume;
    }
    setVolume(volume) {
      this.audio.volume = volume;
    }
    setTime(percent) {
      const time = this._percentToTime(percent);
      if (isFinite(time)) this.audio.currentTime = time;
    }
    _percentToTime(percent) {
      return this.audio.duration * (percent / 100);
    }
    _timeToString(time) {
      const minutes = Math.trunc(time / 60);
      const seconds = Math.trunc(time - minutes * 60);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
  }
  export default AudioUtil;