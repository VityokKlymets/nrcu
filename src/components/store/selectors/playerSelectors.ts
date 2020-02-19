import { createSelector } from "reselect";

const playerSelector = state => state.player;
export const getPlayer = createSelector(playerSelector, player => player);
