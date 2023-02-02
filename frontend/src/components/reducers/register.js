const initialState={
    listRegister:[],
    addRegister:[],

}
function RegisterReducer(state=initialState,action){
    switch(action.type){
        case 'LIST_REGISTER':
            return{
                ...state,
                listRegister:action.payload.data
            }
        case 'ADD_REGISTER':
            return{
                 ...state,
                addRegister:action.payload
                
            }
         
            
            
       default:
        return state;
                
    }
}
export default RegisterReducer;
