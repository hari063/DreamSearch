const initialState={
    login:[],
   forgotPassword:[],
   newPassword:[],
}

function LoginReducer(state=initialState,action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                login:action.payload,
                
            } 
            case 'FORGOT_PASSWORD':
            return{
                 ...state,
                 forgotPassword:action.payload
                
            }
            case 'NEW_PASSWORD':
            return{
                 ...state,
                 newPassword:action.payload
                
            }
            default:
            return state;        
    }
   
}
export default LoginReducer;
