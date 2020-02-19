export interface ISong {
  url: string
}
export interface ISongList {
  songs?: ISong[]
}
export enum PlayerTypes {
  ADD_LIST,
  PLAY,
  PAUSE,
  NEXT_SONG,
  PREV_SONG
}
export const DEFAULT_LIST_NAME = "default"
interface IPlayAction {
  type: typeof PlayerTypes.PLAY
  song?: ISong
  listName: string
}
interface IAddListAction {
  type: typeof PlayerTypes.ADD_LIST
  list: ISongList
  name: string
}

interface IPauseAction {
  type: typeof PlayerTypes.PAUSE
}

interface INextSongAction {
  type: typeof PlayerTypes.NEXT_SONG
}

interface IPrevSongAction {
  type: typeof PlayerTypes.PREV_SONG
}

export type PlayerActions =
  | IPlayAction
  | IPauseAction
  | INextSongAction
  | IPrevSongAction
  | IAddListAction
