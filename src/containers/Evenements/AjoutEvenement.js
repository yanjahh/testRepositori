import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import Button from '../../components/uielements/button';
import Card from '../Formations/card.style';
import { Input, AutoComplete, Select,Tag, Tooltip, Icon,TimePicker } from 'antd';
import Form from '../../components/uielements/form';
import AjoutStyleWrapper from '../Formations/ajoutFormation.style';
import DatePicker from '../../components/uielements/datePicker';
import notification from '../../components/notification';
import JwtGetData from '../../helpers/jwtGetData';
import Evenement from './evenements';



const FormItem = Form.Item;
 const Option = Select.Option;
 const { TextArea } = Input;
 class AjoutEvenement extends Component {
    state = {
        tableAjout: false,
        tags: [],
        inputVisible: false,
        inputValue: '',
        dataSourceCategorie:[],
        afficheHeureFin:false
      };
    componentWillMount() {
        this.getCategorie();
      }
    
    getCategorie = () => {
    
        JwtGetData.getInfoCategorie().then(result => {
            var liste =[];
          if (result.error) {
            notification('error', result.error);
          } else {          
            result.forEach(function(item) {
                liste.push(item.nomCategorie);
              });
              this.setState({dataSourceCategorie: liste});
              console.log(this.state.dataSourceCategorie);
          }
        });
      };

    ajoutEvenement = (evenementInfo) =>{
        JwtGetData.creationEvenement(evenementInfo).then( result => {
            if (result.error) {
                notification('error', result.error);
              } else {
                notification('success',result.message);
                this.setState({ tableAjout: true});
              }

        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, info) => {
           if (!err) {
             const dateDebutEvenement = info.dateDebut ? info.dateDebut.format("YYYY-MM-DD")  : null;
             const dateFinEvenement = info.dateFin ? info.dateFin.format("YYYY-MM-DD")  : null 

              const evenementInfo = {
                id                : this.props.idInstitution,
                nomEvenement      : info.nomEvenement,
                lieuEvenement     : info.lieuEvenement,
                photoEvenement    : info.photoEvenement,
                detailsEvenement  : info.detailsEvenement,
                dateDebut         : dateDebutEvenement,
                heureDebut        : info.heureDebut,
                dateFin           : dateFinEvenement,
                heureFin          : info.heureFin,
                genreEvenement    : info.genreEvenement,
                categorieEvenement: info.categorieEvenement,
                tags              : JSON.stringify(this.state.tags)
              }
              this.ajoutEvenement(evenementInfo);
              console.log(evenementInfo);
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
    Click = () =>{
        this.setState({afficheHeureFin:true});
    }
    ClickSupprimer= () =>{
        this.setState({afficheHeureFin:false});
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
        width:147
      };
       
    const dateFormat = 'LL';
    const format = 'HH:mm';
    const { tags, inputVisible, inputValue } = this.state;
    
   function disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
   }
    return (
        <div style={{ width: '100%' }}>
            {this.state.tableAjout? <Evenement/>:
                <Card
                  title={<IntlMessages id="uiElements.cards.addEvenement" />}
                  style={{ width: '100%' }}
                >
                <AjoutStyleWrapper>
                    <Form onSubmit={this.handleSubmit} >
                       <div className="isoInput">
                            <FormItem  hasFeedback label="photo">
                                {
                                getFieldDecorator('photoEvenement')(<Input name="photoEvenement" 
                                                            id="photoEvenement"
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg" />)}
                            </FormItem>
                        </div>
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Titre de l'évènement"  >
                                        {getFieldDecorator('nomEvenement', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Titre de l\'évènement obligatoire!'
                                                }
                                            ]
                            })(<Input 
                                        placeholder="Ajoutez un nom court et simple" name="nomEvenement" id="nomEvenement" />)}
                            </FormItem>
                        </div>
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Lieu de l'évènement" >
                                        {getFieldDecorator('lieuEvenement')(<Input 
                                        placeholder="Ajoutez un lieu ou une adresse" name="lieuEvenement" id="lieuEvenement" />)}
                            </FormItem>
                        </div>
                        <div className="isoInput">
                          <div className="isoLeftRightComponent" >
                            <FormItem  hasFeedback label={this.state.afficheHeureFin ? "Début de l'évènement": "Date/Heure" }>
                                {
                                getFieldDecorator('dateDebut', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Date obligatoire!'
                                                }
                                                ]
                                               })(<DatePicker  
                                                                style={{width:307}}
                                                                size="default"
                                                                format={dateFormat} 
                                                                disabledDate={disabledDate}
                                                                name="dateDebut" 
                                                                id="dateDebut" />) }
                            </FormItem>
                            <FormItem  hasFeedback label="Heure"  >
                                        {getFieldDecorator('heureDebut')(<TimePicker style={{width:157}}  name="heureDebut" id="heureDebut"  format={format} />)}
                            </FormItem>
                          </div> 
                          
                        </div>
                        {this.state.afficheHeureFin ?
                            <div className="isoInput">
                              <div className="isoLeftRightComponent" >
                                <FormItem  hasFeedback label="Fin de l'évènement">
                                    {
                                    getFieldDecorator('dateFin')(<DatePicker 
                                                                    disabledDate={disabledDate}
                                                                    format={dateFormat} 
                                                                    style={{width:307}}
                                                                    size="default"
                                                                    name="dateFin" 
                                                                    id="dateFin" />) }
                                </FormItem>
                                <FormItem  hasFeedback label="Heure"  >
                                            {getFieldDecorator('heureFin')(<TimePicker style={{width:157}} name="heureFin" id="heureFin"  format={format} />)}
                                           
                                </FormItem>
                              </div>
                            </div>
                        :
                        <div className="isoInput" >
                         <Button onClick={this.Click}>+Date/heure fin </Button>
                        </div>
                        }
                    
                        <div className="isoInput ">
                            <FormItem  hasFeedback label="Details de l'évènement"  >
                                        {getFieldDecorator('detailsEvenement')(
                                            <TextArea 
                                                placeholder="Decrivez l'évènement"
                                                name="detailsEvenement" 
                                                id="detailsEvenement"
                                                rows={6}
                                    />)}
                            </FormItem>
                        </div>
                        
                        <div className="isoInput">
                          <div className="isoLeftRightComponent" >
                          <FormItem  hasFeedback label="Catégorie" >
                                {getFieldDecorator('categorieEvenement')(<AutoComplete 
                                                                style={{width:317}}
                                                                name="categorieEvenement" 
                                                                id="categorieEvenement"
                                                                dataSource={this.state.dataSourceCategorie} 
                                                                filterOption={
                                                                    (inputValue, option) =>
                                                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                                        }                                             
                                                                ><Input style={{ height: 40 }}/>
                                                                </AutoComplete>
                                                                )}
                            </FormItem>
                            <FormItem  hasFeedback label="Genre évènement" >
                                        {getFieldDecorator('genreEvenement', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Sélectionner le genre de l\'évènement'
                                                }
                                            ]
                                           })(<Select
                                            name="genreEvenement" 
                                            id="genreEvenement" 
                                            style={styleSelect}
                                            placeholder="Choisir"
                                                >
                                            <Option value="Gratuit">Evènement gratuit</Option>
                                            <Option value="Payant">Evènement payant</Option>
                                        </Select>)}
                            </FormItem>
                           
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
                                <Icon type="plus" />Mots clés évènements
                            </Tag>
                            )}
                        </div>
                        
                        
                        <div className="isoInput ">
                         <FormItem  >
                            <Button  loading={this.state.loading}  htmlType="submit">
                            Enregistrer
                          </Button>
                  </FormItem>
              </div>
                        
                    </Form>
                 </AjoutStyleWrapper>   
             
            </Card> 
            }
           
        </div>
        
    );
  }
}

  
const WrappedFormWIthSubmissionButton = Form.create()(AjoutEvenement);
export default connect(
  state => ({
    idToken: state.Auth.toJS().idToken,
    idInstitution: localStorage.getItem('id_institution')
  }),
  {}
)(WrappedFormWIthSubmissionButton);



