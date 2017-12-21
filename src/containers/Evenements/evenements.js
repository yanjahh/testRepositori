import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Button from '../../components/uielements/button';
import Table from '../../components/uielements/table';
import notification from '../../components/notification';
import AjoutEvenement from './AjoutEvenement';
import JwtGetData from '../../helpers/jwtGetData';


 class evenement extends Component {
  state = { 
    evenement:{},
    tableAjout: false,
    tousEvenements:[]
    
   };
  componentWillMount() {
    this.getTousEvenements();
  }
  getTousEvenements = () =>{
    JwtGetData.getTousEvenement(this.props.idInstitution).then(result => {
      if (result.error) {
        notification('error', 'Une erreur est survenue');
      } else {
      
        this.setState({ tousEvenements: result});
        console.log(this.state.tousEvenements);
      }
    });
  }

  addData = () => {
    this.setState({tableAjout: true})
  };
  
  render() {
const handleEditClick = (record, e) => {
      console.log(record)
     
}
const handleDeleteClick = (record, e) => {
     console.log('supprimer'+ record.nomEvenement)
    
}
   
const columnsEvenement = [
 {
   title: 'Nom Evenement',
   dataIndex: 'nomEvenement',
   key: 'nomEvenement' ,
   width: 100,
 } ,
 {
   title: 'Début Evenement',
   dataIndex: 'dateDebut',
   key:'dateDebut',
   width: 100,
 },
 {
   title: 'Genre Evenement',
   key: 'genreEvenement',
   dataIndex: 'genreEvenement',
   width: 100,
 },
 {
   title: 'Details',
   key: 'detailsEvenement',
   dataIndex:'detailsEvenement',
   width: 300,
 },
 {
     title: 'Status',
     key: 'statusEvenements',
     dataIndex:'statusEvenements',
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
        {this.state.tableAjout ? <AjoutEvenement />:
         
        <LayoutContent style={{ height: '100vh' }}>
            <Button 
            style={{marginTop:-20}}
            onClick={this.addData} >
              Ajouter evenement
            </Button>
            <Table
            style={{marginTop:30}}
            pagination={true}
            columns={columnsEvenement}
            dataSource={this.state.tousEvenements}
            scroll={{ y: 350 }}/>
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
)(evenement);
