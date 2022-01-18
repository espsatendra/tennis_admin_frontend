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
          service:'',
          address:'',
          phone1: '',
          phone2: '',
          email:'',
          mailaddress:'',
          message: '',
          datetime:'',
          contactus:[],
          contactusdetails :[],
       
        }
            this.handleChange=this.handleChange.bind(this);
            // this.submitenquiry = this.submitenquiry.bind(this);
            this.onChange = this.onChange.bind(this);
           
            }
    
    
            
            handleChange=event=> {
                this.setState({
                    [event.target.name]:event.target.value
                })
                
            }
    
            componentDidMount() {

                this.getmycontactusrecordAPI()
                this.getcontactusdetails()
              }

            async getmycontactusrecordAPI() {
                await axios({
                  method: 'get',
            url: `${config.apiUrl}getcontactus`
                })
                  .then(response => {
                    if (response.data.success === true) {
                      this.setState({
                        contactus: response.data.response
                      })
                    }
                  })
              }


              onChange(e) {
                this.setState({
                   [e.target.name]: e.target.value
                })
              
                this.setState(prevState =>    ({
                  contactusdetails : {...prevState.contactusdetails,[e.target.name]:e.target.value}
                  }))
            
             }
           
            async getcontactusdetails() {
              await axios({
                method: 'get',
                url: `${config.apiUrl}getcontactusdetails`
                
              })
                .then(response => {
                  if (response.data.success === true) {
                    let coartData = response.data.response;
                   
                    this.setState({
                      contactusdetails : response.data.response[0],
                     
                      
                    })
                    // console.log(response.data.response);
                  }
                })
            }
          

            handleSubmit = async (event) => {
                event.preventDefault();
                const {address,phone1,phone2,mailaddress} = this.state.contactusdetails
              axios({
                method: 'post',
                url: `${config.apiUrl}updatecontactusdetails`,
                data: {address:address,phone1:phone1,phone2:phone2,mailaddress:mailaddress}
            }).then(response => {
                 if (response.data.success === true) {
                    toast.success(response.data.msg, {});
                    setTimeout(() => {
                      window.location.href = `${config.baseUrl}contactus`;
                    }, 1000);
                 }
                 else if (response.data.success === false) {
                    toast.error(response.data.msg, {});
                 }
              })
              .catch(err => {
                 toast.error(err?.response?.data?.msg, {
        
                 });
              })
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
                           <h3> Record Contact Us .........</h3>
                                
                           <div className="table-responsive">
                                <div id="toolbar">
                                </div>
                                <table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">ID</th>
                                      <th data-field="name" data-editable="true">Name</th>
                                      <th data-field="name" data-editable="true">email</th>
                                      <th data-field="name" data-editable="true">services</th>
                                      <th data-field="name" data-editable="true">Summary</th>
                                      <th data-field="name" data-editable="true">Date</th>
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                             {this.state.contactus.map((item,i) => ( 
                                      <tr>
                                        <td>{i+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.service == 1 ? <span>Balance body mind</span> : item.service == 2 ? <span>Physical activity</span>: item.service == 3 ? <span>support and motivation</span>:<span>exrcise program</span>}</td>
                                        <td>{item.message}</td>
                                        <td>{(item.datetime.replace('.000Z', '')).replace('T', ' ')}</td>
                                        


                                        
                                        
                                      </tr>
                                     ))} 
                                  </tbody>

                                </table>
                              </div>






       
                                </div>
                                
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            
            
            </div>
          </div>
        </div>

        <div className="common-pre-dz">
                           <h3> Contact us Details .........</h3>
                                
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Address</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="address" value={this.state.contactusdetails.address} onChange={this.onChange}   className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="address........." />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >phone1</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="phone1" value={this.state.contactusdetails.phone1} onChange={this.onChange}  className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="contact1.........." />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >phone2</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="phone2"  value={this.state.contactusdetails.phone2} onChange={this.onChange}  className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="contact2.........." />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Email</label>
                                              </div>
                                              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="mailaddress"  value={this.state.contactusdetails.mailaddress}  onChange={this.onChange} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Email........" />
                                              </div>
                                                          
                                
                                </div>
        
      </div>
      <button className="btn btn-primary" id="btn_update_contactus" onClick={this.handleSubmit} >Update</button>
    </div>




    
    {/* Basic Image cropper End*/}
    <Footer/>
    
  </div>
  
 </>

 )
}
}
