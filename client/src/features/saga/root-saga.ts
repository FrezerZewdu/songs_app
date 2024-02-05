import { all, fork } from "redux-saga/effects";
import { watchGetSong } from "./songSaga";
import { watchFetchStats } from "./stats-saga";

const rootSaga = function* () {
    yield all([
        fork(watchGetSong),
        fork(watchFetchStats),
    ]);
};

export default rootSaga;