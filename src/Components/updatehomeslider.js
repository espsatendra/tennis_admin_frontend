import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const headers = {
  'Content-Type' : 'application/json'
};

export default class updatehomeslider extends Component {

  constructor(props) {
    super(props)
    this.state = {
    homesliderid:'',
    heading1 :'',
      heading2 :'',
      description:'',
      images: '',
      imagesImage:'',
     

    }


    


    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.onChange = this.onChange.bind(this);
    const { match: { params } } = this.props;
    this.homesliderid = params.homesliderid;
   
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
                homesliderid : this.homesliderid
            })
            
        this.gethomeslideridData(this.homesliderid);
        }


async gethomeslideridData(homesliderid) {
  await axios({
    method: 'get',
    url: `${config.apiUrl}gethomesliderid/`+homesliderid
    
  })
    .then(response => {
      if (response.data.success === true) {
        let homesliderData = response.data.response;
        let images = config.imageUrl+homesliderData.images
     this.setState({
            images:images,
          heading1 : homesliderData.heading1,
          heading2 : homesliderData.heading2,
          description : homesliderData.description,

        })
        // console.log(response.data.response);
      }
    })
}



 handleSubmit = async (event) => {
    event.preventDefault();
      let formData = new FormData();
            formData.append('id', this.state.homesliderid);
            formData.append('images', this.state.imagesImage);
          formData.append('heading1', this.state.heading1);
          formData.append('heading2', this.state.heading2);
          formData.append('description', this.state.description);
        
           
                const obj = Object.fromEntries(formData);
                console.log(obj);
          axios({
            method: 'post',
            url: `${config.apiUrl}/updatehomeslider`,
            data: formData
        }).then(response => {
             if (response.data.success === true) {
                toast.success(response.data.msg, {});
                setTimeout(() => {
                  window.location.href = `${config.baseUrl}homeslider`;
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


                                  
                                                <label>Images</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
   <a><img className="main-logo" style={{width:'50px',height:'50px'}} src={this.state.images} alt="ffdsfd" /></a>
   <input type="file"  name="images" onChange={this.handleChangeImage} class="form-control" />
                                              </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <label >Heading1</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="heading1" onChange={this.onChange} value={this.state.heading1} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Heading1" />
                                              </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <label >Heading2</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="heading2" onChange={this.onChange} value={this.state.heading2} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Heading" />
                                              </div>

                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label >descrption</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <textarea type="text" name="description" onChange={this.onChange} value={this.state.description} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Description" />
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
