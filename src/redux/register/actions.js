const registerAction = {
    'REGISTER' :'REGISTER',
    'REGISTER_ERROR': 'REGISTER_ERROR',
    'REGISTER_SUCCESS': 'REGISTER_SUCCESS', 
    
    register: payload => ({
        type: registerAction.REGISTER,
        payload
    })  

   
}
  export default registerAction ;
  