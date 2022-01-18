import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import Footer from '../directives/footer'
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class myplan extends Component {

  constructor(props) {
    super(props)
    this.state = {

      myplan: [],
      activitydetail: []
    };
    // this.loginData = (!Cookies.get('adminLoginSuccess')) ? [] : JSON.parse(Cookies.get('adminLoginSuccess'));
    const { match: { params } } = this.props;
    this.package_plan_id = params.package_plan_id;


  }

  componentDidMount() {

    this.getmyplansAPI();
    this.useractivity();
  }

  async getmyplansAPI() {
    await axios({
      method: 'get',
      url: `${config.apiUrl}getmyplans`
    })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            myplan: response.data.response
          })
        }
      })
  }


  async useractivity(package_plan_id) {
    console.log('abc');
    axios.post(`${config.apiUrl}getPlandetail`, { 'package_plan_id': this.package_plan_id })
      .then(response => {
        console.log('abc1');
        if (response.data.success === true) {

          this.setState({
            activitydetail: response.data?.response,
          })
        }
        else if (response.data.success === false) {
        }
      }).catch(err => {
      });
  }


  render() {
    return (
      <>


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
                         
                          <div className="sparkline13-list">
                            <div className="sparkline13-hd">
                              <div className="main-sparkline13-hd">
                                <h1>Plan Details</h1>
                              </div>
                            </div>
                            <div className="sparkline13-graph">
                             

                              <div className="datatable-dashv1-list custom-datatable-overright">
                                <div id="toolbar">
                                </div>
                                <table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar">
                                  <thead>
                                    <tr>
                                      <th data-field="state" data-checkbox="true" />
                                      <th data-field="id">Plans</th>
                                      <th data-field="name" data-editable="true">Amount</th>
                                      <th data-field="name" data-editable="true">Duration</th>
                                      <th data-field="action">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.myplan.map((item) => (
                                      <tr>

                                        <td />

                                        <td>{item.plan_name}</td>


                                        <td> {item.amount}</td>
                                        <td>{item.duration === 1 ? 'Days' : item.duration === 2 ? 'Month' : 'Year'}</td>

                                        <td>
                                          <Link to={`${config.baseUrl}plandetails/${item.id}`} >
                                          <button class="pd-setting-ed" data-original-title="Edit">
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </button></Link>

                                          <button data-toggle="tooltip" title="" class="pd-setting-ed" data-original-title="Trash"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                        </td>

                                      </tr>
                                    ))}


                                  </tbody>
                                </table>
                              </div>

                              <div class="row">
                                <div id="PrimaryModalalert" className="modal modal-edu-general default-popup-PrimaryModal fade" role="dialog">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-close-area modal-close-df">
                                        <a className="close" data-dismiss="modal" href="#"><i className="fa fa-close" /></a>
                                      </div>
                                      <div className="modal-body">
                                        <i className="educate-icon educate-checked modal-check-pro" />
                                        <h2>Awesome!</h2>
                                        <p>The Modal plugin is a dialog box/popup window that is displayed on top of the current page</p>
                                      </div>
                                      <div className="modal-footer">
                                        <a data-dismiss="modal" href="#">Cancel</a>
                                        <a href="#">Process</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>



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
