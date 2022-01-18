import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class Facilities extends Component {

    constructor(props) {
        super(props)
        this.state = {
          Facilities:[],
            facilities:'',
            coartid:'',
            // coart_name:'',
            id:'',
            
        };
     
     const { match: { params } } = this.props;
     this.coartid = params.coartid;
    }


    componentDidMount() {
    this.getcoartfacilites()
    this.getcoartname()

    }
    async getcoartfacilites() {
        await axios.post(`${config.apiUrl}getcoartfacilities`,{'coartid':this.coartid},)
            .then(result => {
                const data = result.data;
                console.log("ABC", result.data.response)
    
                if (result.data.success === true) {
                     this.setState({
                        Facilities: result.data.response
                    })
                }

                else{
                  this.setState({
                    Facilities: []
                  })
              }
          })
            .catch(err => {
            })
    }


    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    
    registerNow = async (e) => {
      e.preventDefault();
      let facilities = this.state.facilities;
    let  coartid= this.coartid;
      let formData = new FormData();
    
      formData.append('facilities', facilities);
       formData.append('coartid', coartid);
      // formData.append('address', address);
      // formData.append('Summary', Summary);
    
    
      const obj = Object.fromEntries(formData);
      console.log(obj);
    
      axios.post(`${config.apiUrl}insertcoartfacilities`, obj)
        .then(response => {
          console.log(response.data);
          toast.success(response.data.msg, {});
          window.location.reload()
        })
        .catch(error => {
          // element.parentElement.innerHTML = `Error: ${error.message}`;
          console.error('There was an error!', error);
          toast.error(error.response.data.msg, {});
        });
    
    }
    
    async getcoartname() {
      await axios.post(`${config.apiUrl}getcoartname`, {'id':this.coartid},)
          .then(result => {
              const data = result.data;
              console.log("ABC", result.data.response)
    
              if (result.data.success === true) {
                   this.setState({
                      coart_name: result.data.response[0].coart_name
                  })
              }
          })
          .catch(err => {
          })
    }


    async deletecoartfacilities(id) {
        
      confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to delete this User..',
          buttons: [
              {
                  label: 'Yes',
                  onClick: () =>
                  axios({
                      method: 'post',
                      url: `${config.apiUrl}deletecoartfacilities`,
                      // headers: { "Authorization": this.loginData?.Token },
                      data: {'id':id}
                      
                   })
              .then(result => {
    
                  toast.success(result.data.msg, {
                  
                  });
                  this.getcoartfacilites()
              }).catch((error) => {
                 toast.danger(error.data.msg, {
                    
                 });
              })
                                             
                                       },
           {
               label: 'No',
           }
       ]
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
                    <div className="col-lg-4 col-md-8 col-sm-8 col-xs-8">
                      <div className="dual-list-box-inner">
                        <div className="row">
                         
                            <div className="common-pre-dz">
                           <h3> hi....</h3>
                           <h3>{this.state.coart_name}</h3>
                                  <input type="text" class="form-control" name="facilities" value={this.state.facilities} onChange={this.handleChange} id="recipient-name"/> <br/>

                                  <button className="btn btn-primary" onClick={this.registerNow}   >Save changes</button>
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

        <div className="col-md-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="preview-img-pro-ad">
                              <div className="img-croper-fl">
                                
                                <table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">S.NO</th>
                                      <th data-field="name" data-editable="true">Facilities</th>    
                                      <th data-field="action">Action</th>
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                      {this.state.Facilities.map((item,i) => ( 
                                      <tr>
                                        <td>{i+1}</td>
                                        <td>{item.facilities} </td>
                                        <button className=" btn-danger" onClick={this.deletecoartfacilities.bind(this,item.id)} data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> 
                                        </button>
                                        
                                        
                                      </tr>
                                      ))}  
                                  </tbody>

                                </table>
                              
                              
                              </div>
                              
                              
                            </div>
                          </div>


      </div>
    </div>
  
    <Footer/>
    
  </div>
  
 </>

 )
}
}
