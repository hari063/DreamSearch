import React from 'react';
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
class Header extends React.Component{
	
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		
	  
	  }
	logout(){
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to logout?",
      icon: "warning",
      dangerMode: true,
    

    })
    .then(willDelete => {
      if (willDelete) {
        
       localStorage.removeItem("token");
        window.location="/";
      }
     
    });
		
	}
    render(){
		var token = localStorage.getItem("token")
		if(token){
        return(
			
        <section class="navbar_section">
  		<div class="navbar_content">
  			<nav class="navbar navbar-expand-lg navbar-dark navbar-fixed-top">
			  	<h2>Dream <span class="jobs_color">Search</span></h2>
				  	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span class="navbar-toggler-icon"></span>
				  	</button>
				  	<div class="collapse navbar-collapse" id="navbarSupportedContent">
				    	<ul class="navbar-nav ml-auto">
						<li class="nav-item dropdown">
					        <Link to="/" class="nav-link"  >
					          HOME
					        </Link>
					        
					      </li>
					      
					      <li class="nav-item dropdown">
					        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					          JOBS
					        </a>
					        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link to="/jobdetail" class="dropdown-item">
							Job detail
							  </Link>
					          <a class="dropdown-item" href="#">Another action</a>
					          <div class="dropdown-divider"></div>
					          <a class="dropdown-item" href="#">Something else here</a>
					        </div>
					      </li>
					      <li class="nav-item dropdown">
					        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					          BROWSE
					        </a>
					        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
					          <a class="dropdown-item" href="#">Action</a>
					          <a class="dropdown-item" href="#">Another action</a>
					          <div class="dropdown-divider"></div>
					          <a class="dropdown-item" href="#">Something else here</a>
					        </div>
					      </li>
					      

				    	</ul>
						
						  <div class="sign_in_btn" onClick={this.logout} style={{cursor:"pointer"}}>
				    		<a>LOGOUT</a>
				    	</div>
                        
                      
				  	</div>
				</nav>
  		</div>
  	</section>
		);
		}
		else{
			return(
	   <section class="navbar_section">
  		<div class="navbar_content">
  			<nav class="navbar navbar-expand-lg navbar-dark navbar-fixed-top">
			  	<h2>Dream <span class="jobs_color">Search</span></h2>
				  	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span class="navbar-toggler-icon"></span>
				  	</button>
				  	<div class="collapse navbar-collapse" id="navbarSupportedContent">
				    	<ul class="navbar-nav ml-auto">
					     
					      <li class="nav-item dropdown">
					        <Link to="/register" class="nav-link " >
					          SIGNUP
					        </Link>
					        
					      </li>
				    	</ul>
				    	<div class="sign_in_btn">
				    		<Link to="/login">SIGN IN NOW</Link>
				    	</div>
				  	</div>
				</nav>
  		</div>
  	</section>
			);
		}
    }
}
export default Header;