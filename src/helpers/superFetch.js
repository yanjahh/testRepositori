import { jwtConfig } from '../config';


const base = (method, url, data = {}) => {
  return fetch(`${jwtConfig.fetchUrl}${url}`, {
    method,
    body: JSON.stringify(data)
  })
    .then(
      response => response.json()
    )
    .catch(error => (
    {
       error: error
      }
    )
  );
};
const SuperFetch = {};

['get', 'post', 'put', 'delete'].forEach(method => {
    SuperFetch[method] = base.bind(null, method);
});
export default SuperFetch;
