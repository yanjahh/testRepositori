import React, { Component } from 'react';
import { ContactCardWrapper } from './contactCard.style';

export default class SingleContactView extends Component {
  render() {
    const { contact, otherAttributes,/*attributesAdresse*/ } = this.props;
    const nom = contact.nom ? contact.nom : 'Pas de nom';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = contact[attribute.value];
      console.log(value);
      if (value) {
        
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">
              {value}
            </p>
            
          </div>
        );
      }
    });

   /* const extraAdresse = [];
    attributesAdresse.forEach(attribute => {
      var value = contact[attribute.value] ;
      
      
    });*/
   
    return (
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            {contact.logo ? <img alt="#" src={contact.logo} /> : ''}
          </div>
          <h1 className="isoPersonName">
            {nom}
          </h1>
        </div>
        <div className="isoContactInfoWrapper">
          {extraInfos}
        </div>
      </ContactCardWrapper>
    );
  }
}
