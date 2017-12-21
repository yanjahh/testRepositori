import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';
class JwtInformation {

  infoRequest = async institution => {
    if (!institution) {
        return { error: 'pas id' };
      }
      return await SuperFetch.get('infoInstitutionConnecte', institution)
      .then(response => {
        return  this.checkExpirity(response, response.nom);//console.log(response.message);
        });
  };
 
  checkExpirity = (response, nom) => {
    // var token = response.token
     if (!nom) {
       return {
         error: 'erreur'
       };
     }
     try {
      // const profile = jwtDecode(token);
      // const { expiredAt } = profile;
       
         return {
          // ...profile,
          response,
         //  expiredAt: new Date(expiredAt)
         };
       
     } catch (e) {
       return { error: 'Server Error' };
     }
   };
}
export default new JwtInformation();
