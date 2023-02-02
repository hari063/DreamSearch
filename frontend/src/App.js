import Header from './components/layouts/header';
import Banner from './components/layouts/banner';
import Footer from './components/layouts/footer';
import Login from './components/login';
import Register from './components/register';
import JobDetail from './components/jobdetails/index';
import Home from './components/home';
import Reset from './components/reset';
import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
import ForgotPassword from './components/forgotpassword';
class App extends React.Component{
	
    render(){
      var token = localStorage.getItem("token")
		if(token){
  return (
  <>
  <Router>
    <div class="wrapper">
      
    <Header/>
    <div class="clearfix"></div>
        <Routes>
    <Route exact path="/" element={<Banner/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/jobdetail" element={<JobDetail/>}/>
    </Routes>
     <Footer/>
    </div>
    </Router>
    </>
  );
    }
    else{
      return(
        <>
        <Router>
         <div class="wrapper">
        <Header/>
        <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route exact path="/reset-password/:token" element={<Reset/>}/>
    </Routes>
        <Footer/>
        </div>
        </Router>
        </>
      );
    }
    }
}

export default App;
