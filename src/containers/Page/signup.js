import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import RegisterActions from '../../redux/register/actions';
import { Input, AutoComplete, Select} from 'antd';
import Form from '../../components/uielements/form';
import Checkbox from '../../components/uielements/checkbox';
import DatePicker from '../../components/uielements/datePicker';

const {register } = RegisterActions;
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
const dataSource = ['Antananarivo', 'Antsirabe','Antsiranana','Fianarantsoa','Toliara', 'Toamasina','Mahajanga' ];
const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
);

class SignUp extends React.Component {
  state = {
    redirectToReferrer: false,
    typeInscriptionEntreprise: true
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  
  handleSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const { register, history } = this.props
    this.props.form.validateFieldsAndScroll((err, info) => {
      if (!err) {
       const date = info.dateCreation.format("YYYY-MM-DD");
        const institutionInfo = {
          nomInstitution   : info.nomInstitution,
          logo             : info.logo,
          presentation     : info.presentation,
          adresse          : info.adresse,
          ville            : info.ville,
          dateCreation     : date,
          nombreSalarie    : info.nombreSalarie,
          typeEtablissement: info.typeEtablissement,
          email            : info.email,
          motDePasse       : info.confirm,
          siteWeb          : info.siteWeb,
          telephone        : info.telephone,
          domaine          : info.domaine
        }
        register({ history, institutionInfo });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Les deux mots de passes que vous avez entré ne sont pas identiques!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSignupEntreprise = () => {
    this.setState({typeInscriptionEntreprise:true})
  };
  handleSignupEtablissement = () => {
    this.setState({typeInscriptionEntreprise:false})
  }
 
  render() {
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'dd/MM/YYYY';
    const styleSelect ={
      color:'rgb(70, 112, 162)'
    }
    const  styleIcon={ fontSize: 13, color: '#08c' };
    return(
    <div className="isoSignUpPage">
      
        <div className="isoSignUpContent">
                <div style={{marginLeft:'205px',marginTop:'-5px'}}>
                  <Link to="/signin">
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </Link>
                </div>
                <div className="isoLogoWrapper">
                  <Link to="/signup">
                  {this.state.typeInscriptionEntreprise ? <IntlMessages id="page.signUpTitle1" />:<IntlMessages id="page.signUpTitle2" />  }  
                  </Link>
                </div>
                <div className="isoSignUpForm isoLeftRightComponent" >
                    <Button onClick={this.handleSignupEntreprise}>
                      <IntlMessages id="page.signUpEntreprise" />
                    </Button>
                      <Button onClick={this.handleSignupEtablissement} >
                        <IntlMessages id="page.signUpEtablissement"  />
                    </Button>
                </div>
            <br/>
          <Form onSubmit={this.handleSubmit}>
              
                  <div className="isoInputWrapper">
                      <FormItem hasFeedback>
                        {getFieldDecorator('nomInstitution', {
                          rules: [
                            
                            {
                              required: true,
                              message: 'Information obligatoire!'
                            }
                          ]
                        })(<Input  name="nomInstitution" id="nomInstitution"  placeholder={ this.state.typeInscriptionEntreprise ?  "Nom Entreprise" : "Nom Etablissement"  } />)}
                      </FormItem>
                  </div>
                    
                  <div className="isoInputWrapper">
                    <FormItem  hasFeedback>
                            {getFieldDecorator('presentation', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Information obligatoire!'
                                }
                                ]
                            })(<TextArea 
                                    name="presentation" 
                                    id="presentation"
                                    placeholder={ this.state.typeInscriptionEntreprise ?  "Présentation de votre entreprise" : "Présentation de votre établissement"  }
                                    rows={4}
                                    />)}
                        </FormItem>
                  </div>

                  <div className="isoInputWrapper">
                    <FormItem  hasFeedback>
                        {
                          getFieldDecorator('logo')(<Input name="logo" 
                                                      id="logo"
                                                      type="file"
                                                        placeholder="logo"
                                                        accept=".png, .jpg, .jpeg" />)}
                        </FormItem>
                  </div>
                    
                  <div className="isoInputWrapper">
                        <FormItem  hasFeedback>
                            {
                              getFieldDecorator('dateCreation',{
                                rules: [
                                {
                                    required: true,
                                    message: 'Information obligatoire!'
                                }
                                ]
                            })(<DatePicker style={{width:397}} format={dateFormat} 
                                                              name="dateCreation" 
                                                              id="dateCreation"
                                                              placeholder={ this.state.typeInscriptionEntreprise ? "Date création entreprise" : "Date création établissement"}  />)
                                                              }
                        </FormItem>
                  </div>
                    
                  <div className="isoInputWrapper isoLeftRightComponent">
                        <FormItem  hasFeedback>
                            {getFieldDecorator('adresse')(<Input style={{width:180}}  name="adresse" id="adresse" placeholder="Adresse" />)}
                        </FormItem>
                        <FormItem  hasFeedback>
                            {getFieldDecorator('ville')(<AutoComplete 
                                                            style={{width:200}}
                                                            name="ville" 
                                                            id="ville"
                                                            placeholder="Ville"
                                                            dataSource={dataSource} 
                                                            filterOption={
                                                                (inputValue, option) =>
                                                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                                    }                                             
                                                            ><Input style={{ height: 40 }}/>
                                                            </AutoComplete>
                                                            )}
                        </FormItem>
                  </div>

                  <div className="isoInputWrapper">
                            { this.state.typeInscriptionEntreprise ?  <FormItem  hasFeedback>
                          {getFieldDecorator('nombreSalarie')(<Input type="number" name="nombreSalarie" id="nombreSalarie" placeholder="Nombre salarié" />)}
                        </FormItem> : <FormItem  hasFeedback>
                              {
                                  getFieldDecorator('typeEtablissement',{
                                    initialValue: "Public"
                                  })(<Select
                                  name="typeEtablissement" 
                                  id="typeEtablissement" 
                                  style={styleSelect}
                                    >
                                  <Option value="Privée">Privée</Option>
                                  <Option value="Public">Public</Option>
                                  <Option value="Semi-privée">Semi-privée</Option>
                              </Select>)}
                            </FormItem> }
                  </div> 

                  <div className="isoInputWrapper">
                      <FormItem  hasFeedback>
                        {getFieldDecorator('siteWeb')(<Input style={{ height: 40 }} name="siteWeb" id="siteWeb" addonBefore={selectBefore}placeholder="Site web" />)}
                      </FormItem>
                  </div> 

                  <div className="isoInputWrapper">
                      <FormItem  hasFeedback>
                        {getFieldDecorator('telephone'/*, {
                          rules: [
                            {
                              type: 'number',
                              message: 'Saisissez un numéro valide !',
                            },
                            {
                              required: false,
                              message: 'Information obligatoire!'
                            }
                          ]
                        }*/)(<Input style={{ height: 40 }} type="number" name="telephone" id="telephone" addonBefore={"+261"}  placeholder="Numero ..ex 22 512 70" />)}
                      </FormItem>
                  </div>

                  <div className="isoInputWrapper">
                      <FormItem  hasFeedback>
                            {getFieldDecorator('domaine')(<Input name="domaine" 
                                                                id="domaine"
                                                                placeholder={this.state.typeInscriptionEntreprise ? "Domaine entreprise" : "Domaine établissement"} />)}
                        </FormItem>
                  </div>

                  <div className="isoInputWrapper">
                      <FormItem  hasFeedback>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              type: 'email',
                              message: 'Saisissez une E-mail valid !'
                            },
                            {
                              required: true,
                              message: 'Information obligatoire!'
                            }
                          ]
                        })(<Input name="email" id="email" placeholder="E-mail" />)}
                      </FormItem>
                  </div>
                  
                  <div className="isoInputWrapper">
                    <FormItem  hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: 'Mot de passe obligatoire!'
                          },
                          {
                            validator: this.checkConfirm
                          }
                        ]
                      })(<Input type="password" placeholder="Mot de passe" />)}
                    </FormItem>
                  </div>

                  <div className="isoInputWrapper">
                    <FormItem   hasFeedback>
                      {getFieldDecorator('confirm', {
                        rules: [
                          {
                            required: true,
                            message: 'Confirmez votre mot de passe!'
                          },
                          {
                            validator: this.checkPassword
                          }
                        ]
                      })(<Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirmer mot de passe"/>)}
                    </FormItem>
                  </div> 

                <FormItem  style={{ marginBottom: 8 }}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez accepter les règles de confidentialité!'
                      }
                    ]
                  })(
                    <Checkbox>
                      J'accepte les <a href="">règles de confidentialité</a>
                    </Checkbox>
                  )}
                </FormItem>

              <div className="isoInputWrapper">
                  <FormItem >
                    <Button loading={this.state.loading}  type="primary" htmlType="submit">
                    Inscrire
                    </Button>
                  </FormItem>
              </div>

          </Form>
        </div>
  
    </div>)
  }
}



const WrappedFormWIthSubmissionButton = Form.create()(SignUp);
export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }),
  { register }
)(WrappedFormWIthSubmissionButton);
