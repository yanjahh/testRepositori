export default {
  apiUrl: 'http://yoursite.com/api/',
};
const apiUrl = 'http://localhost:1337/'

const siteConfig = {
  siteName: 'KEYMADA',
  siteIcon: 'ion-flash',
  footerText: 'Keymada ©2017 ',
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';

const jwtConfig = {
  fetchUrl: apiUrl,
  secretKey: 'secretKey'
};
export {
  siteConfig,
  language,
  themeConfig,
  jwtConfig
};
