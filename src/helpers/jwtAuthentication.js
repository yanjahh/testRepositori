import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';
class JwtAuth {
  login = async userInfo => {
    if (!userInfo.eMail || !userInfo.motDePasse) {
      return { error: 'Veuiller remplir le champ' };
    }
    return await SuperFetch.post('Login/Institution', userInfo)
    .then(response => {
      return  this.checkExpirity(response.token, response.message,response.institution,response.type_etablissement);//console.log(response.message);
      });
  };
  
  checkDemoPage = async idInstitution => {
    if (!idInstitution) {
      return { error: 'idInstitution vide' };
    }
    return await SuperFetch.get('infoInstitutionConnecte/')
      .then(response => response)
      .catch(error => ({ error: JSON.stringify(error) }));
  };
  
  checkExpirity = (token, message, institution,type_etablissement) => {
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
          expiredAt: new Date(expiredAt)
        };
      
    } catch (e) {
      return { error: 'Server Error' };
    }
  };
}
export default new JwtAuth();
