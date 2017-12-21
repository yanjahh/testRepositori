
import { DateCell, ImageCell, LinkCell, TextCell,ButtonCell } from './helperCells';


const renderCell = (object, type, key) => {
    const value = object[key];
    switch (type) {
      case 'ImageCell':
        return ImageCell(value);
      case 'DateCell':
        return DateCell(value);
      case 'LinkCell':
        return LinkCell(value);
      case 'ButtonCell':
        return ButtonCell(value);
      default:
        return TextCell(value);
    }
  };
const otherAttributes = [
    { title: 'Nom', value: 'nom', type: 'nom' },
    { title: 'Présentation', value: 'presentation', type: 'presentation' }, 
    { title: 'Date création', value: 'dateCreation', type: 'dateCreation' },
    { title: 'Nombre Salarie', value: 'nombreSalarie', type: 'nombreSalarie' },
    {title:'Email', value:'email', type:'email'},
    {title:'Site Web', value:'siteWeb', type:'siteWeb'},
    {title:'Téléphone', value:'telephone', type:'telephone'},
    {title:'Domaine', value:'domaine', type:'domaine'},
    {title:'Type établissement', value:'typeEtablissement', type:'typeEtablissement'}
   ];
   


export  default { otherAttributes };