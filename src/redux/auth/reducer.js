import { Map } from 'immutable';
import actions from './actions';
import JwtAuthentication from '../../helpers/jwtAuthentication';


const localToken = JwtAuthentication.checkExpirity(
  localStorage.getItem('id_token')
);
const localInstitution = JwtAuthentication.checkExpirity(
  localStorage.getItem('id_institution')
);
const initState = new Map({
  idToken: localToken.token || null,
  idInstitution: localInstitution.institution || null
});
export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state
          .set('idInstitution', action.payload.institution) 
          .set('idToken',action.payload.token);
    
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
/*'idToken': action.payload.token,
'idInstitution': action.payload.institution*/
