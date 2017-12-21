import { Map } from 'immutable';
import actions from './actions';
import JwtRegistration from '../../helpers/jwtRegistration';


const localToken = JwtRegistration.checkExpirity(
  localStorage.getItem('id_token')
);
const localInstitution = JwtRegistration.checkExpirity(
  localStorage.getItem('id_institution')
);
const initState = new Map({
  idToken: localToken.token || null,
  idInstitution: localInstitution.institution || null
});
export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.REGISTER:
      return initState;
    case actions.REGISTER_SUCCESS:
      return state
        .set('idInstitution', action.payload.institution) 
        .set('idToken',action.payload.token);

    default:
      return state;
  }
}
