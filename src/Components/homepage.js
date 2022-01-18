import React, { Component } from 'react';
import config from '../config/config'
 import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'

export default class homepage extends Component {

    render() {
        return (
  <>
       
       <Sidebar/>
       
        <div className="all-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="logo-pro">
                  <a href="#"><img className="main-logo" src="img/logo/logo.png" alt="" /></a>
                </div>
              </div>
           
         <Header/>
          
          <div className="contacts-area mg-b-15">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="student-inner-std res-mg-b-30">
                  <label class="control-label mb-10">Banner</label>
                    <div className="student-img">
                      <img style={{width:'500px'}} src="img/student/1.jpg" alt="" />
                      <input type="file" name="logo" class="form-control"></input>
                    </div>
                  </div>
                  <div className="student-inner-std res-mg-b-30">
                  <label class="control-label mb-10">Banner</label>
                    <div className="student-img">
                      <img style={{width:'500px'}} src="img/student/1.jpg" alt="" />
                      <input type="file" name="logo" class="form-control"></input>
                    </div>
                  </div>
                  <div className="student-inner-std res-mg-b-30">
                  <label class="control-label mb-10">Banner</label>
                    <div className="student-img">
                      <img style={{width:'500px'}} src="img/student/1.jpg" alt="" />
                      <input type="file" name="logo" class="form-control"></input>
                    </div>
                  </div>
                  <div className="student-inner-std res-mg-b-30">
                  <label class="control-label mb-10">Banner</label>
                    <div className="student-img">
                      <img style={{width:'500px'}} src="img/student/1.jpg" alt="" />
                      <input type="file" name="logo" class="form-control"></input>
                    </div>
                  </div>
                  <div className="student-inner-std res-mg-b-30">
                  <label class="control-label mb-10">Banner</label>
                    <div className="student-img">
                      <img style={{width:'500px'}} src="img/student/1.jpg" alt="" />
                      <input type="file" name="logo" class="form-control"></input>
                    </div>
                  </div>    
                </div>
               
              </div>
              
            </div>
          </div>
          </div>
          </div>
          </div>
         <Footer/>
  </>

        )
    }
}





