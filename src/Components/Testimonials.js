import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class Testimonials extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name:'',
            images: '',
            title: '',
            descrption : '',
          
            imagesImage:'',
          Testimonials:[],
          
       
        };
       
        this.onChange = this.onChange.bind(this);
      }
    

   
      
      onChange(e) {
        this.setState({
           [e.target.name]: e.target.value
        })
      
    
     }

     componentDidMount() {
   
      this.getTestimonialsAPI() 
      } 

     async getTestimonialsAPI() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getTestimonials`
        })
          .then(response => {
            if (response.data.success === true) {
              this.setState({
                Testimonials: response.data.response
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

submiFormTestimonials = async event =>{
          event.preventDefault();
          const formData = new FormData();
          formData.append('name', this.state.name);
          formData.append('images', this.state.imagesImage);
          formData.append('title', this.state.title);
          formData.append('descrption', this.state.descrption);
         
          const obj = Object.fromEntries(formData);
          console.log(obj);
         await axios({
              method: 'post',
               url: `${config.apiUrl}/inserTestimonials`,
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
//    handleReturnResult = ev => {
//     this.setState({
//         [ev.target.name]: ev.target.value
//     });
   
// }

  

  

  render() {
    return (
      <>

<Toaster/>
        <Sidebar />

        <div className="all-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="logo-pro">
                  <a href="index.html"><img className="main-logo" src="img/logo/logo.png" alt="" /></a>
                </div>
              </div>
            </div>
          </div>
          <Header />
          {/* Basic Form Start */}
          <div className="basic-form-area mg-b-15">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="sparkline12-list">
                    <div className="data-table-area mg-b-15">
                      <div className="container-fluid">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* <div class="add-product">
                            <a href="add-department.html">Add Details </a>
                          </div> */}
                          <div className="sparkline13-list">
                            <div className="sparkline13-hd">
                              <div className="main-sparkline13-hd">
                                <h1>Testimonials</h1>
                                <h3>SUCCESSFUL STORIES</h3>
                              </div>
                            </div>
                            <div className="sparkline13-graph">
                              
                            <h1>
                            <button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#exampleModal">
                                Add
                              </button>
</h1>
<div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Fill Data</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form action="#" method="POST" encType="multipart/form-data">
            <div className="modal-body">
            <div class="modal-body">

            <div class="form-group">
            <label for="recipient-name" class="col-form-label">User Name:</label>
            <input type="text" class="form-control" id="recipient-name" name="name" onChange={this.onChange} value={this.state.name} />
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Image:</label>
  <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.images}   alt="ffdsfd" /></a>
   <input type="file"   name="images"  onChange={this.handleChangeImage}   class="form-control" />
           
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Title:</label>
            <input type="text" name="title"  onChange={this.onChange} value={this.state.title} class="form-control" id="recipient-name"/>
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">	Descrption:</label>
            <textarea type="text" class="form-control" id="recipient-name" name="descrption" onChange={this.onChange} value={this.state.descrption} />
        </div>
              
      </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button className="btn btn-primary" onClick={this.submiFormTestimonials} >Save changes</button>
            </div>
 
            </form>
          </div>
        </div>
      </div>

                                     
                              <div className="datatable-dashv1-list custom-datatable-overright">
                                <div id="toolbar">
                                </div>
                                <table id="table" className="table table-bordered table-striped table-hover" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">S.NO.</th>
                                      <th data-field="name" data-editable="true">UserName</th>
                                      <th data-field="name" data-editable="true">Images</th>
                                      <th data-field="name" data-editable="true">Title</th>
                                      <th data-field="name" data-editable="true">Descrption</th>
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">Date Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
{this.state.Testimonials.map ((item,i) => ( 
                                      <tr>
                                      <td>{i+1}</td>
                                      <td>{item.name}</td>
                                      <td><img width={'50px'} src={`${config.imageUrl + item.images}`}/></td>
                                      <td>{item.title}</td>
                                     
                                      <td>{item.descrption}</td>
                                      
                                        <Link to={`${config.baseUrl}updatetestimonials/${item.id}`} >
                                          <button class="pd-setting-ed" data-original-title="Edit">
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </button>
                                           </Link>  
                                          
                                        
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







                      {/* </div> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>

      </>

    )
  }
}
