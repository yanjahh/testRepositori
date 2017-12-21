import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../dashboard'))}
        />
        <Route
          exact
          path={`${url}/Formations`}
          component={asyncComponent(() => import('../Formations/formations'))}
        />
        <Route
          exact
          path={`${url}/add/Formations`}
          component={asyncComponent(() => import('../Formations/AjoutFormation'))}
        />
         <Route
          exact
          path={`${url}/Evenements`}
          component={asyncComponent(() => import('../Evenements/evenements'))}
        />
        <Route
          exact
          path={`${url}/add/Evenements`}
          component={asyncComponent(() => import('../Evenements/AjoutEvenement'))}
        />
         <Route
          exact
          path={`${url}/OffreEmplois`}
          component={asyncComponent(() => import('../OffreEmplois/offreEmplois'))}
        />
        <Route
          exact
          path={`${url}/add/OffreEmplois`}
          component={asyncComponent(() => import('../OffreEmplois/ajoutOffre'))}
        />
         <Route
          exact
          path={`${url}/Candidats`}
          component={asyncComponent(() => import('../Candidats/candidats'))}
        />
        <Route
          exact
          path={`${url}/InformationsCompte`}
          component={asyncComponent(() => import('../Informations compte/informations'))}
        />
        <Route
          exact 
          path={`${url}/Parametres`}
          component={asyncComponent(() => import('../Parametres compte/parametres'))}
        />
      </Switch>
    );
  }
}

export default AppRouter;
