import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
export default class terms_condition extends Component {

    constructor(props) {
        super(props)
        this.state = {
            privacy_policy:'',
             privacy_policy:[],
        };
        this.onChange = this.onChange.bind(this);
        this.submitLandingForm = this.submitLandingForm.bind(this);
   
      }
       
      /**
 * @property Jodit jodit instance of native Jodit
 */
       jodit;
       setRef = jodit => this.jodit = jodit;
       
       config = {
           readonly: false // all options from https://xdsoft.net/jodit/doc/
       }    
      
    
     componentDidMount() {
   
      this.getprivacypolicyAPI() 
      } 

     async getprivacypolicyAPI() {
        await axios({
          method: 'get',
          url: `${config.apiUrl}getprivacypolicy`
        })
          .then(response => {
            if (response.data.success === true) {
              this.setState({
                privacy_policy_list: response.data.response[0]
              })
            }
          })
      }

     
      onChange(e) {
        this.setState({
           [e.target.name]:e.target.value
        })
      
        this.setState(prevState =>    ({
          privacy_policy_list: {...prevState.privacy_policy_list,[e.target.name]:e.target.value}
          }))
    
     }
      
     submitLandingForm = async (event) => {
        event.preventDefault();
        var data = {
           
          privacy_policy: this.state.privacy_policy
          
      }
      console.log(data)
      axios({
        method: 'post',
        url: `${config.apiUrl}updateprivacypolicy`, data
    }).then(response => {
         if (response.data.success === true) {
            toast.success(response.data.msg, {});
            setTimeout(() => {
              // window.location.href = `${config.baseUrl}terms_condition`;
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

updateContent = (value) => {
  this.setState({'privacy_policy':value})
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
                                <h3>Privacy And Policy</h3>
                              </div>
                            </div>
                            <div className="sparkline13-graph">
                            <form action="#" method="POST" onSubmit={this.submitLandingForm}>
                            <div className="col-md-12">
                                                            
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Content</label>
                                                                <JoditEditor
                                                                    editorRef={this.setRef} style={{color:'#000'}}
                                                                    value={this.state.privacy_policy_list?.privacy_policy}
                                                                    config={this.config}
                                                                    onChange={this.updateContent}
                                                                />
                                                            </div>  


                                                         <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10"></label>
                                                                <button type="submit" className="btn btn-primary">Update</button>
                                                           </div> 
                                                        </div>
                                                    </div>

                                          </form>

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
