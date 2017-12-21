import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import Button from '../../components/uielements/button';
import Card from '../Formations/card.style';
import { Input, AutoComplete,Select, Tag, Tooltip, Icon } from 'antd';
import Form from '../../components/uielements/form';
import AjoutStyleWrapper from '../Formations/ajoutFormation.style';
import DatePicker from '../../components/uielements/datePicker';
import notification from '../../components/notification';
import JwtGetData from '../../helpers/jwtGetData';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import Emplois from './offreEmplois';



const FormItem = Form.Item;
const Option = Select.Option;
 const { TextArea } = Input;
 class AjoutOffre extends Component {
    state = {
        tableAjout: false,
        tags: [],
        inputVisible: false,
        inputValue: '',
        dataSourceDomaine:[],
      };
    componentWillMount() {
        this.getDomaine();
      }
    
    getDomaine = () => {
    
        JwtGetData.getInfoDomaine().then(result => {
            var liste =[];
          if (result.error) {
            notification('error', result.error);
          } else {          
            result.forEach(function(item) {
                liste.push(item.nomDomaine);
              });
              this.setState({dataSourceDomaine: liste});
              console.log(this.state.dataSourceDomaine);
          }
        });
      };

    ajoutEmplois = (emploisInfo) =>{
        JwtGetData.creationEmplois(emploisInfo).then( result => {
            if (result.error) {
                notification('error', result.error);
              } else {
                notification('success',result.message);
                this.setState({tableAjout:true});
              }

        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, info) => {
            if (!err) {
             const dateLimite = info.dateLimite ? info.dateLimite.format("YYYY-MM-DD")  : null;

              const emploisInfo = {
                id              : this.props.idInstitution,
                titreEmploi     : info.titreEmploi,
                typeContrat     : info.typeContrat,
                description     : info.description,
                profilsRequis   : info.profilsRequis,
                tags            : JSON.stringify(this.state.tags),
                domaineEmplois  : info.domaineEmplois,
                dateLimite      : dateLimite,
                lieuDeFormation : info.lieuDeFormation,
                domaineFormation: info.domaineFormation
              }
              this.ajoutEmplois(emploisInfo);
              console.log(emploisInfo);
            }
          });

    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }     

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    
    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
    }
    

    saveInputRef = input => this.input = input
 
  render() {
    const { getFieldDecorator } = this.props.form;
    const styleSelect ={
        color:'rgb(70, 112, 162)'
      };
       
    const dateFormat = 'LL';
    const { tags, inputVisible, inputValue } = this.state;
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
       }
    return (
    <LayoutContentWrapper>
        <div style={{ width: '100%' }}>
            {this.state.tableAjout? <Emplois/>:
        
            <Card
                  title={<IntlMessages id="uiElements.cards.addEmplois" />}
                  style={{ width: '100%' }}
                >
                <AjoutStyleWrapper>
                    <Form onSubmit={this.handleSubmit} >
                       
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Titre de votre offre"  >
                                        {getFieldDecorator('titreEmploi', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Titre de l\'offre obligatoire!'
                                                }
                                            ]
                            })(<Input  name="titreEmploi" id="titreEmploi" />)}
                            </FormItem>
                        </div>
                        <div className="isoInput">
                             <FormItem  hasFeedback label="Type contrat" >
                                        {getFieldDecorator('typeContrat', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Sélectionner le type du contrat!'
                                                }
                                            ]
                                        })(<Select
                                            name="typeContrat" 
                                            id="typeContrat" 
                                            style={styleSelect}
                                            placeholder="Choisir"
                                                >
                                            <Option value="Stage">Stage</Option>
                                            <Option value="CDD">CDD</Option>
                                            <Option value="CDI">CDI</Option>
                                        </Select>)}
                                     </FormItem>
                        </div>
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Description"  >
                                        {getFieldDecorator('description', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Desription de l\'emploi obligatoire!'
                                                }
                                            ]
                            })(
                                            <TextArea 
                                                name="description" 
                                                id="description"
                                                rows={6}
                                    />)}
                            </FormItem>
                        </div>
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Profils requis"  >
                                        {getFieldDecorator('profilsRequis', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Profils requis obligatoire!'
                                                }
                                            ]
                            })(
                                            <TextArea 
                                                name="profilsRequis" 
                                                id="profilsRequis"
                                                rows={2}
                                    />)}
                            </FormItem>
                        </div>
                        <div className="isoInput">
                            {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                                <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)} color='rgb(70, 112, 162)' style={{fontSize: '105%'}}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                            );
                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                                {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                style={{ width: 108,height: 30 }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                            )}
                            {!inputVisible && (
                            <Tag 
                                onClick={this.showInput}
                                style={{ background: '#fff', height: 30}}
                            >
                                <Icon type="plus" /> Mots clés emplois
                            </Tag>
                            )}
                        </div>
                        <div className="isoInput">
                          <div className="isoLeftRightComponent" >
                            <FormItem  hasFeedback label="Domaine de l'emplois" >
                                {getFieldDecorator('domaineEmplois')(<AutoComplete 
                                                                style={{width:307}}
                                                                name="domaineEmplois" 
                                                                id="domaineEmplois"
                                                                dataSource={this.state.dataSourceDomaine} 
                                                                filterOption={
                                                                    (inputValue, option) =>
                                                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                                        }                                             
                                                                ><Input style={{ height: 40 }}/>
                                                                </AutoComplete>
                                                                )}
                            </FormItem>
                        
                            <FormItem  hasFeedback label="Date limite de candidature">
                                {
                                getFieldDecorator('dateLimite')(<DatePicker 
                                                                format={dateFormat} 
                                                                disabledDate={disabledDate}
                                                                size="default"
                                                                name="dateLimite" 
                                                                id="dateLimite" />) }
                            </FormItem>
                          </div>
                        </div>
                       
                        <div className="isoInput">
                         <FormItem >
                            <Button loading={this.state.loading}  htmlType="submit">
                            Enregistrer
                          </Button>
                  </FormItem>
              </div>
                        
                    </Form>
                 </AjoutStyleWrapper>   
             
            </Card>
            }
        </div>
    </LayoutContentWrapper> 
    );
  }
}

  
const WrappedFormWIthSubmissionButton = Form.create()(AjoutOffre);
export default connect(
  state => ({
    idToken: state.Auth.toJS().idToken,
    idInstitution: localStorage.getItem('id_institution')
  }),
  {}
)(WrappedFormWIthSubmissionButton);



