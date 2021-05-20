import {takeLatest, call, put, select} from 'redux-saga/effects'
import {APP_LOGIN_USER, REQUEST_AUTH} from "./types";
import {fetchAuth} from '../requests/auth'
import {getLogged} from "./selectors";

export function* sagaWatcher () {
  yield takeLatest(REQUEST_AUTH, sagaAuthWorker)
}

function* sagaAuthWorker () {
  const payload = yield call(fetchAuth)
  const currentLogged = yield select(getLogged)
  if (currentLogged !== payload.logged) {
    yield put({type: APP_LOGIN_USER, payload})
  }
}
