import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import JwtInformation from '../../helpers/jwtInformation';
import notification from '../../components/notification';

export function* infoRequest() {
    yield takeEvery('INFO_REQUEST', function*({ payload }) {
      const { history, instititution } = payload;
      console.log("sagaInformation"+instititution);
      const result = yield call(JwtInformation.infoRequest, instititution);
      if (!result.nom) {
       
        notification('error', result.error || result);
       // console.log(result.token);
      } else {
        yield put({
            type: actions.INFO_REQUEST_SUCCESS,
            payload: result,
            history
          });
          console.log("sagaInformationResultat"+result);
      }
    });
    
  }
  export function* infoRequestSuccess() {
    yield takeEvery(actions.INFO_REQUEST_SUCCESS, function*({ payload, history }) {
      yield localStorage.setItem('informations_compte', payload.nom);
          //  localStorage.setItem('id_institution', payload.instititution);
          //  console.log(payload.instititution)
     // history.push('/dashboard');
      notification('success', "Bienvenue"+ payload.nom  || payload);
    });
  }


export default function* rootSaga() {
    yield all([
      fork(infoRequest),
      fork(infoRequestSuccess)
    ]);
  }