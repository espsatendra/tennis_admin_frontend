import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class mycoach extends Component {

    constructor(props) {
        super(props)
        this.state = {
          // time_slot:[],
          name:'',
          email:'',
          phone: '',
          bio: '',
          avatar: '',
          fee : '',
          ip: '',
          avatarImage:'',
          // timeslot:'',
          mycoach: [],
          activitydetail: [],
          mycoachdetails:[]
        };
        // this.loginData = (!Cookies.get('adminLoginSuccess')) ? [] : JSON.parse(Cookies.get('adminLoginSuccess'));
     
        this.handleReturnResult = this.handleReturnResult.bind(this);
        this.onChange = this.onChange.bind(this);
      }
    

      handleChange=event=> {
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }
      
      onChange(e) {
        this.setState({
           [e.target.name]: e.target.value
        })
      
    
     }
     componentDidMount() {
   
      this.getmycoachAPI() 
      } 

     async getmycoachAPI() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getmycoachdetails`
        })
          .then(response => {
            if (response.data.success === true) {
              this.setState({
                mycoach: response.data.response
              })
            }
          })
      }


      async deletecoachdetails(id) {
        
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this User..',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                    axios({
                        method: 'post',
                        url: `${config.apiUrl}deletecoachdetails`,
                        // headers: { "Authorization": this.loginData?.Token },
                        data: {'id':id.id}
                     })
                .then(result => {

                    toast.success(result.data.msg, {
                    
                                                     });
                                                     this.getmycoachAPI();
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
          let timeslot=this.state.timeslot;
          const formData = new FormData();
          formData.append('name', this.state.name);
          formData.append('email', this.state.email);
          formData.append('phone', this.state.phone);
          formData.append('bio', this.state.bio);
          formData.append('avatar', this.state.avatarImage);
          formData.append('fee', this.state.fee);
          formData.append('ip', this.state.ip);
          // formData.append('timeslot', timeslot);
          const obj = Object.fromEntries(formData);
          console.log(obj);
         await axios({
              method: 'post',
               url: `${config.apiUrl}/insertcoachdetails`,
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
   handleReturnResult = ev => {
    this.setState({
        [ev.target.name]: ev.target.value
    });
   
}

  

  

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
                              <h1>Coach Details
                                <button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#exampleModal" id="my_coart_btn">
                                Add
                              </button>
                              </h1>
                              </div>
                            </div>
                            <div className="sparkline13-graph">
                            

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
            <label for="recipient-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="recipient-name" name="name" onChange={this.onChange} value={this.state.name}/>
        </div>


        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Email:</label>
            <input type="text" class="form-control" id="recipient-name" name="email" onChange={this.onChange} value={this.state.email}/>
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">PHONE:</label>
            <input type="text" name="phone" onChange={this.onChange} value={this.state.phone} class="form-control" id="recipient-name"  />
        </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">BIO:</label>
            <textarea class="form-control" name="bio" onChange={this.onChange} value={this.state.bio} id="message-text"></textarea>
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Image:</label>
  <a><img className="main-logo" style={{width:'50px',height:'50px'}}  src={this.state.avatar} alt="ffdsfd" /></a>
   <input type="file"   name="avatar"  onChange={this.handleChangeImage}  class="form-control" />
           
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">FEE:</label>
            <input type="text" name="fee" onChange={this.onChange} value={this.state.fee} class="form-control" id="recipient-name"/>
        </div>
        <div class="form-group">
            <label for="recipient-name"  class="col-form-label">IP:</label>
            <input type="text" name="ip" onChange={this.onChange} value={this.state.ip} class="form-control" id="recipient-name"/>
        </div>
        
      </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button className="btn btn-primary"  onClick={this.submitcoachForm}>Save changes</button>
            </div>
 
            </form>
          </div>
        </div>
      </div>

                                
          <br/>     
                            
                            
          <div className="table-responsive">
                                {/* <div id="toolbar">
                                </div> */}
                                <table id="table_mycoach" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">ID</th>
                                      <th data-field="name" data-editable="true">Name</th>
                                      <th data-field="name" data-editable="true">EMAIL</th>
                                      <th data-field="name" data-editable="true">PHONE</th>
                                      <th data-field="name" data-editable="true">BIO</th>
                                      <th data-field="name" data-editable="true">IMAGE</th>
                                      <th data-field="name" data-editable="true">FEE</th>
                                      <th data-field="name" data-editable="true" style={{width:'1px'}}>IP</th>
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">TIME SLOT</th>
                                    </tr>
                                  </thead>
                                  <tbody>
{this.state.mycoach.map ((item) => (
                                      <tr>
                                      <td>{item.id}</td>
                                      <td>{item.name}</td>
                                      <td>{item.email}</td>
                                      <td>{item.phone}</td>
                                      <td>{item.bio.substr(0, 4)}....</td>
                                      <td><img style={{width:'50px',height:'50px'}} src={`${config.imageUrl + item.avatar}`}/></td>
                                      <td>{item.fee}</td>
                                      <td  style={{width:'1px'}}>{item.ip}</td>
                                      
                                      <Link to={`${config.baseUrl}mycoachupdate/${item.id}`} >
                                          <button class="pd-setting-ed" data-original-title="Edit">
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </button></Link>
                                          <button  className=" btn-danger" onClick={this.deletecoachdetails.bind(this,item)}  data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> </button> 
                                          {/* <td>{item.start_time} - {item.end_time}</td> */}
                                          <td> 
                                          <a className="btn btn-default btn-sm" href={`${config.baseUrl}coachtimeslot/${item.id}`}> Update Time</a>
                                          </td>
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
