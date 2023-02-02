import axios from 'axios';
import URL from "../../common/api";
import swal from 'sweetalert';
const LOGIN= "LOGIN";
const FORGOT_PASSWORD="FORGOT_PASSWORD";
const NEW_PASSWORD="NEW_PASSWORD"
export function AC_LOGIN (userData){
    return function(dispatch){
        
        return axios.post(URL.API.Login,userData)

        .then(({data}) => {
           console.log("data",data)
           if(data.status===1){
           localStorage.setItem("token",data.webToken);
           window.location="/";

           }
           else{            
               dispatch({type:LOGIN,payload:data})
               
               swal("Oops!", "Invalid Email & Password!, Please check again", "error");
        }
         });
    };
}



export function AC_FORGOT_PASSWORD (userData){
    
    return function(dispatch){
        return axios.post(URL.API.ForgotPassword,userData)
        .then(({data}) => {
        dispatch({type:FORGOT_PASSWORD,payload:data})
         });
    };
}

export function AC_NEW_PASSWORD (userData){
    
    return function(dispatch){
        return axios.post(URL.API.NewPassword,userData)
        .then(({data}) => {
        dispatch({type:NEW_PASSWORD,payload:data})
         });
    };
}
