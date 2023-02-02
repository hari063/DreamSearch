import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {AC_ADD_REGISTER,AC_LIST_REGISTER} from './actions/register';
import swal from 'sweetalert';

class Register extends React.Component{
	componentDidMount(){
		this.props.AC_LIST_REGISTER();
	}
	constructor(props){
        super(props);
        this.state={
			redirect:false,
			type:'candidate',
            firstname:'',
            email:'',
            password:'',
			efirstname:'',
            eemail:'',
            epassword:'',
			ecompanyname:'',
            nameError:false,
            emailError:false,
            passwordError:false,
            nameCountError:false,
            emailPatternError:false,
            passwordPatternError:false,
			enameError:false,
            eemailError:false,
            epasswordError:false,
			ecompanynameError:false,
            enameCountError:false,
            eemailPatternError:false,
            epasswordPatternError:false,
			ecompanynameCountError:false,
        }
		this.ctypechange=this.ctypechange.bind(this);
		this.etypechange=this.etypechange.bind(this);
        this.formValidation= this.formValidation.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
		this.eformValidation= this.eformValidation.bind(this);
        this.ehandleInputChange=this.ehandleInputChange.bind(this);
    }
	ctypechange(){
		this.setState({type:'candidate'});
	}
	etypechange(){
		this.setState({type:'employee'});
	}
    formValidation(){
		var type=this.state.type;
    var  firstname=this.state.firstname;
        var email=this.state.email;
        var password=this.state.password;
		var listRegister=this.props.Register_Reducer.listRegister;
		console.log("list register",listRegister)
        firstname?this.setState({nameError:false}):this.setState({nameError:true})
        email?this.setState({emailError:false}):this.setState({emailError:true,emailPatternError:false})
        password?this.setState({passwordError:false}): this.setState({passwordError:true,passwordPatternError:false,})
		for (var i = 0; i < listRegister.length; i++){

			if(listRegister[i].email==email){
			  var flag=1;
			  break;
			}
			else{
			  flag=0;
			}
		  }
		  if(flag==1){
			swal("Oops!", "Data already exist!", "error");
		  }else{
			if(type&&firstname&&email&&password){
			
				const userData = {
					type:this.state.type,
				  username: this.state.firstname,
				  email: this.state.email,
				  password:this.state.password
			}
			console.log('-=candidate data-=', userData)
		   
			this.props.AC_ADD_REGISTER(userData);
			this.props.AC_LIST_REGISTER();
			console.log('-=candidate data-=', userData)
			swal("Success!", "Registered Successfully!", "success");
		  
		   setTimeout(() => {
			window.location="/login";
		  }, 2000);
		   }
		  
	
      }
	}
	  eformValidation(){
		const type=this.state.type;
        const efirstname=this.state.efirstname;
        const eemail=this.state.eemail;
        const epassword=this.state.epassword;
		const ecompanyname=this.state.ecompanyname;
		var listRegister=this.props.Register_Reducer.listRegister;
		
        efirstname?this.setState({enameError:false}):this.setState({enameError:true})
        eemail?this.setState({eemailError:false}):this.setState({eemailError:true,eemailPatternError:false})
        epassword?this.setState({epasswordError:false}): this.setState({epasswordError:true,epasswordPatternError:false,})
		ecompanyname?this.setState({ecompanynameError:false}):this.setState({ecompanynameError:true})
		for (var i = 0; i < listRegister.length; i++){
			if(listRegister[i].email==eemail){
			  var flag=1;
			  break;
			}
			else{
			  flag=0;
			}
		  }
		  if(flag==1){
			swal("Oops!", "Data already exist!", "error");
		  }else{
				if(type&&efirstname&&eemail&&ecompanyname&&epassword){
			
					const userData = {
						type:this.state.type,
					  username: this.state.efirstname,
					  email: this.state.eemail,
					  password:this.state.epassword,
					  companyname:this.state.ecompanyname
				}
				console.log('-=employee data-=', userData)
			   
				this.props.AC_ADD_REGISTER(userData);
				this.props.AC_LIST_REGISTER();
				console.log('-=employee data-=', userData)
				swal("Success!", "Registered Successfully!", "success");
			  
			//    setTimeout(() => {
			// 	window.location="/login";
			//   }, 2000);
			   }
			}
      }
    handleInputChange(event){
        const fieldName=event.target.id;
        const fieldValue=event.target.value;
        if(fieldName==='name'){
            this.setState({firstname:fieldValue,nameError:false})
            if(fieldValue.length<=2){
                this.setState({nameCountError:true})
               
            }
            else{
                this.setState({nameCountError:false,nameError:false})
            }
        }
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
            const passwordPattern= new RegExp("^(?=.*?[a-z])(?=.*?[0-9])");
            const validPassword=passwordPattern.test(fieldValue);
            this.setState({password:fieldValue,passwordError:false})
            if(validPassword){
                this.setState({passwordPatternError:false,passwordError:false})
            }
            else{
                this.setState({passwordPatternError:true,passwordError:false})
               
            }

        }
    }
	ehandleInputChange(event){
        const fieldName=event.target.id;
        const fieldValue=event.target.value;
        if(fieldName==='ename'){
            this.setState({efirstname:fieldValue,enameError:false})
            if(fieldValue.length<=2){
                this.setState({enameCountError:true})
               
            }
            else{
                this.setState({enameCountError:false,enameError:false})
            }
        }
        if(fieldName==='email'){
            const emailPattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const valid=emailPattern.test(fieldValue);
            this.setState({eemail:fieldValue,eemailError:false})
            if(valid){
                this.setState({eemailPatternError:false,eemailError:false})
                
            }
            else{
                this.setState({eemailPatternError:true,eemailError:false})
            }
            
        }
        if(fieldName==='epass'){               
            const passwordPattern= new RegExp("^(?=.*?[a-z])(?=.*?[0-9])");
            const validPassword=passwordPattern.test(fieldValue);
            this.setState({epassword:fieldValue,epasswordError:false})
            if(validPassword){
                this.setState({epasswordPatternError:false,epasswordError:false})
            }
            else{
                this.setState({epasswordPatternError:true,epasswordError:false})
               
            }

        }
		if(fieldName==='ecompanyname'){
            this.setState({ecompanyname:fieldValue,ecompanynameError:false})
            if(fieldValue.length<=2){
                this.setState({ecompanynameCountError:true})
               
            }
            else{
                this.setState({ecompanynameCountError:false,ecompanynameError:false})
            }
        }
    }
    render(){
		
        return(
     <>
   	<section class="inner_header_title">
  		<div class="inner_header_bg">
  			<div class="container">
					<h1 class="register">Create An Account</h1>
				</div>
  		</div>
	</section>

  	<section class="form_section gray">
				<div class="container">
					<div class="row">
						<div class="col-xl-8 col-lg-10 col-md-10 col-sm-12">
							<div class="new-logwrap">
								<div class="new_logwrap_position">
									<ul class="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
									  <li class="nav-item">
									    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={this.ctypechange}>Candidate</a>
									  </li>
									  <li class="nav-item">
									    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"onClick={this.etypechange}>Employer</a>
									  </li>
									</ul>
								</div>
								<div class="tab-content" id="pills-tabContent">
								  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
								  	<div class="form-group">
											<label>Username</label>
											<div class="input-with-icon">
											<input type="text" defaultValue={this.state.firstname} id="name" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your User Name"/>
                                            {this.state.nameError?<div style={{color:'red'}}>* Name is required</div>:''}
                                            {this.state.nameCountError?<div style={{color:'red'}}>* Name should be atleast 2 characters</div>:''}
												
												<i class="fas fa-user theme-cl"></i>
											</div>
										</div>
										
										<div class="form-group">
											<label>Email</label>
											<div class="input-with-icon">
											<input type="email"  defaultValue={this.state.email} id="mail" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your Email"/>
                    						{this.state.emailError?<div style={{color:'red'}}>* Email is required</div>:''}
                    						{this.state.emailPatternError?<div style={{color:'red'}}>* Enter valid email!</div>:''}
												
												<i class="fas fa-lock theme-cl"></i>
											</div>
										</div>
										
										<div class="form-group">
											<label>Password</label>

											<div class="input-with-icon">
											<input type="password"  defaultValue={this.state.password}  id="pass" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your Password"/>
                    					 {this.state.passwordError?<div style={{color:'red'}}>* Password is required</div>:''}
                   						 {this.state.passwordPatternError?<div style={{color:'red'}}>* Password should contain atleast one letter, one number </div>:''}

												
												<i class="fas fa-envelope theme-cl"></i>
											</div>
										</div>
										
										<div class="register-account text-center">
											By hitting the <span class="theme-cl">"Register"</span> button, you agree to the <a class="theme-cl" href="#">Terms conditions</a> and <a class="theme-cl" href="#">Privacy Policy</a>
										</div>
										
										<div class="form-groups">
											<button type="button"   onClick={this.formValidation}  class="btn btn-primary theme-bg full-width">Register</button>
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
								  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
								  	<div class="form-group">
											<label>Username</label>
											<div class="input-with-icon">
												<input type="text" defaultValue={this.state.efirstname} id="ename" onChange={this.ehandleInputChange}class="form-control" placeholder="Enter Your User Name"/>
												{this.state.enameError?<div style={{color:'red'}}>* Name is required</div>:''}
                                            {this.state.enameCountError?<div style={{color:'red'}}>* Name should be atleast 2 characters</div>:''}
												<i class="fas fa-user theme-cl"></i>
											</div>
										</div>

										<div class="form-group">
											<label>Company name</label>
											<div class="input-with-icon">
												<input type="text" defaultValue={this.state.ecompanyname} id="ecompanyname" onChange={this.ehandleInputChange}class="form-control" placeholder="Enter Your Company Name"/>
												{this.state.ecompanynameError?<div style={{color:'red'}}>*Company name is required</div>:''}
                                            {this.state.ecompanynameCountError?<div style={{color:'red'}}>* Company name should be atleast 2 characters</div>:''}
												<i class="far fa-building theme-cl"></i>
											</div>
										</div>
										
										<div class="form-group">
											<label>Email</label>
											<div class="input-with-icon">
												<input type="email" defaultValue={this.state.eemail} id="email" onChange={this.ehandleInputChange} class="form-control" placeholder="Enter Your Email"/>
												{this.state.eemailError?<div style={{color:'red'}}>* Email is required</div>:''}
                    						{this.state.eemailPatternError?<div style={{color:'red'}}>* Enter valid email!</div>:''}
												<i class="fas fa-lock theme-cl"></i>
											</div>
										</div>
										
										<div class="form-group">
											<label>Password</label>
											<div class="input-with-icon">
												<input type="password" defaultValue={this.state.epassword}  id="epass" onChange={this.ehandleInputChange} class="form-control" placeholder="Enter Your Password"/>
												{this.state.epasswordError?<div style={{color:'red'}}>* Password is required</div>:''}
                   						 {this.state.epasswordPatternError?<div style={{color:'red'}}>* Password should contain atleast one letter, one number </div>:''}
												<i class="fas fa-envelope theme-cl"></i>
											</div>
										</div>
										
										<div class="register-account text-center">
											By hitting the <span class="theme-cl">"Register"</span> button, you agree to the <a class="theme-cl" href="#">Terms conditions</a> and <a class="theme-cl" href="#">Privacy Policy</a>
										</div>
										
										<div class="form-groups">
											<button type="button" onClick={this.eformValidation} class="btn btn-primary theme-bg full-width">Register</button>
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
				</div>
			</section>
      </>
        );
    }
}
function mapStateToProps(state) {
  
	return {
  
	  Register_Reducer: state.RegisterReducer,
	}
	
  }
  
  function mapDispatchToProps(dispatch) {
	return bindActionCreators({ AC_ADD_REGISTER,AC_LIST_REGISTER,
								}, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Register);