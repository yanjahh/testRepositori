import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Table from '../../components/uielements/table';
import Button from '../../components/uielements/button';
import notification from '../../components/notification';
import MiseAJourOffre from './ajoutOffre';
import JwtGetData from '../../helpers/jwtGetData';
import Moment from 'moment';


class emplois extends Component {
  state = { 
    emplois:{},
    tableAjout: false,
    tableEdit: false,
    tousEmplois: []
    
   };

   componentWillMount(){
    this.getTousEmplois();
  }

  getTousEmplois = () =>{
    JwtGetData.getTousEmplois(this.props.idInstitution).then(result => {
      if (result.error) {
        notification('error', 'Une erreur est survenue');
      } else {
      
        this.setState({ tousEmplois: result});
        console.log(this.state.tousEmplois);
      }
    });
  }

  addData = () => {
    this.setState({tableAjout: true})
  };
  
  render() {
const handleEditClick = (record, e) => {
      console.log(record)
       return <MiseAJourOffre />
     
}
const handleDeleteClick = (record, e) => {
     console.log('supprimer'+ record.titreEmploi)
    
}
   
const columnsEmplois = [
 {
   title: 'Titre emplois',
   dataIndex: 'titreEmploi',
   key: 'titreEmploi' ,
   width: 80,
 } ,
 {
   title: 'Contrat',
   dataIndex: 'typeContrat',
   key:'typeContrat',
   width: 80,
 },
 {
   title: 'Profils requis',
   key: 'profilsRequis',
   dataIndex: 'profilsRequis',
   width: 150,
 },
 {
   title: 'Description',
   key: 'description',
   dataIndex:'description',
   width: 250,
 },
 {
   title: 'Date limite',
   key:'dateLimite',
   dataIndex: 'dateLimite',
   width:110,
   render: (dateLimite)=>{
     return <p>{Moment(dateLimite).format('LL')} </p>
   }
 },
 {
     title: 'Status',
     key: 'statusEmploi',
     dataIndex:'statusEmploi',
     width: 70,
 },
 {
   title: 'Action' ,
   key: 'operator' ,
   width: 80,
   render: ( text , record) => {
   return (<div className="isoLeftRightComponent"><Button  onClick={e => handleEditClick(record, e)} icon="edit" size="default" ></Button>  
           <div style={{borderLeft: '1px solid #F2F2F2',height: '20px'}} ></div>
           <Button  onClick={e => handleDeleteClick(record, e)} icon="delete" size="default" ></Button> </div>)
   }
 }
   
];
    return (
      <LayoutContentWrapper>
        {this.state.tableAjout ? <MiseAJourOffre />:
         
        <LayoutContent style={{ height: '100vh' }}>
            <Button
            style={{marginTop:-20}}
             onClick={this.addData} >
              Ajouter offre emplois
            </Button>
            <Table
            style={{marginTop:30}}
            pagination={true}
            columns={columnsEmplois}
            dataSource={this.state.tousEmplois}
            scroll={{  y: 350 }}/>
         </LayoutContent>
      }
      </LayoutContentWrapper>
      
    );
  }
}

export default connect( state => ({
  idToken: state.Auth.toJS().idToken,
  idInstitution: localStorage.getItem('id_institution')
  }),
  {}
)(emplois);
