export type SongType = {
    _id: string;
    title: string;
    album: string;
    artist: string;
    genre: string;
    createdAt: string;
    updatedAt: string;
}

export const SONGS = "songs";
export type SONGS = typeof SONGS;

export const GET_SONGS = `${SONGS}/getSongsAction`;
export type GET_SONGS = typeof GET_SONGS;

export const CREATE_SONG = `${SONGS}/createSongAction`;
export type CREATE_SONG = typeof CREATE_SONG;
export const CREATE_SONG_DONE = `${CREATE_SONG}/fullfilled`;

export const UPDATE_SONG = `${SONGS}/updateSongAction`;
export type UPDATE_SONG = typeof UPDATE_SONG;
export const UPDATE_SONG_DONE = `${UPDATE_SONG}/fullfilled`;

export const DELETE_SONG = `${SONGS}/deleteSongAction`;
export type DELETE_SONG = typeof DELETE_SONG;
export const DELETE_SONG_DONE = `${DELETE_SONG}/fullfilled`;