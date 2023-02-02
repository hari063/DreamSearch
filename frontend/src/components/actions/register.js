import axios from 'axios';
import URL from "../../common/api";
const LIST_REGISTER= "LIST_REGISTER";
const ADD_REGISTER="ADD_REGISTER";


export function AC_LIST_REGISTER (){
    return function(dispatch){
        
        return axios.get(URL.API.ListRegister)

        .then(({data}) => {
          
            dispatch({type:LIST_REGISTER,payload:data})
         });
    };
}

export function AC_ADD_REGISTER (userData){
    
    return function(dispatch){
        return axios.post(URL.API.AddRegister,userData)
        .then(({data}) => {
        dispatch({type:ADD_REGISTER,payload:data})
         });
    };
}

