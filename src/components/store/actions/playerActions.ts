import { PlayerTypes, IMediaItem, IMediaList, PlayerActions } from "../types"


export const play = (current?: IMediaItem, list?: IMediaList): PlayerActions => ({
  list,
  current,
  type: PlayerTypes.PLAY
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
