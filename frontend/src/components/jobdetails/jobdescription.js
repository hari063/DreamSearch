import React from 'react';
class JobDescription extends React.Component{
    render(){
        return(
            <>
          
							<div class="container-detail-box">
								<div class="apply-job-header">
									<h4>Front End Developer</h4>
									<a href="company-detail.html" ><span class="cl-success"><i class="fa fa-building"></i>Google</span></a>
									<span><i class="fa fa-map-marker"></i>United Kingdom</span>
								</div>
								
								<div class="apply-job-detail">
									<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
									<p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
								</div>
								
								<div class="apply-job-detail">
									<h5>Skills</h5>
									<ul class="skills">
										<li>Css3</li>
										<li>Html5</li>
										<li>Photoshop</li>
										<li>Wordpress</li>
										<li>PHP</li>
										<li>Java Script</li>
									</ul>
								</div>
								
								<div class="apply-job-detail">
									<h5>Requirements</h5>
									<ul class="job-requirements">
										<li><span>Availability Hourly</span></li>
										<li><span>Education Graduate</span></li>
										<li><span>Age 25+</span></li>
										<li><span>Experience Intermidiate (3 - 5Year)</span></li>
										<li><span>Language English, Hindi</span></li>
									</ul>
								</div>
								
								<a href="#" class="btn btn-success">Apply For This Job</a>
								
							</div>
							
            </>
        );
    }
}
export default JobDescription;