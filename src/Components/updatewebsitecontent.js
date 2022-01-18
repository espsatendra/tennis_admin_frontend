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
    websitecontentid:'',
    heading1 :'',
      heading :'',
      description:'',
      overmissiondesc:'',
      overvisiondesc: '',
      images: '',
      imagesImage:'',
      websitecontent :[],

    }
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.onChange = this.onChange.bind(this);
    const { match: { params } } = this.props;
    this.websitecontentid = params.websitecontentid;
   
    }
    
      onChange(e) {
        this.setState({
           [e.target.name]: e.target.value
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
    

          componentDidMount() {
   
            this.setState({
              websitecontentid : this.websitecontentid
            })
            
          this.getwebsitecontentidData(this.websitecontentid);
        }


async getwebsitecontentidData(websitecontentid) {
  await axios({
    method: 'get',
    url: `${config.apiUrl}getwebsitecontentid/`+websitecontentid
    
  })
    .then(response => {
      if (response.data.success === true) {
        let websiteData = response.data.response;
        let images = config.imageUrl+websiteData.images
        console.log(websiteData)
        this.setState({
          
          heading : websiteData.heading,
          description : websiteData.description,
           overmissiondesc : websiteData.overmissiondesc,
           overvisiondesc : websiteData.overvisiondesc,
          images:images,
          heading1 : websiteData.heading1,
        })
        // console.log(response.data.response);
      }
    })
}



 handleSubmit = async (event) => {
    event.preventDefault();
      let formData = new FormData();
            formData.append('id', this.state.websitecontentid);
           
          formData.append('heading', this.state.heading);
          formData.append('description', this.state.description);
          formData.append('overmissiondesc', this.state.overmissiondesc);
          formData.append('overvisiondesc', this.state.overvisiondesc);
            formData.append('images', this.state.imagesImage);
            formData.append('heading1', this.state.heading1);
                const obj = Object.fromEntries(formData);
                console.log(obj);
          axios({
            method: 'post',
            url: `${config.apiUrl}/updatewebsitecontentdetails`,
            data: formData
        }).then(response => {
             if (response.data.success === true) {
                toast.success(response.data.msg, {});
                setTimeout(() => {
                  window.location.href = `${config.baseUrl}websitecontent`;
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
                                           <label >Heading1</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="heading1" onChange={this.onChange} value={this.state.heading1} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Heading1" />
                                              </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <label >Heading</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="heading" onChange={this.onChange} value={this.state.heading} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Heading" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >descrption</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <textarea type="text" name="description" onChange={this.onChange} value={this.state.description} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Description" />
                                              </div>
                                              
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Over Mission</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="overmissiondesc" onChange={this.onChange} value={this.state.overmissiondesc} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Over Mission" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Over Vission</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <input type="text" name="overvisiondesc" onChange={this.onChange} value={this.state.overvisiondesc} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Over Vission" />
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label>Images</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
   <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.images} alt="ffdsfd" /></a>
   <input type="file"  name="images" onChange={this.handleChangeImage} class="form-control" />
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
