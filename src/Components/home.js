import React, { Component } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
export default class home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mycoach:'',
      mycoart:'',
     
    };
   
  }
   
 componentDidMount() {
  this.getmycoartcountAPI()
  this.getmycoachcountAPI() 
  } 

 async getmycoachcountAPI() {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getmycoachcount`
    })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            mycoach:response.data.response.count
          })
        }
      })
  }

  async getmycoartcountAPI() {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getmycoartcount`
    })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            mycoart:response.data.response.count
          })
        }
      })
  }

    render() {
        return (
  <>
 
        <Sidebar/>
        {/* End Left menu area */}
        {/* Start Welcome area */}
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
         <Header/>
          <div className="analytics-sparkle-area">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="analytics-sparkle-line reso-mg-b-30">
                    <div className="analytics-content">
                      <h5>Total Coart</h5>
                      
                      <h3>{this.state.mycoart}</h3>
                       
                      {/* <h2>$<span className="counter">5000</span> <span className="tuition-fees">Tuition Fees</span></h2> */}
                      {/* <span className="text-success">20%</span> */}
                      <div className="progress m-b-0">
                        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '20%'}}> <span className="sr-only">20% Complete</span> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="analytics-sparkle-line reso-mg-b-30">
                    <div className="analytics-content">
                    <h5>Total Coach</h5>
                    <h3>{this.state.mycoach}</h3>
                     
                      <div className="progress m-b-0">
                        <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '30%'}}> <span className="sr-only">230% Complete</span> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="analytics-sparkle-line reso-mg-b-30 table-mg-t-pro dk-res-t-pro-30">
                    <div className="analytics-content">
                      <h5>Coart Booking</h5>
                      {/* <h2>$<span className="counter">2000</span> <span className="tuition-fees">Tuition Fees</span></h2>
                      <span className="text-info">60%</span> */}
                      <div className="progress m-b-0">
                        <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}}> <span className="sr-only">20% Complete</span> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="analytics-sparkle-line table-mg-t-pro dk-res-t-pro-30">
                    <div className="analytics-content">
                      <h5>Coach Booking</h5>
                      {/* <h2>$<span className="counter">3500</span> <span className="tuition-fees">Tuition Fees</span></h2>
                      <span className="text-inverse">80%</span> */}
                      <div className="progress m-b-0">
                        <div className="progress-bar progress-bar-inverse" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}}> <span className="sr-only">230% Complete</span> </div>
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





