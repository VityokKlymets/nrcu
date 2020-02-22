import { PlayerTypes, PlayerActions, IMediaItem, IMediaList } from "../types"

export interface IPlayerState {
  list: IMediaList
  current: IMediaItem
  play: boolean
  prevItem: IMediaItem
  listID: number
}
const initalState: IPlayerState = {
  list: [],
  listID: null,
  play: false,
  current: null,
  prevItem: null
}
export default (state = initalState, action: PlayerActions) => {
  switch (action.type) {
    case PlayerTypes.PLAY:
      if (!action.current) {
        return { ...state, play: true }
      }
      return {
        ...state,
        play: true,
        list: action.list,
        prevItem: state.current ? state.current : action.current,
        current: action.current,
        listID: action.listID
      }
    case PlayerTypes.PAUSE:
      return {
        ...state,
        play: false
      }
    case PlayerTypes.NEXT_SONG:
      const currentIndex = state.list.findIndex(el => el.idx === state.current.idx)
      if (currentIndex < 0) {
        return state
      }
      return {
        ...state,
        current: state.list[currentIndex + 1 < state.list.length ? currentIndex + 1 : 0],
        prevItem: state.current 
      }
    case PlayerTypes.PREV_SONG:
      const prevIndex = state.list.findIndex(el => el.idx === state.current.idx)
      if (prevIndex < 0) {
        return state
      }
      return {
        ...state,
        current: state.list[prevIndex - 1 >= 0 ? prevIndex - 1 : 0],
        prevItem: state.current 
      }
    default:
      return state
  }
}
