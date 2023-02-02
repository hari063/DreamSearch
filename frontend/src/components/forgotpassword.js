import React from 'react';
import {AC_FORGOT_PASSWORD} from './actions/login';
import {AC_LIST_REGISTER} from './actions/register';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

class ForgotPassword extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            emailError:false,
            emailPatternError:false,
        }
        this.formValidation= this.formValidation.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
      
    }
    formValidation(){
        var listRegister=this.props.Register_Reducer.listRegister;
        const email=this.state.email;
        email?this.setState({emailError:false}):this.setState({emailError:true})
        for (var i = 0; i < listRegister.length; i++){

			if(listRegister[i].email==email){
			  var flag=0;
			  break;
			}
			else{
			  flag=1;
			}
		  }
		  if(flag==1){
			swal("Oops!", "Email doesn't exist", "error");
		  }
          else{
          if(email){
            const userData = {
                email: this.state.email,
          }
          console.log(userData)
          this.props.AC_FORGOT_PASSWORD(userData);
          swal("Success!", "Reset email is sent to your registered email id, Please check your email to reset your password.", "success");
          setTimeout(() => {
		
		  }, 2000);
        }

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
    }
    render(){
        return(
     <>
     <section class="inner_header_title inner-header-title">
  		<div class="inner_header_bg">
  			<div class="container">
					<h1 class="login">Forgot your Password</h1>
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
                                        Please enter the email address you'd like your password reset information sent to
                                    </div>
                                    <div class="form-group">
										<label>Email</label>
										<div class="input-with-icon">
											<input type="text" defaultValue={this.state.email} id="mail" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your Email"/>
											{this.state.emailError?<div style={{color:'red'}}>* Email is required</div>:''}
                    						{this.state.emailPatternError?<div style={{color:'red'}}>* Enter valid email!</div>:''}
												
											<i class="fas fa-lock theme-cl"></i>
										</div>
										
									</div>
                                    <div class="form-groups">
										<button type="submit" onClick={this.formValidation}  class="btn btn-primary theme-bg full-width">Request reset link</button>
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
  
      Login_Reducer: state.LoginReducer,
      Register_Reducer: state.RegisterReducer,

    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_FORGOT_PASSWORD,AC_LIST_REGISTER,
                                }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);