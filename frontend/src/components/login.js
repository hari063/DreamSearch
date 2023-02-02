import React from 'react';
import {AC_LOGIN} from './actions/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
class Login extends React.Component{
	constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            emailError:false,
            passwordError:false,
            emailPatternError:false,
            passwordPatternError:false,
        }
        this.formValidation= this.formValidation.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
      
    }
	formValidation(){

        const email=this.state.email;
        const password=this.state.password;
        email?this.setState({emailError:false}):this.setState({emailError:true})
        password?this.setState({passwordError:false}): this.setState({passwordError:true})
        if(email&&password){
            const userData = {
                email: this.state.email,
                password: this.state.password,
               
          }
          
          
          this.props.AC_LOGIN(userData);
          console.log(userData)
          
         
        }

    }
   
    handleInputChange(event){
        const fieldName=event.target.id;
        const fieldValue=event.target.value;

		if(fieldName==='mail'){
            const emailPattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const valid=emailPattern.test(fieldValue);
            this.setState({email:fieldValue,emailError:false})
            if(valid){
                this.setState({emailPatternError:false,emailError:false})
                
            }
            else{
                this.setState({emailPatternError:true,emailError:false})
            }
            
        }
        if(fieldName==='pass'){               
           var password=fieldValue
            this.setState({password:fieldValue,passwordError:false})
            if(password){
                this.setState({passwordError:false})
            }
            else{
                this.setState({passwordError:true})
               
            }

        }
    }
    render(){
        return(
     <>
	 
   <section class="inner_header_title inner-header-title">
  		<div class="inner_header_bg">
  			<div class="container">
					<h1 class="login">Login</h1>
				</div>
  		</div>
	</section>


  	<section class="form_section gray">
				<div class="container">
					<div class="tab_sec_padding">
						<div class="row">
							<div class="col-xl-8 col-lg-10 col-md-10 col-sm-12">
								<div class="new-logwrap">
								
									<br/>
								
									
									<div class="form-group">
										<label>Email</label>
										<div class="input-with-icon">
											<input type="text" defaultValue={this.state.email} id="mail" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your Email"/>
											{this.state.emailError?<div style={{color:'red'}}>* Email is required</div>:''}
                    						{this.state.emailPatternError?<div style={{color:'red'}}>* Enter valid email!</div>:''}
												
											<i class="fas fa-lock theme-cl"></i>
										</div>
										
									</div>
									<div>
									
					</div>
									<div class="form-group">
										<label>Password</label>
										<div class="input-with-icon">
											<input type="password" defaultValue={this.state.password}  id="pass" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your Password"/>
											{this.state.passwordError?<div style={{color:'red'}}>* Password is required</div>:''}
                   						 {this.state.passwordPatternError?<div style={{color:'red'}}>* Password should contain atleast one letter, one number </div>:''}

											<i class="fas fa-envelope theme-cl"></i>
										</div>
										
									</div>
									<div>
									
					</div>
									<div class="register-account text-right">
										<a class="theme-cl" href="#"><Link to="/forgotpassword">Forgot Password ?</Link></a>
									</div>
									
									<div class="form-groups">
										<button type="submit" onClick={this.formValidation}  class="btn btn-primary theme-bg full-width">Login</button>
									</div>
									
									<div class="social-devider">
										<span class="line"></span>
										<span class="circle">Or</span>
									</div>
									
									<div class="social-login row">
										
										<div class="col-md-6">
											<a href="#" class="jb-btn-icon social-login-facebook"><i class="fab fa-facebook-f icon_color"></i>Facebook</a>
										</div>
										
										<div class="col-md-6">
											<a href="#" class="jb-btn-icon social-login-google"><i class="fab fa-google-plus icon_color"></i>Google</a>
										</div>
										
										<div class="col-md-6">
											<a href="#" class="jb-btn-icon social-login-twitter"><i class="fab fa-twitter icon_color"></i>Twitter</a>
										</div>
										
										<div class="col-md-6">
											<a href="#" class="jb-btn-icon social-login-linkedin"><i class="fab fa-linkedin icon_color"></i>Linkedin</a>
										</div>
										
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

      </>
        );
    }
}
function mapStateToProps(state) {
  
    return {
  
      Login_Reducer: state.LoginReducer
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LOGIN,
                                }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);