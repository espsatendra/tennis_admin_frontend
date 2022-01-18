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
      coachid :'',
      name:'',
      email:'',
      phone: '',
      bio: '',
      avatar: '',
      fee : '',
      ip: '',
      avatarImage:'',
      

    }
    
    const { match: { params } } = this.props;
    this.coachid = params.coachid;

    this.onChange = this.onChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
   
  }

  handleChangeImage = e => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    let image_as_files = e.target.files[0];
    this.setState({
      avatar: image_as_base64,
      avatarImage: image_as_files,
    })
	}

  componentDidMount() {
   
      this.setState({
        coachid : this.coachid
      })
      
    this.getcoachData(this.coachid);
  }

  async getcoachData(coachid) {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getmycoachid/`+coachid
      
    })
      .then(response => {
        if (response.data.success === true) {
          let coachData = response.data.response;
          let avatar = config.imageUrl+coachData.avatar
          this.setState({
            name : coachData.name,
            email : coachData.email,
            phone : coachData.phone,
            bio : coachData.bio,
            avatar:avatar,
            fee:coachData.fee,
            ip:coachData.ip,
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

  let formData = new FormData();
			formData.append('id', this.state.coachid);
      formData.append('name', this.state.name);
      formData.append('email', this.state.email);
      formData.append('phone', this.state.phone);
      formData.append('bio', this.state.bio);
			formData.append('avatar', this.state.avatarImage);
      formData.append('fee', this.state.fee);
      formData.append('ip', this.state.ip);
		

			const obj = Object.fromEntries(formData);
			console.log(obj);
      axios({
        method: 'post',
        url: `${config.apiUrl}updatecoachdetails`,
        data: formData
    }).then(response => {
         if (response.data.success === true) {
            toast.success(response.data.msg, {});
            setTimeout(() => {
              window.location.href = `${config.baseUrl}mycoach`;
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
                            <h1>Coach Details </h1>
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
         <input type="text" name="name" onChange={this.onChange} value={this.state.name} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="name" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Email</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="email" onChange={this.onChange} value={this.state.email} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="email" />
                                              </div>
                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>PHONE</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="phone" onChange={this.onChange} value={this.state.phone} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="phone" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>BIO</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="bio" onChange={this.onChange} value={this.state.bio} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="bio" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Images</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
   <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.avatar} alt="ffdsfd" /></a>
   <input type="file"  name="avatar" onChange={this.handleChangeImage} class="form-control" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Fee</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="fee" onChange={this.onChange} value={this.state.fee} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="fee" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>IP</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="ip" onChange={this.onChange} value={this.state.ip} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="ip" />
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
