import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../components/uielements/menu';
import IntlMessages from '../../components/utility/intlMessages';
import SidebarWrapper from './sidebar.style';

import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';
import { getCurrentTheme } from '../ThemeSwitcher/config';
import { themeConfig } from '../../config';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state={
      typeEtablissement:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  componentWillMount(){
    this.setState({typeEtablissement: localStorage.getItem('type_etablissement')})
    console.log(this.state.typeEtablissement);

     }

  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  render() {
    const { url, app, toggleOpenDrawer } = this.props;
    const customizedTheme = getCurrentTheme('sidebarTheme', themeConfig.theme);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
            {localStorage.getItem('type_etablissement') === 'null' ?
              <SubMenu
                key="OffreEmplois"
                 title={
                  <span className="isoMenuHolder" style={submenuColor}>
                     <i className="ion-ios-briefcase" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.OffreEmplois" />    
                    </span>
                 </span>
               }
              >
                <Menu.Item style={submenuStyle} key="listeOffre">
                  <Link style={submenuColor} to={`${url}/OffreEmplois`}>
                    <IntlMessages id="sidebar.EmploisSubMenu" />
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="addEmplois">
                  <Link style={submenuColor} to={`${url}/add/OffreEmplois`}>
                    <IntlMessages id="sidebar.addEmploisSubMenu" />
                  </Link>
                </Menu.Item>
              </SubMenu>
              :
              <SubMenu
                key="Formations"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-university" />
                  <span className="nav-text">
                  <IntlMessages id="sidebar.formation" />
                  </span>
                </span>
               }
               >
              <Menu.Item style={submenuStyle} key="listeFormation">
                <Link style={submenuColor} to={`${url}/Formations`}>
                  <IntlMessages id="sidebar.FormationSubMenu" />
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="addFormation">
                <Link style={submenuColor} to={`${url}/add/Formations`}>
                  <IntlMessages id="sidebar.addFormationSubMenu" />
                </Link>
              </Menu.Item>
            </SubMenu>
              
            }
            <SubMenu
                key="Evenements"
                 title={
                  <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-wineglass" />
                    <span className="nav-text">
                     <IntlMessages id="sidebar.evenements" /> 
                    </span>
                 </span>
               }
              >
                <Menu.Item style={submenuStyle} key="listeEvenement">
                  <Link style={submenuColor} to={`${url}/Evenements`}>
                    <IntlMessages id="sidebar.EvenementSubMenu" />
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="addFormation">
                  <Link style={submenuColor} to={`${url}/add/Evenements`}>
                    <IntlMessages id="sidebar.addEvenementSubMenu" />
                  </Link>
                </Menu.Item>
              </SubMenu>


              <Menu.Item key="Candidats">
                <Link to={`${url}/Candidats`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-person-stalker" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.Candidats" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              
              {localStorage.getItem('type_etablissement') === 'null' ?
              <SubMenu
                key="Formations"
                 title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-university" />
                  <span className="nav-text">
                  <IntlMessages id="sidebar.formation" />
                  </span>
                 </span>
               }
              >
                <Menu.Item style={submenuStyle} key="listeFormation">
                  <Link style={submenuColor} to={`${url}/Formations`}>
                    <IntlMessages id="sidebar.FormationSubMenu" />
                  </Link>
                </Menu.Item>
                <Menu.Item style={submenuStyle} key="addFormation">
                  <Link style={submenuColor} to={`${url}/add/Formations`}>
                    <IntlMessages id="sidebar.addFormationSubMenu" />
                  </Link>
                </Menu.Item>
              </SubMenu>
             :
             <SubMenu
             key="OffreEmplois"
              title={
               <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-ios-briefcase" />
                 <span className="nav-text">
                   <IntlMessages id="sidebar.OffreEmplois" />    
                 </span>
              </span>
            }
           >
             <Menu.Item style={submenuStyle} key="listeOffre">
               <Link style={submenuColor} to={`${url}/OffreEmplois`}>
                 <IntlMessages id="sidebar.EmploisSubMenu" />
               </Link>
             </Menu.Item>
             <Menu.Item style={submenuStyle} key="addFormation">
               <Link style={submenuColor} to={`${url}/add/OffreEmplois`}>
                 <IntlMessages id="sidebar.addEmploisSubMenu" />
               </Link>
             </Menu.Item>
           </SubMenu>
            
             }
              <Menu.Item key="Information">
                <Link to={`${url}/InformationsCompte`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-ios-paper" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.Informations" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="Parametres">
                <Link to={`${url}/Parametres`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-wrench" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.Parametres" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              
             
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS()
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
