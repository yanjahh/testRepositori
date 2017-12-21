//import jwtDecode from 'jwt-decode';
import SuperFetch from './superFetch';
import SuperFetchData from './superFethcData';

class JwtGetData {
  

  creationFormation = async formationInfo =>{
    if(!formationInfo){
      return{ error: 'Verifier les données entrées'}
    }
    return await SuperFetch.post('Nouveau/Formation',formationInfo)
    .then(response => response)
    .catch(error => ( {error: JSON.stringify(error) }));
  };

  creationEmplois = async emploisInfo =>{
    if(!emploisInfo){
      return{ error: 'Verifier les données entrées'}
    }
    return await SuperFetch.post('Nouveau/Offre',emploisInfo)
    .then(response => response)
    .catch(error => ( {error: JSON.stringify(error) }));
  };

  creationEvenement = async evenementInfo =>{
    if(!evenementInfo){
      return{ error: 'Verifier les données entrées'}
    }
    return await SuperFetch.post('Nouveau/Evenement',evenementInfo)
    .then(response => response)
    .catch(error => ( {error: JSON.stringify(error) }));
  };
//afficher domaine et categorie pour l'autocompletion 
  getInfoDomaine = () =>{
    var dataUrl = 'listeDomaine';
    return  SuperFetchData.getInfo(dataUrl)
    .then(response => response)
    .catch(error => ({ error: JSON.stringify(error)}));

  };   
  getInfoCategorie = () =>{
    var dataUrl = 'listeCategorie';
    return  SuperFetchData.getInfo(dataUrl)
    .then(response => response)
    .catch(error => ({ error: JSON.stringify(error)}));

  };
  
  // afficher information compte
  getInfoInstitution = async idInstitution => {
      var dataUrl = 'infoInstitutionConnecte/'+idInstitution+'';
    if (!idInstitution) {
      return { error: 'idInstitution vide' };
    }
    return await SuperFetchData.getInfo(dataUrl)
      .then(response => response)
      .catch(error => ({ error: JSON.stringify(error) }));
  };

  // afficher tous les  formations de cette institution
  getTousFormation = async idInstitution => {
    var dataUrl = 'afficheTousFormation/'+idInstitution+'';
  if (!idInstitution) {
    return { error: 'idInstitution vide' };
  }
  return await SuperFetchData.getInfo(dataUrl)
    .then(response => response)
    .catch(error => ({ error: JSON.stringify(error) }));
};

 // afficher tous les  evenements de cette institution
 getTousEvenement = async idInstitution => {
  var dataUrl = 'afficheTousEvenement/'+idInstitution+'';
if (!idInstitution) {
  return { error: 'idInstitution vide' };
}
return await SuperFetchData.getInfo(dataUrl)
  .then(response => response)
  .catch(error => ({ error: JSON.stringify(error) }));
};

// afficher tous les  offres de cette institution
getTousEmplois = async idInstitution => {
  var dataUrl = 'afficheTousEmplois/'+idInstitution+'';
if (!idInstitution) {
  return { error: 'idInstitution vide' };
}
return await SuperFetchData.getInfo(dataUrl)
  .then(response => response)
  .catch(error => ({ error: JSON.stringify(error) }));
};

 
}
export default new JwtGetData();
