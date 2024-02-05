import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
    SongType,
    GET_SONGS,
    CREATE_SONG,
    CREATE_SONG_DONE,
    UPDATE_SONG,
    UPDATE_SONG_DONE,
    DELETE_SONG,
    DELETE_SONG_DONE 
} from "../types/songTypes";
import baseAPI from "../../services/axios";
import { getSongSuccessAction, getSongErrorAction } from "../slices/songsSlice";

function* getSongsSaga({ payload: genre}: PayloadAction<string>) {
    try {
        const queryGenre = genre === 'All' ? '' : genre;
        const response: AxiosResponse<SongType[]> = yield call(baseAPI.get, "songs", {
            params: {
                genre: queryGenre
            }
        });
        yield put(getSongSuccessAction(response.data));
    } catch (error: any) {
        yield put(getSongErrorAction(error));
    }
}

function* createSongSaga({ payload: song}: PayloadAction<SongType>) {
    try {
        const response: AxiosResponse<SongType> = yield call(baseAPI.post, "songs",{
            title: song.title,
            artist: song.artist,
            album: song.album,
            genre: song.genre,
        });
        yield put({type: CREATE_SONG_DONE, payload: response.data});
    } catch (error: any) {
        yield put(getSongErrorAction(error));
    }
}

function* updateSongSaga({ payload: song }: PayloadAction<SongType>) {
    try {
        const response: AxiosResponse<SongType> = yield call(baseAPI.put, `songs/${song._id}`, {
            title: song.title,
            artist: song.artist,
            album: song.album,
            genre: song.genre,
        });
        yield put({type: UPDATE_SONG_DONE, payload: response.data});
    } catch (error: any) {
        yield put(getSongErrorAction(error));
    }
}

function* deleteSongSaga({ payload: id}: PayloadAction<string>) {
    try {
        const response: AxiosResponse<String> = yield call(baseAPI.delete, `songs/${id}`);
        yield put({type: DELETE_SONG_DONE, payload: response.data});
    } catch (error: any) {
        yield put(getSongErrorAction(error));
    }
}
export function* watchGetSong() {
    yield takeLatest(GET_SONGS, getSongsSaga);
    yield takeLatest(CREATE_SONG, createSongSaga);
    yield takeLatest(UPDATE_SONG, updateSongSaga);
    yield takeLatest(DELETE_SONG, deleteSongSaga);
}