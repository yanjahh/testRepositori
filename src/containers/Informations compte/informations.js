import React, { Component } from 'react';
import { connect } from 'react-redux';
import notification from '../../components/notification';
import { Layout } from 'antd';
import SingleContactView from '../../components/contacts/singleView';
import { ContactsWrapper } from './contacts.style';
import JwtGetData from '../../helpers/jwtGetData';
import columns from '../config';


const { Content } = Layout;
const {otherAttributes}= columns;
 /*
const attributesAdresse =[
    { title: 'localisationInstitution', value: 'localisationInstitution', type: 'localisationInstitution' }
];*/
 class information extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
    logo:'' ,
    nom:'',
    presentation:'',
    adresse:'',
    ville:'',
    dateCreation:'',
    nombreSalarie:'',
    email:'',
    siteWeb:'',
    telephone:'',
    domaine:'',
    typeEtablissement:'',
    institution: {}
    }
  }
  
  componentWillMount() {
    this.getAllData();
  }

  getAllData = () => {

    JwtGetData.getInfoInstitution(this.props.idInstitution).then(result => {
      if (result.error) {
        notification('error', result.error);
      } else {
        notification('success', "Bienvenue" +result.nom);
      
        this.setState({ institution: result});
        console.log(this.state.institution);
      }
    });
    /* <SingleContactView
                        contact={this.state.institution}
                        otherAttributes={otherAttributes}
                      />*/
  };
  render() {
    return (
      
            <ContactsWrapper
                className="isomorphicContacts"
                style={{ background: 'none' }}
              >
                <Layout className="isoContactBoxWrapper">
                
                  <Content className="isoContactBox">
                  <SingleContactView
                        contact={this.state.institution}
                        otherAttributes={otherAttributes}
                      />
                  </Content>
               
              </Layout>
            </ContactsWrapper>
    );
  }
}

export default connect( state => ({
    idToken: state.Auth.toJS().idToken,
    idInstitution: localStorage.getItem('id_institution')
  }),
  {}
)(information);
