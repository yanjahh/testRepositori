import { Map } from 'immutable';
import actions from './actions';
import JwtInformation from '../../helpers/jwtInformation';

const localInfo = JwtInformation.checkExpirity(
  localStorage.getItem('informations_compte')
);
const initState = new Map({
    informationsCompte: localInfo || null
});
export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.INFO_REQUEST_SUCCESS:
      return state.set(
        'informationsCompte', action.payload
      );//console.log(action.payload.instititution)
    default:
      return state;
  }
}
