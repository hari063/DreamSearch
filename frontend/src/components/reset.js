import React from 'react';
import {AC_NEW_PASSWORD} from './actions/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Reset extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            password:'',
            passwordError:false,
            passwordPatternError:false,
        }
        this.formValidation= this.formValidation.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
      
    }
    formValidation(){

        const password=this.state.password;
        const token=this.props.Login_Reducer.listRegister;
        console.log("token",token)
        password?this.setState({passwordError:false}):this.setState({passwordError:true})
        
        if(password){
            const userData = {
                password: this.state.password,

          }
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
    }
    render(){
        return(
     <>
     <section class="inner_header_title inner-header-title">
  		<div class="inner_header_bg">
  			<div class="container">
					<h1 class="login">Reset your Password</h1>
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
                                        Please enter the new password you'd like to change</div>
                                    <div class="form-group">
										<label>New password</label>
										<div class="input-with-icon">
											<input type="text" defaultValue={this.state.password} id="password" onChange={this.handleInputChange} class="form-control" placeholder="Enter Your Password"/>
                                            {this.state.passwordError?<div style={{color:'red'}}>* Password is required</div>:''}
                   						 {this.state.passwordPatternError?<div style={{color:'red'}}>* Password should contain atleast one letter, one number </div>:''}

											<i class="fas fa-lock theme-cl"></i>
										</div>
										
									</div>
                                 
                                    <div class="form-groups">
										<button type="submit" onClick={this.formValidation}  class="btn btn-primary theme-bg full-width">Reset</button>
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
    return bindActionCreators({ AC_NEW_PASSWORD
                                }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Reset);