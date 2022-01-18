import React, { Component } from 'react';
import config from '../config/config'
import { CookiesProvider } from 'react-cookie';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'

const headers = {
    'Content-Type' : 'application/json'
  };
export default class changepassword extends Component {
    constructor (props)
    {
        super (props)
        this.state={
            currentPassword:'',
            password:'',
            password2:'',
            
        }
        this.handleChange=this.handleChange.bind(this);
        this.registerNow = this.registerNow.bind(this);
        this.loginData = (!Cookies.get('loginSuccessAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessAdmin'));
        console.log(Cookies.get('loginSuccessAdmin'));
        console.log("ABC",this.loginData);
        // console.log('satu',this.loginData.data[0].id)
        }
        
        handleChange=event=> {
            this.setState({
                [event.target.name]:event.target.value
            })
            
        }
  
        registerNow = async (e) => {
          e.preventDefault();
        //     let currentPassword=this.state.currentPassword;
        //     let password=this.state.password;
        //     let password2=this.state.password2;
        //     // let id=this.loginData.data[0].id;

        //     let formData = new FormData();
        //     //  formData.append('id', id);
        //     formData.append('currentPassword', currentPassword);
        //     formData.append('password', password);
        //     formData.append('password2', password2);
            
            
        // const obj = Object.fromEntries(formData);
        // console.log(obj);

    
        axios({
            method: 'post',
            url : `${config.apiurl}adminpassword`,
            data : {'id': this.loginData.data.id, "currentPassword":this.state.currentPassword,"password":this.state.password,"password2":this.state.password2}
        })
        .then(result => {
          console.log(result.data);
          if (result.data.success === true){
          toast.success(result.data.msg, {});

          setTimeout(() => {
            window.location.href = `${config.baseUrl}`;
        }, 1200)
          }
          else if (result.data.success === false){

            toast.error(result.data.msg)
          }
          

         


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
  <Sidebar/>
<div className="error-pagewrap">
    
  <div className="error-page-int">
  <Header/>
    <div className="text-center m-b-md custom-login">
      <h3>ChangePassword </h3>
      
    </div>
    <div className="content-error">
      <div className="hpanel">
        <div className="panel-body">
          <form action="#" id="loginForm">
            <div className="form-group">
              <label className="control-label" htmlFor="username">OldPassword</label>
              <input type="password" placeholder="old password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChange}  required defaultValue  id="username" className="form-control" />
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="password">NewPassword</label>
              <input type="password"  placeholder="new password" required defaultValue name="password" value={this.state.password} onChange={this.handleChange}  id="password" className="form-control" />
             
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="password">RetypePassword</label>
              <input type="password"  placeholder="retype password" required defaultValue name="password2" value={this.state.password2} onChange={this.handleChange} id="password" className="form-control" />
             
            </div>
            <button className="btn btn-success btn-block loginbtn" onClick={this.registerNow}  >Submit</button>
            
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
