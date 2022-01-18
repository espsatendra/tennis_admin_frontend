import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class overservices extends Component {

    constructor(props) {
        super(props)
        this.state = {
            servicename:'',
            descrption:'',
            image1: '',
            image2: '',
            heading1: '',
            descrption1 : '',
            heading2: '',
            descrption2:'',
          image1Image:'',
          image2Image:'',
          
          overservices: [],
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
   
      this.getoverservicesAPI() 
      } 

     async getoverservicesAPI() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getoverservicesdetails`
        })
          .then(response => {
            if (response.data.success === true) {
              this.setState({
                overservices: response.data.response
              })
            }
          })
      }


      async deleteoverservices(id) {
        
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this User..',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                    axios({
                        method: 'post',
                        url: `${config.apiUrl}deleteoverservices`,
                        // headers: { "Authorization": this.loginData?.Token },
                        data: {'id':id.id}
                     })
                .then(result => {

                    toast.success(result.data.msg, {
                    
                                                     });
                                                     this.getoverservicesAPI();
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
         handleChangeImage1 = e => {
          let image_as_base64 = URL.createObjectURL(e.target.files[0])
          let image_as_files = e.target.files[0];
      
          this.setState({
            image1: image_as_base64,
            image1Image: image_as_files,
           
          })
        }

        handleChangeImage2 = e => {
            let image_as_base64 = URL.createObjectURL(e.target.files[0])
            let image_as_files = e.target.files[0];
        
            this.setState({
             
              image2: image_as_base64,
              image2Image: image_as_files,
            })
          }

submitoverservicesForm = async event =>{
          event.preventDefault();
          const formData = new FormData();
          formData.append('servicename', this.state.servicename);
          formData.append('descrption', this.state.descrption);
          formData.append('image1', this.state.image1Image);
          formData.append('image2', this.state.image2Image);
          formData.append('heading1', this.state.heading1);
          formData.append('descrption1', this.state.descrption1);
          formData.append('heading2', this.state.heading2);
          formData.append('descrption2', this.state.descrption2);
         
          const obj = Object.fromEntries(formData);
          console.log(obj);
         await axios({
              method: 'post',
               url: `${config.apiUrl}/insertoverservices`,
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
                                <h1>Over Services</h1>
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
            <label for="recipient-name" class="col-form-label">Service Name:</label>
            <input type="text" class="form-control" id="recipient-name" name="servicename" onChange={this.onChange} value={this.state.servicename} />
        </div>


        <div class="form-group">
            <label for="recipient-name" class="col-form-label">	Descrption:</label>
            <textarea type="text" class="form-control" id="recipient-name" name="descrption" onChange={this.onChange} value={this.state.descrption} />
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Image1:</label>
  <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.image1}   alt="ffdsfd" /></a>
   <input type="file"   name="image1"  onChange={this.handleChangeImage1}   class="form-control" />
           
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">image2:</label>
  <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.image2}   alt="ffdsfd" /></a>
   <input type="file"   name="image2" onChange={this.handleChangeImage2}    class="form-control" />
           
        </div>
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Heading1:</label>
            <input type="text" name="heading1"  onChange={this.onChange} value={this.state.heading1} class="form-control" id="recipient-name"/>
        </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Descrption1:</label>
            <textarea class="form-control" name="descrption1"  onChange={this.onChange} value={this.state.descrption1} id="message-text"></textarea>
          </div>
         
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">heading2:</label>
            <input type="text" name="heading2" onChange={this.onChange} value={this.state.heading2}  class="form-control" id="recipient-name"/>
        </div>
        <div class="form-group">
            <label for="recipient-name"  class="col-form-label">descrption2:</label>
            <textarea type="text" name="descrption2" onChange={this.onChange} value={this.state.descrption2} class="form-control" id="recipient-name"/>
        </div>
        
      </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button className="btn btn-primary" onClick={this.submitoverservicesForm} >Save changes</button>
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
                                      <th data-field="name" data-editable="true">ServiceName</th>
                                      <th data-field="name" data-editable="true">Descrption</th>
                                      <th data-field="name" data-editable="true">Image1</th>
                                      <th data-field="name" data-editable="true">Image2</th>
                                      <th data-field="name" data-editable="true">Heading1</th>
                                      <th data-field="name" data-editable="true">Descrption1</th>
                                      <th data-field="name" data-editable="true">Heading2</th>
                                      <th data-field="name" data-editable="true">Descrption2</th>
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">Date Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
{this.state.overservices.map ((item,i) => ( 
                                      <tr>
                                      <td>{i+1}</td>
                                      <td>{item.servicename}</td>
                                      <td>{item.descrption}</td>
                                      <td><img width={'50px'} src={`${config.imageUrl + item.image1}`}/></td>
                                      <td><img width={'50px'} src={`${config.imageUrl + item.image2}`}/></td>
                                      <td>{item.heading1}</td>
                                      <td>{item.descrption1}</td>
                                      <td>{item.heading2}</td>
                                      <td>{item.descrption2}</td>
                                      
                                       <Link to={`${config.baseUrl}updateoverservices/${item.id}`} > 
                                          <button class="pd-setting-ed" data-original-title="Edit">
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </button>
                                           </Link> 
                                          <button  className=" btn-danger" onClick={this.deleteoverservices.bind(this,item)}  data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> </button> 
                                        
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
