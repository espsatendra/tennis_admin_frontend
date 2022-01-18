import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class websitecontent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getwebsitecontentdetails:[],
           
        };
 
    }
    
    componentDidMount() {
        this.getwebsitecontentdetails()
       
    }
    
    async getwebsitecontentdetails() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getwebsitecontentdetails`
          
        })
          .then(response => {
            if (response.data.success === true) {
              let coartData = response.data.response;
             
              this.setState({
                getwebsitecontentdetails : response.data.response,
               
                
              })
             
            }
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
                         
                          
                               

                          <div className="col-md-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="preview-img-pro-ad">
                              <div className="img-croper-fl">
                               

                                
                                <table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">S.NO</th>
                                      <th data-field="name" data-editable="true">Heading1</th>
                                      <th data-field="name" data-editable="true">Heading</th>
                                      <th data-field="name" data-editable="true">Description</th>
                                      <th data-field="name" data-editable="true">OvermissionDesc</th>
                                      <th data-field="name" data-editable="true">Overvisiondesc</th>
                                      <th data-field="name" data-editable="true">Images</th>    
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">Date Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
     {this.state.getwebsitecontentdetails.map((item,i) => (
                                      <tr>
                                        <td>{i+1}</td>
                                        <td>{item.heading1}</td>
                                        <td>{item.heading}</td>
                                        <td>{item.description}</td>
                                        <td>{item.overmissiondesc}</td>
                                        <td>{item.overvisiondesc}</td>
                                        <td><img width={'50px'} src={`${config.imageUrl + item.images}`}/>
                                        </td>
                                     
                                       
                                          <td> 
<a className="btn btn-default btn-sm"  href={`${config.baseUrl}updatewebsitecontent/${item.id}`}> Edit</a>
                                        </td>

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
