import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
export default class faq extends Component {

    constructor(props) {
        super(props)
        this.state = {
            quetions:'',
            answer:'',
          faq:[],
          
       
        };
       
    //    this.onChange = this.onChange.bind(this);
      }
    
     componentDidMount() {
   
      this.getfaqAPI() 
      } 

     async getfaqAPI() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getfaq`
        })
          .then(response => {
            if (response.data.success === true) {
              this.setState({
                faq: response.data.response
              })
            }
          })
      }

      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      insertfaqNow = async (e) => {
        e.preventDefault();
        let quetions = this.state.quetions;
      let  answer= this.state.answer;
        let formData = new FormData();
      
        formData.append('quetions', quetions);
         formData.append('answer',answer);
        const obj = Object.fromEntries(formData);
        console.log(obj);
      
        axios.post(`${config.apiUrl}insertfaq`, obj)
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
 
async deletefaq(id) {
        
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this User..',
        buttons: [
            {
                label: 'Yes',
                onClick: () =>
                axios({
                    method: 'post',
                    url: `${config.apiUrl}deletefaq`,
                    // headers: { "Authorization": this.loginData?.Token },
                    data: {'id':id.id}
                 })
            .then(result => {

                toast.success(result.data.msg, {
                
                                                 });
                                                 this.getfaqAPI();
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
                                <h3>FAQ</h3>
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
            <label for="recipient-name" class="col-form-label">Questions:</label>
            <input type="text" class="form-control" id="recipient-name" name="quetions" value={this.state.quetions} onChange={this.handleChange}  />
        </div>
        
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Answer:</label>
            <input type="text" name="answer" value={this.state.answer} onChange={this.handleChange} class="form-control" id="recipient-name"/>
        </div>
       
              
      </div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button className="btn btn-primary" onClick={this.insertfaqNow}  >Save changes</button>
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
                                      <th data-field="name" data-editable="true">Questions</th>
                                      <th data-field="name" data-editable="true">Answer</th>
                                      <th data-field="action">Action</th>
                                      <th data-field="name" data-editable="true">Date Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
{this.state.faq.map ((item,i) => (  
                                      <tr>
                                      <td>{i+1}</td>
                                      <td>{item.quetions}</td>
                                      <td>{item.answer}</td>
                                     
                                        <Link to={`${config.baseUrl}updatefaq/${item.id}`} >
                                          <button class="pd-setting-ed" data-original-title="Edit">
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </button>
                                         </Link> 
                                           <button  className=" btn-danger" onClick={this.deletefaq.bind(this,item)}  data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> </button>
                                        
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
