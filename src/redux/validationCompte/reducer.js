import { Map } from 'immutable';
import actions from './actions';
import JwtValidation from '../../helpers/jwtValidation';

const localToken = JwtValidation.checkExpirity(
  localStorage.getItem('id_token')
);
const initState = new Map({
  idToken: localToken.token || null
});
export default function validationReducer(state = initState, action) {
  switch (action.type) {
    case actions.VALIDATION_SUCCESS:
      return state.set('idToken', action.payload.token);
    default:
      return state;
  }
}

