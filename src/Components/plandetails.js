import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import toast, { Toaster } from 'react-hot-toast';
const headers = {
  'Content-Type' : 'application/json'
};

export default class plandetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id : '',
      amount:'',
      duration: '',
      package_details: '',
      description : '',
      package_plan_id: '',
      getPlanDetails: [],
      id1:''

    }
    const { match: { params } } = this.props;
    this.package_plan_id = params.package_plan_id;
    this.onChange = this.onChange.bind(this)
    this.editdescription = this.editdescription.bind(this);
//  this.deletedescrption = this.deletedescrption.bind(this); 

  }

  componentDidMount() {

    if(this.package_plan_id){
      this.setState({
        'id' : this.package_plan_id
      })
    }else{
      window.location.href = `${config.baseUrl}myplan`
    }

    this.getPlanDetailsAPI();
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onChange(e) {
    this.setState({
       [e.target.name]: e.target.value
    })

    // this.setState(prevState => ({
    //   getPlanDetails: { ...prevState.getPlanDetails, [e.target.name]: e.target.value }
    // }))

 }


  async getPlanDetailsAPI() {
    axios.post(`${config.apiUrl}getPlandetail`, { 'package_plan_id': this.package_plan_id })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            getPlanDetails: response.data?.response,
            plan_name : response.data?.response[0].plan_name,
            amount : response.data?.response[0].amount,
            duration : response.data?.response[0].duration
          })
        }
        else if (response.data.success === false) {
        }
      }).catch(err => {

      });
  }


  async updateplan(e) {
    e.preventDefault()

    await axios({
       method: 'post', 
       url: `${config.apiUrl}updateamtdurtn`,
       data:{"id": this.state.id, "amount" : this.state.amount,"duration": this.state.duration}
    })
       .then(result => {
           if (result.data.success === true) {
             
             toast.success(result.data.msg, {
       
                });
                setTimeout(() =>{
                    window.location.reload()
                }, 2000)
         } 
 
           else if (result.data.success === false) {
             toast.error(result.data.msg, {
           
                });
      
         }

        }).catch(err => {
       console.log(err);
       
    });
 }




 insertNow = async (e) => {
  e.preventDefault();
  let package_details = this.state.package_details;
let  package_plan_id= this.package_plan_id;
  let formData = new FormData();

  formData.append('package_details', package_details);
   formData.append('package_plan_id', package_plan_id);
  
  const obj = Object.fromEntries(formData);
  console.log(obj);

  axios.post(`${config.apiUrl}insertdescription`, obj)
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

 async editdescription(id) {
   console.log("ABC",id.detail_id)
   this.setState({
    id1:id.detail_id,
    package_details:id.package_details
   })
    await axios({
        method: 'post',
        url: `${config.apiUrl}insertdescription`,
        data: { "id":id }
    })
        .then(result => {
          console.log("ABC",result.data.response)
            if (result.data.success === true) {
              this.setState({
                description: result.data.response,
               
            })
                        }
            else {

            }
        }).catch(err => {

        });
}


async updatedescriptionAPI(id) {

  await axios({
      method: 'post',
      url: `${config.apiUrl}updatedescription`,

      data : {"id": this.state.id1, "package_details": this.state.package_details  }
  }).then(result => {

          if (result.data.success === true) {
              toast.success(result.data.msg, {
                 
              });

              // setTimeout(() => {
              //     window.location.href = `${config.baseUrl}product`
              // }, 1000);
          }

          else if (result.data.success === false) {

          }
      })

      .catch(err => {
      })

}



async deletedescrption(id) {     
  confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this User..',
      buttons: [
          {
              label: 'Yes',
              onClick: () =>
              axios({
                  method: 'post',
                  url: `${config.apiUrl}deletedescription`,
                  // headers: { "Authorization": this.loginData?.Token },
                  data:{ 'id':id}
                  
               })
          .then(result => {

              toast.success(result.data.msg, {
              
              });
              this.getPlanDetailsAPI()
              // window.location.reload()
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

        <Sidebar />
         <Toaster/>
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
                  <div className="sparkline10-list mt-b-30">
                    <div className="sparkline10-hd">
                      <div className="main-sparkline10-hd">
                        <br />

                        <h1>  {this.state.plan_name} <span className="basic-ds-n"></span></h1>
                      </div>
                    </div>
                    <div className="sparkline10-graph">
                      <div className="basic-login-form-ad">

                        <div className="row">
                          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                            <div className="sparkline10-list mt-b-30">
                              <div className="sparkline10-hd">

                              </div>
                              <div className="sparkline10-graph">
                                <div className="basic-login-form-ad">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <div className="basic-login-inner inline-basic-form">
                                        <form action="#">
                                          <div className="form-group-inner">
                                            <div className="row">
                                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                <label className="login2 pull-right pull-right-pro">Amount</label>
                                              </div>
                                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                               <input type="text" name="amount" onChange={this.onChange} value={this.state.amount} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Amount" />
                                              </div>
                                            </div>
                                          </div>
                                          <br />
                                          <div className="form-group-inner">
                                            <div className="row">
                                              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                <label className="login2 pull-right pull-right-pro">Duration</label>
                                              </div>

                                              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                <div className="form-select-list">
                                                  <select className="form-control custom-select-value" name="duration" onChange={this.onChange} value={this.state.duration}>
                                                    <option value="1">Day</option>
                                                    <option value="2">Month</option>
                                                    <option value="3">Year</option>
                                                    
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <br/>
                                          <button  onClick={this.updateplan.bind(this)}  className="btn btn-success btn-block loginbtn" >Update</button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="sparkline12-hd">
                          <div className="main-sparkline12-hd">
                            <h1>Plan Description </h1>
                          </div>
                        </div>
                        
                       


                        <div className="sparkline12-graph">
                          <div className="basic-login-form-ad">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                
                                <div className="all-form-element-inner">
                                <button data-toggle="tooltip"   data-toggle="modal" data-target="#exampleModal1"class="pd-setting-ed"  data-original-title="Add">Add</button>
                              
 <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <div className="sparkline8-list">
          <div className="sparkline8-hd">
            
          </div>

          <div className="sparkline8-graph">
            <div className="static-table-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.getPlanDetails.map((item,i) =>(
                  <tr>
                    <td>{i+1}</td>
                    <td>{item.package_details}</td>
                  
                    <td>
                    <button data-toggle="tooltip" onClick={this.editdescription.bind(this,item)}  data-toggle="modal" data-target="#exampleModal"class="pd-setting-ed" data-original-title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button data-toggle="tooltip" title="" class="pd-setting-ed" data-original-title="Trash" onClick={this.deletedescrption.bind(this,item.detail_id)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                        </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Description</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"> */}
           <input type="text" className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Description" name="package_details"  onChange={this.onChange}  value={this.state.package_details}/>
                                              {/* </div> */}
            </div>
            <div className="modal-footer">
              <button type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit"  className="btn btn-primary" onClick={this.updatedescriptionAPI.bind(this)} >Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Description</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>



            <div className="modal-body">
            {/* <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"> */}
           <input type="text" className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Description" name="package_details"  onChange={this.onChange}  value={this.state.package_details}/>
                                              {/* </div> */}
            </div>
            <div className="modal-footer">
              <button type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit"  className="btn btn-primary" onClick={this.insertNow} > Add</button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    )
  }
}
