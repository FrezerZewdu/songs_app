import { createAction, createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { SongType } from "../types/songTypes";
import { RootState } from "../../store/store";

interface SongsState extends EntityState<SongType, string> {
  status: "idle" | "loading" | "failed";
  error: string;
}

const songsAdapter = createEntityAdapter({
  selectId: (song: SongType) => song._id,
})

const initialState: SongsState = songsAdapter.getInitialState({
  status: 'idle',
  error: '',
});

const addSongs = createAction<SongType, 'songs/createSongAction/fullfilled'>('songs/createSongAction/fullfilled');
const songUpdate = createAction<SongType, 'songs/updateSongAction/fullfilled'>('songs/updateSongAction/fullfilled');
const songDelete = createAction<string, 'songs/deleteSongAction/fullfilled'>('songs/deleteSongAction/fullfilled');

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsAction: (state: SongsState) => {
      state.status = "loading";
    },
    getSongSuccessAction: (state: SongsState, { payload: songs}: PayloadAction<SongType[]>) =>{
      state.status = "idle";
      songsAdapter.setAll(state, songs);
    },
    getSongErrorAction: (state: SongsState, { payload: error}: PayloadAction<string>) => {
      state.status = "failed";
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSongs, (state: SongsState, {payload: song}: PayloadAction<SongType>) => {
        songsAdapter.addOne(state, song);
        state.status = 'idle';
      })
      .addCase(songUpdate, (state: SongsState, {payload: song}: PayloadAction<SongType>) => {
        songsAdapter.setOne(state, song);
      })
      .addCase(songDelete, (state: SongsState, {payload: songId}: PayloadAction<string>)=> { 
        songsAdapter.removeOne(state, songId);
      })
  },
})

export const {selectAll: selectSongs, selectById: selectSongsById } = 
  songsAdapter.getSelectors((state: RootState) => state.songs)



export const {
  getSongsAction,
  getSongSuccessAction,
  getSongErrorAction,
} = songsSlice.actions;

export default songsSlice.reducer;

