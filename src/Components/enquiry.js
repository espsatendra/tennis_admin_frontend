import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
 import toast, { Toaster } from 'react-hot-toast';
 import axios from 'axios'
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { confirmAlert } from 'react-confirm-alert';
export default class enquiry extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
          name:'',
          phone: '',
          email:'',
          summary: '',
       
        }
            this.handleChange=this.handleChange.bind(this);
            this.submitenquiry = this.submitenquiry.bind(this);
           
            }
    
    
            // componentDidMount() {
            //     if(Cookies.get('loginSuccessAdmin')){
            //         window.location.href =`${config.baseUrl}`
            //      }
                
            // }
    
            
            handleChange=event=> {
                this.setState({
                    [event.target.name]:event.target.value
                })
                
            }
    
      
            submitenquiry = async (e) => {
              e.preventDefault();
    
              let name=this.state.name;
              let phone=this.state.phone; 
              let email=this.state.email;
            let summary=this.state.summary;
           
                
    
                let formData = new FormData();
        
                formData.append('name',name);
                formData.append('phone', phone);
                formData.append('email', email);
                formData.append('summary', summary);
               
            const obj = Object.fromEntries(formData);
            console.log(obj);
        
            axios.post(`${config.apiUrl}insertenquirydetails`, obj)
    
            .then(response => {
              console.log(response.data);
              toast.success(response.data.msg, {});
              
            //    Cookies.set('loginSuccessAdmin', JSON.stringify(response.data));
    
              setTimeout(() => {
                 window.location.href = `${config.baseUrl}enquiry`;
              }, 1200)
              
    
            })
            .catch(error => {
                // element.parentElement.innerHTML = `Error: ${error.message}`;
                console.error('There was an error!', error);
                toast.error(error.response.data.msg, {});
            });
            
            }

    render() {
        return (
  <>
 <Toaster/> 
        <Sidebar/>
  <div className="all-content-wrapper">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="logo-pro">
            <a href="index.html">
              <img className="main-logo" src="img/logo/logo.png" alt />
            </a>
          </div>
        </div>
      </div>
    </div>
    <Header/>

   
    {/* Basic Image cropper Start */}
    <div className="dual-list-box-area mg-b-15">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="sparkline10-list shadow-reset">
            
              <div className="sparkline10-graph">
                <div className="basic-login-form-ad">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="dual-list-box-inner">
                        <div className="row">
                         
                            <div className="common-pre-dz">
                           <h3> Fill Enquiry .........</h3>
                                
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Name</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="name" value={this.state.name} onChange={this.handleChange}   className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="name........." />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Contact</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}  className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="contact.........." />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Email</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="email"  value={this.state.email} onChange={this.handleChange} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Email........" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Summary</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <textarea type="text" name="summary" value={this.state.summary}  onChange={this.handleChange} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Summary............" />
                                              </div>                
                                
                                </div>
                                
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <button className="btn btn-primary" id="submit_enquiry" onClick={this.submitenquiry}  >Submit</button> 

            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Basic Image cropper End*/}
    <Footer/>
    
  </div>
  
 </>

 )
}
}
