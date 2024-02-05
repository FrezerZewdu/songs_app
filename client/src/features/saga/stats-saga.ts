import { put, call, takeLatest} from "redux-saga/effects";
import { StatType, GET_STATS } from "../types/statsTypes";
import { AxiosResponse } from "axios";
import baseAPI from "../../services/axios";
import { fetchAllStats } from "../slices/statSlice";

function* fetchStats () {
    try {
        const response: AxiosResponse<StatType> = yield call(baseAPI.get, "stats");
        console.log(response.data);
        yield put(fetchAllStats(response.data));
    } catch (error) {
        console.log(error);
    }
}

export function* watchFetchStats () {
    yield takeLatest(GET_STATS, fetchStats);
}