import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
import axios from 'axios'

export default class homeadditionalservices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            homeadditional:[],
           
        };
 
    }
    
    componentDidMount() {
     this.gethomeadditionalservicesAPI()
       
    }
    
    async gethomeadditionalservicesAPI() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}gethomeadditionalservices`
          
        })
          .then(response => {
            if (response.data.success === true) {
              let coartData = response.data.response;
             
              this.setState({
                homeadditional : response.data.response,
               
                
              })
             
            }
          })
      }


    render() {
        return (
  <>

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
                                      <th data-field="name" data-editable="true">Images</th>
                                      <th data-field="name" data-editable="true">Heading1</th>
                                      <th data-field="name" data-editable="true">Heading2</th>
                                      <th data-field="name" data-editable="true">Descriptionname1</th>
                                      <th data-field="name" data-editable="true">Description1</th>
                                      <th data-field="name" data-editable="true">Descriptionname2</th>
                                      <th data-field="name" data-editable="true">Description2</th>
                                      <th data-field="name" data-editable="true">Descriptionname3</th>
                                      <th data-field="name" data-editable="true">Description3</th>    
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">Date Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
       {this.state.homeadditional.map((item,i) => (  
                                      <tr>
                                        <td>{i+1}</td>
                                        <td><img style={{width:'50px',height:'50px'}} src={`${config.imageUrl + item.images}`}/></td>
                                        <td>{item.heading1}</td>
                                        <td>{item.heading2}</td>
                                        <td>{item.discrption_name_1}</td>
                                        <td>{item.discrption_1}</td>
                                        <td>{item.discrption_name_2} </td>
                                        <td>{item.discrption_2}</td>
                                        <td>{item.discrption_name_3}</td>
                                        <td>{item.discrption_3}</td>
                                       
                                          <td> 
                               <a className="btn btn-default btn-sm" href={`${config.baseUrl}updatehomeadditionalservices/${item.id}`} > Edit</a>
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
