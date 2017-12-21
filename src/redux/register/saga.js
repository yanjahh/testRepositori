import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
//import { push } from 'react-router-redux';
import actions from './actions';
import JwtRegistration from '../../helpers/jwtRegistration';
import notification from '../../components/notification';

export function* register() {
  yield takeEvery('REGISTER', function*({ payload }) {
    const { history, institutionInfo } = payload;
    const result = yield call(JwtRegistration.register, institutionInfo);
    if (result.token) {
      yield put({
        type: actions.REGISTER_SUCCESS,
        payload: result,
        history
      });
     // console.log(result.token);
    } else {
      notification('error', result.error || result);
      yield put({ type: actions.REGISTER_ERROR });
    }
  });
}

export function* registerSuccess() {
  yield takeEvery(actions.REGISTER_SUCCESS, function*({ payload, history }) {
    notification('success', payload.success || payload);
    yield localStorage.setItem('id_institution', payload.institution);
    yield localStorage.setItem('id_token', payload.token);
    yield localStorage.setItem('type_etablissement',payload.type_etablissement);
     history.push('/Validation/Compte');
  });
}

export function* registerError() {
  yield takeEvery(actions.REGISTER_ERROR, function*() {});
}
export default function* rootSaga() {
  yield all([
    fork(register),
    fork(registerSuccess),
    fork(registerError)
  ]);
}
