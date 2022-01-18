import React, { Component } from 'react';
import config from '../config/config'
import Cookies from 'js-cookie';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const headers = {
  'Content-Type' : 'application/json'
};
export default class login extends Component {
  constructor (props)
  {
      super (props)
      this.state={
          email:'',
          password:'',
          
      }
      this.handleChange=this.handleChange.bind(this);
      this.registerNow = this.registerNow.bind(this);
     
      }


      // componentDidMount() {
      //     if(Cookies.get('loginSuccessAdmin')){
      //         window.location.href = `${config.baseUrl}login`
      //      }
          
      // }

      
      handleChange=event=> {
          this.setState({
              [event.target.name]:event.target.value
          })
          
      }


      registerNow = async (e) => {
        e.preventDefault();

          let email=this.state.email;
          let password=this.state.password;
          

          let formData = new FormData();
  
          formData.append('email', email);
          formData.append('password', password);
          
          
      const obj = Object.fromEntries(formData);
      console.log(obj);
  
      axios.post(`${config.apiUrl}loginadmin`, obj)

      .then(response => 
        {
         console.log(response.data);
         toast.success(response.data.msg, {});
         
          Cookies.set('loginSuccessAdmin', JSON.stringify(response.data));
 
         setTimeout(() => {
             window.location.href = `${config.baseUrl}home`;
         }, 1200)
        

      })
      .catch(error => {
          // element.parentElement.innerHTML = `Error: ${error.message}`;
          console.error('There was an error!', error);
          toast.error(error.response.data.msg, {});
      });
      
      }

    render() {
        return (
  <>
  <Toaster/>
  <div className="error-pagewrap">
  <div className="error-page-int admin_login  ml-5 mr-5 p-4 p-md-5">
    <div className="text-center m-b-md custom-login">
    <div className="sidebar-header adminlogo">
              <a href="index.html"><img className="main-logo" src="img/logo-light.png" alt="" style={{height:'50px',width:'150px'}} /></a>
        
            <br/>
            
            </div>
      <h3 admin-h3>PLEASE LOGIN </h3>
      <p className='admin_name'>Admin</p>
    </div>
    <div className="content-error">
      <div className="hpanel">
        <div className="panel-body">
          <form action="#" id="loginForm" className='adminlogin_form'>
            <div className="form-group">
              <label className="control-label" htmlFor="username">Email</label>
              <input type="text" placeholder="example@gmail.com" name="email" value={this.state.email} onChange={this.handleChange} title="Please enter you username" required defaultValue  id="username" className="form-control admin_control" />
              <span className="help-block small">Your unique username to app</span>
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="password">Password</label>
              <input type="password" title="Please enter your password" placeholder="******" required defaultValue name="password" value={this.state.password} onChange={this.handleChange} id="password" className="form-control admin_control" />
              <span className="help-block small">Yur strong password</span>
            </div>
            <button className="btn btn-success btn-block loginbtn" onClick={this.registerNow}>Login</button>
          </form>
        </div>
      </div>
    </div>
    
  </div>   
</div>
</>

)
}
}

