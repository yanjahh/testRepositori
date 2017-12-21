import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
//import { push } from 'react-router-redux';
import actions from './actions';
import JwtValidation from '../../helpers/jwtValidation';
import notification from '../../components/notification';

export function* validation() {
  yield takeEvery('VALIDATION', function*({ payload }) {
    const { history, validationInfo } = payload;
    //console.log(validationInfo);
    const result = yield call(JwtValidation.validation, validationInfo);
    if (result.token) {
      yield put({
        type: actions.VALIDATION_SUCCESS,
        payload: result,
        history
      });
     // console.log(result.token);
    } else {
      notification('error', result.error || result);
      yield put({ type: actions.VALIDATION_ERROR });
    }
  });
}

export function* validationSuccess() {
  yield takeEvery(actions.VALIDATION_SUCCESS, function*({ payload, history }) {
    yield localStorage.setItem('id_token', payload.token);
    history.push('/dashboard');
  });
}



export function* validationError() {
  yield takeEvery(actions.VALIDATION_ERROR, function*() {});
}
export default function* rootSaga() {
  yield all([
    fork(validation),
    fork(validationSuccess),
    fork(validationError)
  ]);
}
