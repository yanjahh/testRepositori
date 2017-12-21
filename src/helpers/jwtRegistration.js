import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';
class JwtRegister {
    register = async institutionInfo => {
    return await SuperFetch.post('institutions/Inscrire', institutionInfo)
    .then(response => {
      return  this.checkExpirity(response.message, response.token,response.institution,response.type_etablissement);//;
      });
  };
  checkExpirity = ( message, token,institution,type_etablissement) => {
   // var token = response.token
   if (!token) {
    return {
      error: message
    };
  }
  try {
    const profile = jwtDecode(token);
    const { expiredAt } = profile;
    
      return {
        ...profile,
        token,
        institution,
        type_etablissement,
        success: message,
        expiredAt: new Date(expiredAt)
      };
    
  } catch (e) {
    return { error: 'Server Error' };
  }
  };
}
export default new JwtRegister();
