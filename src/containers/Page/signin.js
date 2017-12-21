import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Icon } from 'antd';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import logo from "../../image/logo.jpg";

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {

   const { login, history } = this.props;
    const userInfo = {
      eMail: document.getElementById('inputUserName').value || '',
      motDePasse: document.getElementById('inpuPassword').value || ''
    };
    console.log(userInfo);
    login({ history, userInfo });
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;
    const styleIcon={ fontSize: 13, color: '#08c' };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/signin">
              <img style={{paddingLeft:'30%'}} src={logo} alt="logo" />
              <br/><br/>
              <IntlMessages id="page.signInTitle"/>
              </Link>
            </div>
             <i> <IntlMessages id="page.signInSubtitle"/></i>

            <div className="isoSignInForm">
              <div className="isoInputWrapper"> 
                <Input 
                prefix={<Icon type="mail" style={styleIcon} />}
                  id="inputUserName"
                  size="large" 
                  placeholder="Email" 
                  />
              </div>

              <div className="isoInputWrapper">
                <Input 
                prefix={  <Icon type="lock" style={styleIcon} />}
                  id="inpuPassword"
                  size="large"
                  type="password"
                 placeholder="Mot de passe"      
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              

              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }),
  { login }
)(SignIn);

