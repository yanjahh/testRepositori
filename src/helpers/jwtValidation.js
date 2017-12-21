import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';
class JwtValidation {

  validation = async validationInfo => {
    if (!validationInfo.eMail || !validationInfo.motDePasse || !validationInfo.code) {
        return { error: 'Veuiller remplir le champ' };
      }
      return await SuperFetch.post('institutions/confirmerCompte', validationInfo)
      .then(response => {
        return  this.checkExpirity(response.token, response.message);//console.log(response.message);
        });
  };
 
  checkExpirity = (token , message) => {
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
           expiredAt: new Date(expiredAt)
         };
       
     } catch (e) {
       return { error: 'Server Error' };
     }
   };
}
export default new JwtValidation();
