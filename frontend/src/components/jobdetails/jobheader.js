import React from 'react';
class JobHeader extends React.Component{
    render(){
        return(
            <>
			 <section class="jobs_header_section">
            <div class="jobs_header_bg">
  			<div class="container">
		  		<div class="jobs_header">
		  			<div class="row">
			  			<div class="col-xl-2 col-lg-2 col-md-3 col-12">
			  				<div class="job_details_img">
			            <img src="images/jobs/ui-design.png"/>
			          </div>
			  			</div>
			  			<div class="col-xl-7 col-lg-7 col-md-9 col-12">
			  				<div class="right_top_padding">
			  					<h3>Front End Developer</h3>
										<p class="company_name">Google</p>
										<ul>
											<li>
												<a href="#"><i class="fa fa-user"></i> 7 Vacancy</a>
												</li>
											<li>
												<div class="star_rating">
													<span class="rating">4.2</span>
													<span class="fa fa-star fill"></span>
													<span class="fa fa-star fill"></span>
													<span class="fa fa-star fill"></span>
													<span class="fa fa-star fill"></span>
													<span class="fa fa-star-half fill"></span>
												</div>
											</li>
											<li><img class="flag" src="assets/img/gb.svg" alt=""/> 
												<span class="city">United Kingdom</span></li>
											<li><div class="verified_action">Verified</div></li>
										</ul>
			  				</div>
			  			</div>
			  			<div class="col-xl-3 col-lg-7 col-md-5 bl-1 br-gary">
			  				<div class="right-side-detail">
									<ul>
										<li><span class="detail-info">Availability</span>Full Time</li>
										<li><span class="detail-info">Experience</span>5 Year</li>
										<li><span class="detail-info">Age</span>22+ Year</li>
									</ul>
									<ul class="social-info">
										<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
										<li><a href="#"><i class="fab fa-instagram"></i></a></li>
										<li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
									</ul>
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
export default JobHeader;