import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class certificateimages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images:'',
        certificatename:'',
            certificateimages:[],
            imagesImage:'',
            datetime:'',
            // avatarImage:'',
            // coartid:'',
           
            // id:'',
        };
        this.onChange = this.onChange.bind(this);
    }
    
    componentDidMount() {
        this.getcertificateimages()
       
    }
    
    async getcertificateimages() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getcertificateimages`
        })
          .then(response => {
            if (response.data.success === true) {
              this.setState({
                certificateimages: response.data.response
              })
            }
          })
      }
    handleChangeImage = e => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        this.setState({
          images: image_as_base64,
          imagesImage: image_as_files,
        })
      }

      onChange(e) {
        this.setState({
           [e.target.name]: e.target.value
        })
    }

      submitcertificateimages = async event =>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('Certificatename', this.state.Certificatename);
        formData.append('images', this.state.imagesImage);
       
        const obj = Object.fromEntries(formData);
        console.log(obj);
       await axios({
            method: 'post',
             url: `${config.apiUrl}/uploadimages`,
      // headers: { "Authorization": this.loginData.data?.Token },
             data:formData
        }).then(result=>{
        
         if(result.data.success === true ){
             toast.success(result.data.msg, {
               
            });
      
             setTimeout(() => {
                 window.location.reload();
             },2000)        
         }
         if(result.data.success === false ){
            toast.error(result.data.msg, {
               
            });        
         }    
         }).catch(err => {
           toast.error(err?.response?.data?.msg, {
 
          });
       })
 }



async deletecertificateimages(id) {
        
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this User..',
        buttons: [
            {
                label: 'Yes',
                onClick: () =>
                axios({
                    method: 'post',
                    url: `${config.apiUrl}deletecertificateimages`,
                    // headers: { "Authorization": this.loginData?.Token },
                    data: {'id':id.id}
                    
                 })
            .then(result => {

                toast.success(result.data.msg, {
                
                });
                this.getcertificateimages()
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
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="dual-list-box-inner">
                        <div className="row">
                         
                            <div className="common-pre-dz">
                           <h3> Add More Certificate</h3>
                                 
            <div class="form-group">
            <label for="recipient-name" class="col-form-label">Certificate Name:</label>
            <input type="text" name="Certificatename" onChange={this.onChange} value={this.state.Certificatename}   class="form-control" id="recipient-name"/>
        </div>
<div className="btn-group images-cropper-pro">
<label title="Upload image file" htmlFor="inputImage" className="btn btn-primary img-cropper-cp" >
   <input type="file"   name="images"  onChange={this.handleChangeImage}  class="form-control" />
           Upload new image
                                    </label>
                                    
                                  </div>
                                  <button className="btn btn-primary" id="btn_add_certificate" onClick={this.submitcertificateimages}>Add</button>
                                </div>
                               

                          <div className="col-md-8 col-md-8 col-sm-8 col-xs-12">
                            <div className="preview-img-pro-ad">
                              <div className="img-croper-fl">
                               

                                
                                <table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">S.NO</th>
                                      <th data-field="name" data-editable="true">Certificate Name</th> 
                                      <th data-field="name" data-editable="true">Certificates</th> 
                                      <th data-field="name" data-editable="true">DateTime</th>    
                                      <th data-field="action">Action</th>
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                     {this.state.certificateimages.map((item,i) => (
                                      <tr>
                                        <td>{i+1}</td>
                                        <td>{item.Certificatename}</td>
                                        <td><img width={'50px'} src={`${config.imageUrl + item.	images}`}/>
                                        </td>
                                        <td>{(item.datetime.replace('.000Z', '')).replace('T', ' ')}</td>
                                        <button className=" btn-danger" onClick={this.deletecertificateimages.bind(this,item)} data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> 
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
