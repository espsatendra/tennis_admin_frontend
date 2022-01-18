import React, { Component } from 'react';
import config from '../config/config'
export default class sidebar extends Component {
      
    render() {
        return (
  <>

<div className="left-sidebar-pro">
          <nav id="sidebar" className>
            <div className="sidebar-header">
              <a href="index.html"><img className="main-logo" src="img/logo-light.png" alt="" style={{height:'50px',width:'150px'}} /></a>
              <strong><a href="index.html"><img src="img/logo/logosn.png" alt="" /></a></strong>
            </div>
            <div className="left-custom-menu-adp-wrap comment-scrollbar">
              <nav className="sidebar-nav left-sidebar-menu-pro">
                <ul className="metismenu" id="menu1">
                  <li className="active">
                    <a className="" href={`${config.baseUrl}home`} >
                      <span className="educate-icon educate-home icon-wrap" />
                      <span className="mini-click-non">Dashboard</span>
                    </a>
                   
                  </li>
                  {/* <li>
                    <a title="Landing Page" href="" aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Users</span></a>
                  </li> */}
                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}mycoach`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Coach</span></a>
                  </li>
                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}mycoart`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Coart Booking</span></a>
                  </li>
                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}enquiry`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">My Enquiry</span></a>
                  </li>
                  {/* <li>
                    <a title="Landing Page" href={`${config.baseUrl}homepage`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Home Page</span></a>
                  </li> */}

                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}contactus`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Contact Us</span></a>
                  </li>
                 
                  <li>
                    <a className="Landing Page" href={`${config.baseUrl}myplan`} aria-expanded="false"><span className="educate-icon educate-course icon-wrap"  /> <span className="mini-click-non">Package Plans</span></a>
                    
                  </li>
                  

                  

                  <li>
                    <a className="has-arrow" href={`${config.baseUrl}home`} aria-expanded="false"><span className="educate-icon educate-department icon-wrap" /> <span className="mini-click-non"> Website Content</span></a>
                    <ul className="submenu-angle" aria-expanded="false">
                    <li>
                    <a className="Landing Page" href={`${config.baseUrl}homeadditionalservices`} aria-expanded="false"><span className="educate-icon educate-library icon-wrap" /> <span className="mini-click-non">Home Additional Services</span></a> 
                    </li>
                    <li>
                    <a className="Landing Page" href={`${config.baseUrl}Testimonials`}  aria-expanded="false"><span className="educate-icon educate-library icon-wrap" /> <span className="mini-click-non">Testimonials</span></a>
                    </li>

                    <li>
                    <a className="Landing Page" href={`${config.baseUrl}homeslider`}  aria-expanded="false"><span className="educate-icon educate-library icon-wrap" /> <span className="mini-click-non">Home Slider</span></a>
                    
                  </li>

                  <li>
                    <a className="Landing Page" href={`${config.baseUrl}websitecontent`} aria-expanded="false"><span className="educate-icon educate-library icon-wrap" /> <span className="mini-click-non">Website Content</span></a>
                    
                  </li>

                  <li>
                    <a className="Landing Page" href={`${config.baseUrl}overservices`}  aria-expanded="false"><span className="educate-icon educate-library icon-wrap" /> <span className="mini-click-non">Over Services</span></a>
                    
                  </li>
                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}certificateimages`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Certificate</span></a>
                  </li>
                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}faq`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">FAQ</span></a>
                  </li>

                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}terms_condition`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Terms & Condition</span></a>
                  </li>

                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}privacy_policy`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Privacy & Policy </span></a>
                  </li>

                  <li>
                    <a title="Landing Page" href={`${config.baseUrl}demo`} aria-expanded="false"><span className="educate-icon educate-event icon-wrap sub-icon-mg" aria-hidden="true" /> <span className="mini-click-non">Demo </span></a>
                  </li>
                    </ul>
                  </li>
                  
                  <li id="removable">
                    <a  href="#" aria-expanded="false"><span className="educate-icon educate-pages icon-wrap" /> <span className="mini-click-non">Logout</span></a>
                   
                  </li>
                  
                </ul>
              </nav>
            </div>
          </nav>
        </div>


  </>
        )
    }
}