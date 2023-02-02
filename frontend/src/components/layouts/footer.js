import React from 'react';
class Footer extends React.Component{
    render(){
        return(
     <>
    {/* <!-- Before_footer_section start--> */}

<section class="before_footer_section">
    <div class="before_footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <div class="email">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email address"/>
                            <span class="input_group_btn">
                              <button class="btn theme_bg" type="submit"><span class="fab fa-telegram-plane"></span></button>
                            </span>
                          </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6">
                    <ul class="count">
                          <li>
                              <span class="count_values">2744</span>
                              <br/><span class="count_text">Jobs Seekers</span>
                          </li>
                          <li>
                              <span class="count_values">2365</span>
                              <br/><span class="count_text">Jobs Posted</span>
                          </li>
                          <li>
                              <span class="count_values">2021</span>
                              <br/><span class="count_text">Vacancies</span>
                          </li>
                          <li>
                              <span class="count_values">7542</span>
                              <br/><span class="count_text">Companies</span>
                          </li>
                      </ul>
                </div>
            </div>
        </div>
    </div>
</section>

{/* <!-- Before_footer_section end-->



<!-- footer_section start --> */}

  <section class="footer_section">
    <div class="footer_bg">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div class="logo_text">
                            <h2>Dream <span class="jobs_color">Search</span></h2>
                        <div class="footer_address">
                                  <p>Small Street,<br/> Sangeethamangalam, <br/>Villupuram.</p>
                                  <p><strong>Email:</strong><br/>hello@dreamsearch.com</p>
                                  <p><strong>Call:</strong><br/>91 855 742 62548</p>
                              </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <h4 class="footer_title">Recruiter</h4>
                    <ul class="footer_menu">
                          <li><a href="#">Login</a></li>
                          <li><a href="#">Post jobs</a></li>
                          <li><a href="#">Search Candidates</a></li>
                      </ul>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <h4 class="footer_title">Candidate</h4>
                    <ul class="footer_menu">
                          <li><a href="#">Login</a></li>
                          <li><a href="#">Applied Jobs</a></li>
                          <li><a href="#">Job List</a></li>
                      </ul>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <h4 class="footer_title">Legal </h4>
                    <ul class="footer_menu">
                          <li><a href="#">About Us </a></li>
                          <li><a href="#">Contact Us </a></li>
                          <li><a href="#">FAQ</a></li>
                          
                      </ul>
                </div>
            </div>
        </div>
    </div>
</section>

{/* <!-- footer_section end--> */}
      </>
        );
    }
}
export default Footer;