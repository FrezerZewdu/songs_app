import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ByFilterType, StatType } from "../types/statsTypes";

const initialState: StatType = {
  totalSongs: 0,
  totalArtists: 0,
  totalGenres: 0,
  totalAlbums: 0,
  songsByGenre: [] as ByFilterType[],
  songsByArtist: [] as ByFilterType[],
  songsByAlbum: [] as ByFilterType[],
} 

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchAllStats: (state: StatType, { payload: stats }: PayloadAction<StatType>) => {
        state.totalSongs = stats.totalSongs;
        state.totalArtists = stats.totalArtists;
        state.totalGenres = stats.totalGenres;
        state.totalAlbums = stats.totalAlbums;
        state.songsByGenre = stats.songsByGenre;
        state.songsByAlbum = stats.songsByAlbum;
        state.songsByArtist = stats.songsByArtist;
    },
  }
})

export default statSlice.reducer;

export const {
  fetchAllStats
} = statSlice.actions;
