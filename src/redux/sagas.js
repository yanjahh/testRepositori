import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import registerSagas from './register/saga';
import  validationSagas from './validationCompte/saga';
//import informationSagas from './informations/saga';
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    registerSagas(),
    validationSagas(),
  //  informationSagas()
  ]);
}
