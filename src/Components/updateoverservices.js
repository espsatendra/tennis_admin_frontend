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
        overservicesid :'',
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
      

    }
    
    const { match: { params } } = this.props;
    this.overservicesid = params.overservicesid;

    this.onChange = this.onChange.bind(this);
    this.handleChangeImage1 = this.handleChangeImage1.bind(this);
    this.handleChangeImage2 = this.handleChangeImage2.bind(this);
   
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

  componentDidMount() {
   
      this.setState({
        overservicesid : this.overservicesid
      })
      
     this.getoverservicesidData(this.overservicesid);
  }

  async getoverservicesidData(overservicesid) {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getoverservicesid/`+overservicesid
      
    })
      .then(response => {
        if (response.data.success === true) {
          let overservicesData = response.data.response;
          let image1 = config.imageUrl+overservicesData.image1
          let image2 = config.imageUrl+overservicesData.image2
          this.setState({
            servicename : overservicesData.servicename,
            descrption : overservicesData.descrption,
            image1 :image1,
            image2 :image2,
            heading1 : overservicesData.heading1,
            descrption1:overservicesData.descrption1,
            heading2:overservicesData.heading2,
            descrption2:overservicesData.descrption2,
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
	formData.append('id', this.state.overservicesid);
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
      axios({
        method: 'post',
        url: `${config.apiUrl}updateoverservicesdetails`,
        data: formData
    }).then(response => {
         if (response.data.success === true) {
            toast.success(response.data.msg, {});
            setTimeout(() => {
              window.location.href = `${config.baseUrl}overservices`;
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
                                                <label >ServiceName</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="servicename" onChange={this.onChange} value={this.state.servicename} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="services name" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Description</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="descrption" onChange={this.onChange} value={this.state.descrption} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="description" />
                                              </div>
                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Images1</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
   <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.image1} alt="ffdsfd" /></a>
   <input type="file"  name="image1" onChange={this.handleChangeImage1} class="form-control" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Images2</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
   <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.image2} alt="ffdsfd" /></a>
   <input type="file"  name="image2" onChange={this.handleChangeImage2} class="form-control" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Heading1</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<input type="text" name="heading1" onChange={this.onChange} value={this.state.heading1} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="headings" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Descrption1</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<input type="text" name="descrption1" onChange={this.onChange} value={this.state.descrption1} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="desccription" />
                                              </div>
                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Heading2</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<input type="text" name="heading2" onChange={this.onChange} value={this.state.heading2} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="heading" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Descrption2</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<input type="text" name="descrption2" onChange={this.onChange} value={this.state.descrption2} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="description" />
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
