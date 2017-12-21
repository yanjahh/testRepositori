import { jwtConfig } from '../config';


const SuperFetchData = {
    getInfo (data) {
        return fetch(`${jwtConfig.fetchUrl}${data}`,{
            method: 'get'
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
    
    }
}

export default SuperFetchData;



