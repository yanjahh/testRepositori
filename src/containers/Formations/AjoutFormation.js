import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import { Link } from 'react-router-dom';
import Button from '../../components/uielements/button';
import Card from './card.style';
import { Input, AutoComplete, Select,Tag, Tooltip, Icon } from 'antd';
import Form from '../../components/uielements/form';
import AjoutFormationStyleWrapper from './ajoutFormation.style';
import DatePicker from '../../components/uielements/datePicker';
import notification from '../../components/notification';
import JwtGetData from '../../helpers/jwtGetData';
import Formation from './formations';



const FormItem = Form.Item;
 const Option = Select.Option;
 const { TextArea } = Input;
 class AjoutFormation extends Component {
    state = {
        tableAjout: false,
        tags: [],
        inputVisible: false,
        inputValue: '',
        dataSourceDomaine:[],
        afficheDateFin:false
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

    ajoutFormation = (formationInfo) =>{
        JwtGetData.creationFormation(formationInfo).then( result => {
            if (result.error) {
                notification('error', result.error);
              } else {
                notification('success',result.message);
                this.setState({ tableAjout: true})
              }

        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, info) => {
            if (!err) {
             const dateDebut = info.dateDebutFormation ? info.dateDebutFormation.format("YYYY-MM-DD")  : null;
             const dateFin = info.dateFinFormation ? info.dateFinFormation.format("YYYY-MM-DD")  : null 

              const formationInfo = {
                id   : this.props.idInstitution,
                nomFiliere          : info.nomFiliere,
                typeFormation       : info.typeFormation,
                descriptionFormation: info.descriptionFormation,
                diplomeDeLivre      : info.diplomeDeLivre,
                dateDebutFormation  : dateDebut,
                dateFinFormation    : dateFin,
                lieuDeFormation     : info.lieuDeFormation,
                tags                : JSON.stringify(this.state.tags),
                domaineFormation    : info.domaineFormation
              }
              this.ajoutFormation(formationInfo);
              console.log(formationInfo);
            }
          });

    }
    Click = () =>{
        this.setState({afficheDateFin:true});
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
        color:'rgb(70, 112, 162)',
        width:250
      };
       
    const dateFormat = 'LL';
    const { tags, inputVisible, inputValue } = this.state;
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
       }
    return (
        <div style={{ width: '100%' }}>
            { this.state.tableAjout ? <Formation/>: 
                <Card
                  title={<IntlMessages id="uiElements.cards.addFormation" />}
                  
                >
                <AjoutFormationStyleWrapper>
                    <Form onSubmit={this.handleSubmit} >
                       
                        <div className="isoInput">
                             <FormItem  hasFeedback label="Type formation" >
                                        {getFieldDecorator('typeFormation')(<Select
                                            name="typeFormation" 
                                            id="typeFormation" 
                                            style={styleSelect}
                                            placeholder="Choisir"
                                                >
                                            <Option value="Initiale">Formation initiale</Option>
                                            <Option value="Continue">Formation continue</Option>
                                        </Select>)}
                                     </FormItem>
                        </div>
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Intitulé de la formation"  >
                                        {getFieldDecorator('nomFiliere', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Titre de formation obligatoire!'
                                                }
                                            ]
                            })(<Input  name="nomFiliere" id="nomFiliere" />)}
                            </FormItem>
                        </div>
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Description"  >
                                        {getFieldDecorator('descriptionFormation', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Description de formation obligatoire!'
                                                }
                                            ]
                                        })(
                                            <TextArea 
                                                name="descriptionFormation" 
                                                id="descriptionFormation"
                                                rows={4}
                                    />)}
                            </FormItem>
                        </div>
                        <div className="isoInput">
                          <div className="isoLeftRightComponent" >
                             <FormItem  hasFeedback label="Diplôme visé" >
                                        {getFieldDecorator('diplomeDeLivre', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Selectionner le diplôme delivré'
                                                }
                                            ]
                            }          )(<Select
                                            name="diplomeDeLivre" 
                                            id="diplomeDeLivre" 
                                            style={styleSelect}
                                            size="default"
                                            placeholder="Choisir"
                                                >
                                            <Option value="Certificat">Certificat</Option>
                                            <Option value="Baccalauréat">BAC</Option>
                                            <Option value="LICENCE">BAC+3</Option>
                                            <Option value="MASTER">BAC+5</Option>
                                        </Select>)}
                            </FormItem>
                            <FormItem  hasFeedback label="Domaine formation" >
                                {getFieldDecorator('domaineFormation')(<AutoComplete 
                                                                style={{width:250}}
                                                                name="domaineFormation" 
                                                                id="domaineFormation"
                                                                dataSource={this.state.dataSourceDomaine} 
                                                                filterOption={
                                                                    (inputValue, option) =>
                                                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                                        }                                             
                                                                ><Input style={{ height: 40 }}/>
                                                                </AutoComplete>
                                                                )}
                            </FormItem>
                          </div>
                        </div>
                        <div className="isoInput">
                          <div className="isoLeftRightComponent" >
                            <FormItem  hasFeedback label="Début formation">
                                {
                                getFieldDecorator('dateDebutFormation')(<DatePicker  format={dateFormat} 
                                                               style={{width:250}}
                                                               disabledDate={disabledDate}
                                                                name="dateDebutFormation" 
                                                                id="dateDebutFormation" />) }
                            </FormItem>
                           {this.state.afficheDateFin ? <FormItem  hasFeedback label="Fin formation">
                                {
                                getFieldDecorator('dateFinFormation')(<DatePicker style={{width:250}}
                                                                format={dateFormat} 
                                                               disabledDate={disabledDate}
                                                                name="dateFinFormation" 
                                                                id="dateFinFormation" />) }
                            </FormItem>:
                            <Button onClick={this.Click}>+Date fin </Button>
                            }
                            </div>
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
                                required="true"
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
                                <Icon type="plus" /> Mots clés formation
                            </Tag>
                            )}
                        </div>

                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Lieu de la formation"  >
                                        {getFieldDecorator('lieuDeFormation')(<Input  name="lieuDeFormation" id="lieuDeFormation" />)}
                            </FormItem>
                        </div>
                        <div className="isoInput">
                         <FormItem >
                            <Button  htmlType="submit">
                            <Link to="/signin"></Link>
                            Enregistrer
                          </Button>
                  </FormItem>
              </div>
                        
                    </Form>
                 </AjoutFormationStyleWrapper>   
             
            </Card>
            }
           
        </div>
        
    );
  }
}

  
const WrappedFormWIthSubmissionButton = Form.create()(AjoutFormation);
export default connect(
  state => ({
    idToken: state.Auth.toJS().idToken,
    idInstitution: localStorage.getItem('id_institution')
  }),
  {}
)(WrappedFormWIthSubmissionButton);



