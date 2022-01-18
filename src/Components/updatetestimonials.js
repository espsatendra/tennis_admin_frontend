import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const headers = {
  'Content-Type' : 'application/json'
};

export default class updatetestimonials extends Component {

  constructor(props) {
    super(props)
    this.state = {
        Testimonialsid :'',
        name:'',
        images: '',
        title:'',
        descrption:'',
         imagesPreview:'',
      Testimonials: [],
      
    }
    
    const { match: { params } } = this.props;
    this.Testimonialsid = params.Testimonialsid;

    this.onChange = this.onChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
   
   
  }

  handleChangeImage = e => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    let image_as_files = e.target.files[0];

    this.setState({
        imagesPreview: image_as_base64,
        images: image_as_files,
     
    })
  }

 

  componentDidMount() {
   
      this.setState({
        Testimonialsid : this.Testimonialsid
      })
      
      this.getTestimonialsidData(this.Testimonialsid);
  }

  async getTestimonialsidData(Testimonialsid) {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getTestimonialsid/`+Testimonialsid
      
    })
      .then(response => {
        if (response.data.success === true) {
          let testimonialsData = response.data.response;
          let images = config.imageUrl+testimonialsData.imagesPreview
          this.setState({
            name : testimonialsData.name,
            images :images,
            title: testimonialsData.title,
            descrption:testimonialsData.descrption,
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

  UpdateeSubmit = async (event) => {
		event.preventDefault();

  let formData = new FormData();
	formData.append('id', this.state.Testimonialsid);
    formData.append('name', this.state.name);
    formData.append('images', this.state.images);
    formData.append('title', this.state.title);
    formData.append('descrption', this.state.descrption);
		

	const obj = Object.fromEntries(formData);
			console.log(obj);
      axios({
        method: 'post',
        url: `${config.apiUrl}updategetTestimonials`,
        data: formData
    }).then(response => {
         if (response.data.success === true) {
            toast.success(response.data.msg, {});
            setTimeout(() => {
              window.location.href = `${config.baseUrl}Testimonials`;
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
                            <h1>Testimonials Details </h1>
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
                                                <label >User Name</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="name" onChange={this.onChange} value={this.state.name} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="services name" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Images</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
   <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.imagesPreview} alt="ffdsfd" /></a>
   <input type="file"  name="images" onChange={this.handleChangeImage} class="form-control" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Title</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
<input type="text" name="title" onChange={this.onChange} value={this.state.title} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="headings" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >Description</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="descrption" onChange={this.onChange} value={this.state.descrption} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="description" />
                                              </div>
                                              
                                            </div>
                                            <br/>
    <button  onClick={this.UpdateeSubmit} className="btn btn-success btn-block loginbtn" >Update</button>
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
