import React from 'react';
import { Link,  } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ResetPasswordStyleWrapper from './resetPassword.style';
import logo from "../../image/logo.jpg";



class ValidationCompte extends React.Component {
  state = {
    redirectToReferrer: false,
    loading: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  render() {
    const style ={
      marginLeft: '75px',
      width:'100%'
    }
    
    return (
      <ResetPasswordStyleWrapper className="isoResetPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/Validation/Compte">
                <img style={{paddingLeft:'30%'}} src={logo} alt="logo" />
                <br/><br/>
              <IntlMessages id="page.validationTitle"/>
              </Link>
            </div>

            <div className="isoFormHeadText">
              
              <p>
                <IntlMessages id="page.validationDescription" />
              </p>
              <br/>
            </div>

            <div className="isoResetPassForm">
              

              <div className="isoInputWrapper isoOtherLogin">
                <Button type="primary btnGooglePlus" >
                 <a href="#" ><IntlMessages id="page.ValidationSave" />
                 </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ResetPasswordStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }),
  {  }
)(ValidationCompte);


