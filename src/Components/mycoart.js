import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
 import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
 import 'react-confirm-alert/src/react-confirm-alert.css';
 import { confirmAlert } from 'react-confirm-alert';
export default class mycoart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mycoart: [],
      coart_name: '',
      phone: '',
      address: '',
      Summary: '',
      mycoartdetails:[]

    };
    this.handleChange = this.handleChange.bind(this);
    this.registerNow = this.registerNow.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {

    this.getmycoartAPI()
  }
  async getmycoartAPI() {
    await axios({
      method: 'get',
url: `${config.apiUrl}getmycoartdetails`
    })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            mycoart: response.data.response
          })
        }
      })
  }



  registerNow = async (e) => {
    e.preventDefault();
    let coart_name = this.state.coart_name;
    let phone = this.state.phone;
    let address = this.state.address;
    let Summary = this.state.Summary;


    let formData = new FormData();

    formData.append('coart_name', coart_name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('Summary', Summary);


    const obj = Object.fromEntries(formData);
    console.log(obj);

    axios.post(`${config.apiUrl}insertcoartdetails`, obj)
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
                    url: `${config.apiUrl}deletecoartdata`,
                    // headers: { "Authorization": this.loginData?.Token },
                    data: {'coart_id':id.id}
                 })
            .then(result => {

                toast.success(result.data.msg, {
                
                                                 });
                                                 this.getmycoartAPI();
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

        <Toaster />
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
                                <h1>Coart Details
                                <button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#exampleModal" id="my_coart_btn">
                                Add
                              </button>
                              </h1>
                              </div>
                            </div>
                            <div className="sparkline13-graph">

                              {/* <button data-toggle="tooltip" title="" class="pd-setting-ed" data-original-title="Trash">Add</button> */}
                             

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
                                            <label for="recipient-name" class="col-form-label">Coart_Name:</label>
                                            <input type="text" class="form-control" id="recipient-name" name="coart_name" value={this.state.coart_name} onChange={this.handleChange} />
                                          </div>
                                          <div class="form-group">
                                            <label for="recipient-name" class="col-form-label">Contact</label>
                                            <input type="text" class="form-control" id="recipient-name" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                          </div>

                                          <div class="form-group">
                                            <label for="recipient-name" class="col-form-label">Address:</label>
                                            <input type="text" class="form-control" id="recipient-name" name="address" value={this.state.address} onChange={this.handleChange} />
                                          </div>
                                          {/* <div class="form-group">
            <label for="recipient-name" class="col-form-label">Latitude:</label>
            <input type="text" name="latitude" class="form-control" id="recipient-name"/>
        </div> */}
                                          {/* <div class="form-group">
            <label for="message-text" class="col-form-label">Longitude:</label>
            <textarea class="form-control" name="longitude"  id="message-text"></textarea>
          </div> */}
                                          <div class="form-group">
                                            <label for="message-text" class="col-form-label">Summary:</label>
                                            <textarea class="form-control" name="Summary" value={this.state.Summary} onChange={this.handleChange} id="message-text"></textarea>
                                          </div>
                                         

                                        </div>


                                      </div>

                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button className="btn btn-primary" onClick={this.registerNow}  >Save changes</button>
                                      </div>

                                    </form>
                                  </div>
                                </div>
                              </div>

          <br/>
                              <div className="table-responsive">
                                <div id="toolbar">
                                </div>
                                <table id="table_mycoart" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar" className="table table-bordered table-striped table-hover">
                                  <thead>
                                    <tr>
                                      {/* <th data-field="state" data-checkbox="true" /> */}
                                      <th data-field="id">ID</th>
                                      <th data-field="name" data-editable="true">Name</th>
                                      <th data-field="name" data-editable="true">Contact</th>
                                      <th data-field="name" data-editable="true">Address</th>
                                      <th data-field="name" data-editable="true">Summary</th>
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">TIME SLOT</th>
                                      <th data-field="name" data-editable="true">Image</th>
                                      <th data-field="name" data-editable="true">Terms</th>
                                      <th data-field="name" data-editable="true">Facilities</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                            {this.state.mycoart.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>{item.coart_name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address.substr(0, 4)}.......</td>
                                        <td>{item.Summary.substr(0, 4)}....</td>


                                        <Link to={`${config.baseUrl}mycoartpdate/${item.id}`} >
                                          <button class="pd-setting-ed" data-original-title="Edit">
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </button></Link>


                                        <button className=" btn-danger" onClick={this.deletecoachdetails.bind(this,item)} data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> </button>
                                        <td> 
 <a className="btn btn-default btn-sm" href={`${config.baseUrl}coarttimeslot/${item.id}`}>Time</a>
                                          </td>
                                        <td> 
<a className="btn btn-default btn-sm"  href={`${config.baseUrl}coartimages/${item.id}`}> <i className="fa fa-image"></i>Images</a>
                                        </td>
                                        <td> 
 <a className="btn btn-default btn-sm" href={`${config.baseUrl}termscondition/${item.id}`}>Term</a>
                                          </td>
                                          <td> 
 <a className="btn btn-default btn-sm" href={`${config.baseUrl}Facilities/${item.id}`}>Facilities</a>
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
