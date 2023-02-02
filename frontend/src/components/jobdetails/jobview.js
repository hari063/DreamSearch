import React from 'react';
class JobView extends React.Component{
    render(){
        return(
            <>
			<div class="col-lg-4 col-md-12 col-12">
            <div class="sidebar">
								<div class="sidebar-container">
									<div class="sidebar-box">
										<span class="sidebar-status">Full Time</span>
										<h4 class="flc-rate">20K - 30K</h4>
										<div class="sidebar-inner-box">
											<div class="sidebar-box-thumb">
												<img src="images/com-2.jpg" class="img-responsive" alt=""/>
											</div>
											<div class="sidebar-box-detail">
												<h4>Google Info</h4>
												<span class="desination">App Designer</span>
											</div>
										</div>
										<div class="sidebar-box-extra">
											<ul>
												<li>Php</li>
												<li>Android</li>
												<li>Html</li>
												<li class="more-skill bg-primary">+3</li>
											</ul>
											<ul class="status-detail">
												<li class="br-1"><strong>Canada</strong>Location</li>
												<li class="br-1"><strong>748</strong>View</li>
												<li><strong>03</strong>Post</li>
											</ul>
										</div>
									</div>
									<a href="#" class="btn btn-sidebar bt-1 bg-success">Apply For This</a>
								</div>
							</div>
							<div class="sidebar-wrapper">
									<div class="sidebar-box-header bb-1">
										<h4>Share This Job</h4>
									</div>
								
									<ul class="social-share">
										<li><a href="#" class="fb-share"><i class="fab fa-facebook icon"></i></a></li>
										<li><a href="#" class="tw-share"><i class="fab fa-twitter icon"></i></a></li>
										<li><a href="#" class="gp-share"><i class="fab fa-google-plus icon"></i></a></li>
										<li><a href="#" class="in-share"><i class="fab fa-instagram icon"></i></a></li>
										<li><a href="#" class="li-share"><i class="fab fa-linkedin icon"></i></a></li>
										<li><a href="#" class="be-share"><i class="fab fa-behance icon"></i></a></li>
									</ul>
								</div>
								</div>
            </>
        );
    }
}
export default JobView;