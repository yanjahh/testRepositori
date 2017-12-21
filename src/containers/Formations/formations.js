import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Button from '../../components/uielements/button';
import Table from '../../components/uielements/table';
import notification from '../../components/notification';
import AjoutFormation from './AjoutFormation';
import JwtGetData from '../../helpers/jwtGetData';

 class formation extends Component {
  state = { 
    formation:{},
    tableAjout: false,
    tousFormations:[]
    
   };

  componentWillMount() {
    this.getTousFormations();
  }

  getTousFormations = () => {
    JwtGetData.getTousFormation(this.props.idInstitution).then(result => {
      if (result.error) {
        notification('error', 'Une erreur est survenue');
      } else {
        //notification('success', "ok");
      
        this.setState({ tousFormations: result});
      //  console.log(this.state.tousFormations);
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
      console.log('supprimer'+ record.nomFiliere)
     
}
    
const columnsFormation = [
  {
    title: 'Nom Formation',
    dataIndex: 'nomFiliere',
    key: 'nomFiliere' ,
    width: 100,
  } ,
  {
    title: 'Type formation',
    dataIndex: 'typeFormation',
    key:'typeFormation',
    width: 100,
  },
  {
    title: 'Description formation',
    key: 'descriptionFormation',
    dataIndex: 'descriptionFormation',
    width: 300,
  },
  {
    title: 'Lieu formation',
    key: 'lieuDeFormation',
    dataIndex:'lieuDeFormation',
    width: 100,
  },
  {
      title: 'Status',
      key: 'statusFormation',
      dataIndex:'statusFormation',
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
        {this.state.tableAjout ? <AjoutFormation />:
         
          <LayoutContent style={{ height: '100vh' }}>
            <Button
            style={{marginTop:-20}}
             onClick={this.addData} >
              Ajouter formation
            </Button>
          <Table
        style={{marginTop:30}}
        pagination={true}
        columns={columnsFormation}
        dataSource={this.state.tousFormations}
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
)(formation);
