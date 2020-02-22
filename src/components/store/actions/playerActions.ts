import { PlayerTypes, IMediaItem, IMediaList, PlayerActions } from "../types"


export const play = (current?: IMediaItem, list?: IMediaList,listID?:number): PlayerActions => ({
  list,
  current,
  type: PlayerTypes.PLAY,
  listID
})

export const pause = (): PlayerActions => ({
  type: PlayerTypes.PAUSE
})

export const nextSong = (): PlayerActions => ({
  type: PlayerTypes.NEXT_SONG
})

export const prevSong = (): PlayerActions => ({
  type: PlayerTypes.PREV_SONG
})
