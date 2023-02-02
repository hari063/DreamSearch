import React from 'react';
class Banner extends React.Component{
    render(){
        return(
          <>
            <section class="banner_section">
            <div class="banner_content">
           
                <div class="banner_img">
                <h1 style={{position: "absolute",
    marginLeft: "370px",
    marginTop: "120px",
    color: "white",
    fontSize:"50px",
    textShadow: "5px 4px #de185a",
    fontFamily: "monospace"}}>Get Your Dream Job Today</h1>
                    <div class="search_content">
                        <div class="container">
                            <div class="search">
                                <form>
                                    <div class="form-row">
                                      <div class="form-group col-md-4 b_right">
                                        <input type="text" class="form-control height" 
                                        placeholder="Job Title or Keywords"/>
                                        <i class="fas fa-search theme-cl"></i>
                                      </div>
                                      <div class="form-group col-md-3 b_right">
                                        <select class="form-control select_height">
                                          <option selected>Choose...</option>
                                          <option>sabari</option>
                                        </select>
                                        <i class="fas fa-map-marker-alt theme-cl"></i>
                                      </div>
                                      <div class="form-group col-md-3">
                                        <select class="form-control select_height">
                                          <option selected>Choose...</option>
                                          <option>sabari</option>
                                        </select>
                                        <i class="fas fa-clone theme-cl"></i>
                                      </div>
                                      <div class="form-group col-md-2">
                                          <button type="submit" class="btn btn-primary w-100 h-100">Search</button>
                                      </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
      {/* Grid section */}
        <section class="new_jobs_section">
        <div class="container-fluid my-5">
            <div class="new_jobs_header my-5">
                    <div class="text-center">
                        <h2>Browse Jobs By <span class="jobs_color">Category</span></h2>
                        <p>Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Aliquip</p>
                    </div>
            </div>
            <div class="job_list">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="javascript:void(0)">
                            <div class="jobs_box">
                                <div class="jobs_box_images">
                                    <img src="images/jobs/ui-design.png"/>
                                </div>
                                <p class="position">UI/UX Designer</p>
                                <p class="skils">CSS3, HTML5, Javascript, Bootstrap, Jquery</p>
                            </div>
                        </a>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="javascript:void(0)">
                            <div class="jobs_box">
                                <div class="jobs_box_images">
                                    <img src="images/jobs/ux.png"/>
                                </div>
                                <p class="position">Web Designing</p>
                                <p class="skils">CSS3, HTML5, Javascript, Bootstrap, Jquery</p>
                            </div>
                        </a>
                        </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="javascript:void(0)">
                            <div class="jobs_box">
                                <div class="jobs_box_images">
                                    <img src="images/jobs/software-developer.png"/>
                                </div>
                                <p class="position">Software Developer</p>
                                <p class="skils">CSS3, HTML5, Javascript, Bootstrap, Jquery</p>
                            </div>
                        </a>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="javascript:void(0)">
                            <div class="jobs_box">
                                <div class="jobs_box_images">
                                    <img src="images/jobs/app.png"/>
                                </div>
                                <p class="position">App Developer</p>
                                <p class="skils">CSS3, HTML5, Javascript, Bootstrap, Jquery</p>
                            </div>
                        </a>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="javascript:void(0)">
                            <div class="jobs_box">
                                <div class="jobs_box_images">
                                    <img src="images/jobs/iphone.png"/>
                                </div>
                                <p class="position">iPhone Developer</p>
                                <p class="skils">CSS3, HTML5, Javascript, Bootstrap, Jquery</p>
                            </div>
                        </a>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <a href="javascript:void(0)">
                            <div class="jobs_box">
                                <div class="jobs_box_images">
                                    <img src="images/jobs/seo.png"/>
                                </div>
                                <p class="position">SEO</p>
                                <p class="skils">CSS3, HTML5, Javascript, Bootstrap, Jquery</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section class="new_jobs_section">
        <div class="container-fluid my-5">
            <div class="new_jobs_header my-5">
                    <div class="text-center">
                        <h2>Hire Expert <span class="jobs_color">Candidate</span></h2>
                        <p>Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Aliquip</p>
                    </div>
            </div>
            <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="slider ml-lg-5 ml-md-5 mt-5 py-lg-5">
                  <div class="row">
                    <div class="col-md-4">
                      <div
                        class="imgContainer ml-lg-n5 mt-lg-0 mt-md-0 ml-md-n5 mt-n5 "
                      >
                        <div class="image">
                          <img src="images/candidate/images_1.jpg"/>
                        </div>
                        <div class="image">
                          <img src="images/candidate/images_2.jpg"/>
                        </div>
                        <div class="image">
                          <img src="images/candidate/images_3.jpg"/>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      {/* slider */}
                      <div
                        id="productSlider"
                        class="carousel slide carousel-fade pr-lg-5 py-lg-0 py-4"
                        data-ride="carousel"
                      >
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <div class="content">
                              <div class="date">
                                26 December 2019
                              </div>
                              <div class="title">
                                Lorem ipsum dolor - one
                              </div>
                              <div class="desc">
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Error itaque, libero dignissimos nihil aliquam
                                eveniet tenetur cupiditate consectetur quod modi
                                repellendus veniam, repellat iusto fugiat temporibus
                                officia facere nulla nam.
                              </div>
                              <div
                                class="d-flex justify-content-center justify-content-lg-start"
                              >
                                <button class="btn readMoreBtn">
                                  Read More
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="carousel-item">
                            <div class="content">
                              <div class="date">
                                26 December 2019
                              </div>
                              <div class="title">
                                Lorem ipsum dolor - two
                              </div>
                              <div class="desc">
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Error itaque, libero dignissimos nihil aliquam
                                eveniet tenetur cupiditate consectetur quod modi
                                repellendus veniam, repellat iusto fugiat temporibus
                                officia facere nulla nam.
                              </div>
                              <div
                                class="d-flex justify-content-center justify-content-lg-start"
                              >
                                <button class="btn readMoreBtn">
                                  Read More
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="carousel-item">
                            <div class="content">
                              <div class="date">
                                26 December 2019
                              </div>
                              <div class="title">
                                Lorem ipsum dolor -three
                              </div>
                              <div class="desc">
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Error itaque, libero dignissimos nihil aliquam
                                eveniet tenetur cupiditate consectetur quod modi
                                repellendus veniam, repellat iusto fugiat temporibus
                                officia facere nulla nam.
                              </div>
                              <div
                                class="d-flex justify-content-center justify-content-lg-start"
                              >
                                <button class="btn readMoreBtn">
                                  Read More
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* indicators */}
                        <ol class="carousel-indicators indicators">
                          <li
                            data-target="#productSlider"
                            data-slide-to="0"
                            class="active"
                          ></li>
                          <li data-target="#productSlider" data-slide-to="1"></li>
                          <li data-target="#productSlider" data-slide-to="2"></li>
                        </ol>
                        {/* <!-- indicators --> */}
                      </div>
                      {/* <!-- slider --> */}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </section>
   {/* <section  class="new_jobs_section">
   <div class="col-lg-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Bordered accordions</h4>
                  <p class="card-description">Use class <code>.accordion-bordered</code> for bordered accordions</p>
                  <div class="mt-4">
                    <div class="accordion accordion-bordered" id="accordion-2" role="tablist">
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-4">
                          <h6 class="mb-0">
                            <a data-bs-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4" class="collapsed">
                              How can I pay for an order I placed?
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-4" class="collapse" role="tabpanel" aria-labelledby="heading-4" data-bs-parent="#accordion-2" style="">
                          <div class="card-body">
                            <p class="mb-0">You can pay for the product you have purchased using credit cards, debit cards, or via online banking. We also provide cash-on-delivery services for most of our products. You can also use your account wallet for payment. </p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-5">
                          <h6 class="mb-0">
                            <a class="collapsed" data-bs-toggle="collapse" href="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
                              I cant sign in to my account
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-5" class="collapse" role="tabpanel" aria-labelledby="heading-5" data-bs-parent="#accordion-2">
                          <div class="card-body">
                              <p>If while signing in to your account you see an error message, you can do the following</p>
                            <ol class="pl-3">
                              <li>Check your network connection and try again</li>
                              <li>Make sure your account credentials are correct while signing in</li>
                              <li>Check whether your account is accessible in your region</li>
                            </ol>
                            <br/>
                            <i class="typcn typcn-warning me-2"></i>If the problem persists, you can contact our support.
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-header" role="tab" id="heading-6">
                          <h6 class="mb-0">
                            <a class="collapsed" data-bs-toggle="collapse" href="#collapse-6" aria-expanded="false" aria-controls="collapse-6">
                              How can I deactivate my account?
                            </a>
                          </h6>
                        </div>
                        <div id="collapse-6" class="collapse" role="tabpanel" aria-labelledby="heading-6" data-bs-parent="#accordion-2" style="">
                          <div class="card-body">
                            <p class="mb-0">If you wish to deactivate your account, you can go to the Settings page of your account. Click on Account Settings and then click on Deactivate.
                            You can join again as and when you wish.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
   </section> */}
  </>

        );
    }
}
export default Banner;