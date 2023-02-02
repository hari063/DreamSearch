import React from 'react';
import Contact from './contact';
import JobDescription from './jobdescription';
import JobHeader from './jobheader';
import JobView from './jobview';
import SimilarJob from './similarjob';
class JobDetail extends React.Component{
    render(){
        return(
            <>
            <JobHeader/>
    <section class="job_details_section">
  		<div class="job_details_padding">
  			<div class="container">	
				<div class="row">
                    <div class="col-lg-8 col-md-12 col-12">
                        <JobDescription/>
                        <Contact/>
                        <SimilarJob/>
                    </div>
                    
                    <JobView/>
                    
                </div>
              </div>
        </div>
    </section>
            </>
        );
    }
}
export default JobDetail;