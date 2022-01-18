import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class coartimages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar:'',
            coartimages:[],
            avatarImage:'',
            coartid:'',
            coart_name:'',
            id:'',
        };
     
    const { match: { params } } = this.props;
    this.coartid = params.coartid;
    }
    
    componentDidMount() {
        this.getcoartimage()
        this.getcoartname()

    }
    
    async getcoartimage() {
        await axios.post(`${config.apiUrl}getcoartimages`, {'coartid':this.coartid},)
            .then(result => {
                const data = result.data;
                console.log("ABC", result.data.response)

                if (result.data.success === true) {
                    this.setState({
                        coartimages: result.data.response
                    })
                }
                else{
                    this.setState({
                        coartimages: []
                    })
                }
            })
            .catch(err => {
            })
    }

    handleChangeImage = e => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        this.setState({
          avatar: image_as_base64,
          avatarImage: image_as_files,
        })
      }

    submitcoachForm = async event =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('coartid',  this.coartid);
        formData.append('avatar', this.state.avatarImage);
        const obj = Object.fromEntries(formData);
        console.log(obj);
       await axios({
            method: 'post',
             url: `${config.apiUrl}/insertcoartimage`,
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


async deletecoartimages(id) {
        
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this User..',
        buttons: [
            {
                label: 'Yes',
                onClick: () =>
                axios({
                    method: 'post',
                    url: `${config.apiUrl}deletecoartimages`,
                    // headers: { "Authorization": this.loginData?.Token },
                    data: {'id':id}
                    
                 })
            .then(result => {

                toast.success(result.data.msg, {
                
                });
                this.getcoartimage()
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
                           <h3> hi....</h3>
                                  <h3>{this.state.coart_name}</h3>

<div className="btn-group images-cropper-pro">
<label title="Upload image file" htmlFor="inputImage" className="btn btn-primary img-cropper-cp" >
   <input type="file"   name="avatar"  onChange={this.handleChangeImage}  class="form-control" />
           Upload new image
                                    </label>
                                    
                                  </div>
                                  <button className="btn btn-primary"  onClick={this.submitcoachForm}>Save changes</button>
                                </div>
                               

                          <div className="col-md-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="preview-img-pro-ad">
                              <div className="img-croper-fl">
                               

                                
                                <table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">S.NO</th>
                                      <th data-field="name" data-editable="true">Images</th>    
                                      <th data-field="action">Action</th>
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                     {this.state.coartimages.map((item,i) => (
                                      <tr>
                                        <td>{i+1}</td>
                                        <td><img width={'50px'} src={`${config.imageUrl + item.avatar}`}/>
                                        </td>
                                        <button className=" btn-danger" onClick={this.deletecoartimages.bind(this,item.id)} data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> 
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
