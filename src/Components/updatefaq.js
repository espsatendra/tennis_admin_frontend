import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const headers = {
  'Content-Type' : 'application/json'
};

export default class updatefaq extends Component {

  constructor(props) {
    super(props)
    this.state = {
    faqid:'',
    quetions:'',
    answer: '',
    id:'',
    }
  
    this.onChange = this.onChange.bind(this);
    const { match: { params } } = this.props;
    this.faqid = params.faqid;
   
    }
    
      onChange(e) {
        this.setState({
           [e.target.name]: e.target.value
        })
      
      }


          componentDidMount() {
   
            this.setState({
                faqid : this.faqid
            })
            
          this.getfaqidData(this.faqid);
        }


async getfaqidData(faqid) {
  await axios({
    method: 'get',
    url: `${config.apiUrl}getfaqid/`+faqid
    
  })
    .then(response => {
      if (response.data.success === true) {
        let faqData = response.data.response;
        console.log(faqData)
        this.setState({
          
            quetions : faqData.quetions,
            answer : faqData.answer,
          
        })
        // console.log(response.data.response);
      }
    })
}



handleSubmit = async (event) => {
    event.preventDefault();
    const {quetions,answer} = this.state
  axios({
    method: 'post',
    url: `${config.apiUrl}updatefaq`,
    data: {"id":this.faqid,quetions:quetions,answer:answer}
}).then(response => {
     if (response.data.success === true) {
        toast.success(response.data.msg, {});
        setTimeout(() => {
          window.location.href = `${config.baseUrl}faq`;
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
                                  <form action="#" method="POST" onSubmit={this.handleSubmit}>
                                <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <label >Questions</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="quetions" onChange={this.onChange} value={this.state.quetions} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Heading1" />
                                              </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <label >Answer</label>
                                              </div>
                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
         <input type="text" name="answer" onChange={this.onChange} value={this.state.answer} className="form-control basic-ele-mg-b-10 responsive-mg-b-10" placeholder="Heading" />
                                              </div>

                                             
                                            </div>
                                            <br/>
    <button type='submit'   className="btn btn-success btn-block loginbtn" >Update</button>
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
