const ADMINURL = "http://localhost:8000/";
const ROOTURL = ADMINURL + 'api/v1/';

const API = { 

'ListRegister' : ROOTURL+'registers/listRegistrations',
'AddRegister' : ROOTURL+'registers/addRegistration',
'ForgotPassword' : ROOTURL+'registers/reset-password',
'NewPassword' : ROOTURL+'registers/new-password',
'Login':ROOTURL+'registers/checkLogin',
}


export default URL = {
API: API,
ADMINURL: ADMINURL,
}