import React from 'react';
class Contact extends React.Component{
    render(){
        return(
            <>
            
            <div class="job-detail-statistic flex-middle-sm">
					
                    <div class="statistic-item flex-middle">
                        <div class="icon text-theme theme-cl">
                        <i class="fas fa-headphones theme-cl"></i></div>
                        <span class="text">+91 215 245 6584</span>
                    </div>

                    <div class="statistic-item flex-middle">
                        <div class="icon text-theme">
                        <i class="far fa-envelope theme-cl"></i></div>
                        <span class="text">jobstock@gmail.com</span>
                    </div>

                    <div class="statistic-item flex-middle">
                        <div class="icon text-theme">
                        <i class="fab fa-skype theme-cl"></i></div>
                        <span class="text">themezhub</span>
                    </div>

                </div>
               
            </>
        );
    }
}
export default Contact;