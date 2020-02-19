import { PlayerTypes, ISong, PlayerActions, ISongList } from "../types"

export interface IPlayerState {
  currentList?: ISongList
  play: boolean
  song?: ISong
  lists: object
}
const initalState: IPlayerState = {
  currentList: {
    songs: []
  },
  lists: {},
  play: false,
  song: null
}
export default (state = initalState, action: PlayerActions) => {
  switch (action.type) {
    case PlayerTypes.PLAY:
      if (!action.song) {
        return { ...state, play: true }
      }
      return {
        ...state,
        list: action.listName ? state.lists[action.listName] : state.currentList,
        play: true,
        song: action.song
      }
    case PlayerTypes.PAUSE:
      return {
        ...state,
        play: false
      }
    case PlayerTypes.NEXT_SONG:
      const currentIndex = state.currentList.songs.findIndex(el => el.url === state.song.url)
      if (currentIndex < 0) {
        return state
      }
      return {
        ...state,
        song:
          state.currentList[
            currentIndex + 1 < state.currentList.songs.length ? currentIndex + 1 : 0
          ]
      }
    case PlayerTypes.PREV_SONG:
      const prevIndex = state.currentList.songs.findIndex(el => el.url === state.song.url)
      if (prevIndex < 0) {
        return state
      }
      return {
        ...state,
        current: state.currentList[prevIndex - 1 >= 0 ? prevIndex - 1 : 0]
      }
    case PlayerTypes.ADD_LIST:
      if (action.name in state.lists) {
        return state
      }
      return { ...state, lists: { ...state.lists, [action.name]: action.list } }
    default:
      return state
  }
}
