import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const headers = {
  'Content-Type' : 'application/json'
};

export default class mycoachupdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      coartid :'',
      coart_name:'',
      phone: '',
      address: '',
      Summary: '',
      
    }
    
    const { match: { params } } = this.props;
    this.coartid = params.coartid;

    this.onChange = this.onChange.bind(this);
 
   
  }

  componentDidMount() {
   
      this.setState({
        coartid : this.coartid
      })
      
    this.getcoartData(this.coartid);
  }

  async getcoartData(coartid) {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getmycoartid/`+coartid
      
    })
      .then(response => {
        if (response.data.success === true) {
          let coartData = response.data.response;
         
          this.setState({
            coart_name : coartData.coart_name,
            phone : coartData.phone,
            address : coartData.address,
            Summary:coartData.Summary,
            
          })
          // console.log(response.data.response);
        }
      })
  }

 

  onChange(e) {
    this.setState({
       [e.target.name]: e.target.value
    })
  

 }

  

  handleSubmit = async (event) => {
		event.preventDefault();
        const {coart_name,phone,address,Summary} = this.state
      axios({
        method: 'post',
        url: `${config.apiUrl}updatecoartdetails`,
        data: {"id":this.coartid,coart_name:coart_name,phone:phone,address:address,Summary:Summary}
    }).then(response => {
         if (response.data.success === true) {
            toast.success(response.data.msg, {});
            setTimeout(() => {
              window.location.href = `${config.baseUrl}mycoart`;
            }, 1000);
         }
         else if (response.data.success === false) {
            toast.error(response.data.msg, {});
         }
      })
      .catch(err => {
         toast.error(err?.response?.data?.msg, {

         });
      })
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
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                  <div className="sparkline10-list mt-b-30">
                    
                    <div className="sparkline10-graph">
                      <div className="basic-login-form-ad">
                      
                        <div className="sparkline12-hd">
                          <div className="main-sparkline12-hd">
                            <h1>Coart Details </h1>
                          </div>
                        </div>
                        
                        <div className="sparkline12-graph">
                          <div className="basic-login-form-ad">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="all-form-element-inner">
                                  <form action="#" method="POST" encType="multipart/form-data">
                                <div className="row">

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Name</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="coart_name" onChange={this.onChange} value={this.state.coart_name} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="name" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Contact</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="phone" onChange={this.onChange} value={this.state.phone} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="contact" />
                                              </div>
                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Address</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="address" onChange={this.onChange} value={this.state.address} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="address" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Summary</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="Summary" onChange={this.onChange} value={this.state.Summary} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Summary" />
                                              </div>
                                             
                                             
                                            </div>
                                            <br/>
    <button  onClick={this.handleSubmit} className="btn btn-success btn-block loginbtn" >Update</button>
    </form>
                                        
{/* 

        




        
      </div> */}
            
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
