import { PlayerTypes, ISong, ISongList, PlayerActions } from "../types"

export const addList = (list: ISongList, name: string): PlayerActions => ({
  list,
  name,
  type: PlayerTypes.ADD_LIST
})

export const play = (song?: ISong, listName?: string): PlayerActions => ({
  listName,
  song,
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
