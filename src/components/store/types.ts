export interface IMediaItem {
  $element: JQuery<HTMLElement>
  idx:number
  title: string,
  metadata?:string,
  path: string,
}

export type IMediaList = Array<IMediaItem>

export enum PlayerTypes {
  ADD_LIST,
  PLAY,
  PAUSE,
  NEXT_SONG,
  PREV_SONG
}

interface IPlayAction {
  type: typeof PlayerTypes.PLAY
  list: IMediaList
  current: IMediaItem
  listID: number
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
