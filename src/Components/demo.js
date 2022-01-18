import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Textbox,Textarea,Radiobox,Checkbox,Select} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
// import "./styles.css";

import { COUNTRY_OPTIONS_LIST, JOB_OPTIONS_LIST } from "./conts";

export default class demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      Email:'',
      password:'',
      description: "",
      job: "",
      country: "",
    
    };
    this.validateForm = this.validateForm.bind(this);
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(e) {
    e.preventDefault();
    this.toggleValidating(true);
    const {
    } = this.state;
   
  }

  render() {
    const {
      name,
      Email,
      password,
      description,
      job,
      agreement,
      isAgreementChecked,
      country,
      validate
    } = this.state;
    
    const rowStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "2%",
      fontSize: "14px"
    };
    const rowWrapperStyle = {
      display: "table",
      width: "100%"
    };
    const rowContainerStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      borderBottom: "1px solid #e5e5e5"
    };
    const labelStyle = {
      display: "inline-block"
    };
    const labelContentStyle = {
      verticalAlign: "middle"
    };

   
    return (
      <div
        style={{
          minHeight: "1000px",
          padding: "10px",
          border: "1px solid #e5e5e5"
        }}
      >
        <h1>Example form</h1>
        <form onSubmit={this.validateForm}>


          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
    <div style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}>
    <span className="icon icon-person" />
                  &nbsp;
                  <span style={labelContentStyle}>Name</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>

<Textbox 
 attributesInput={{ id: "Name",name: "Name",type: "text",placeholder: "Place your name here ^-^"}} 
value={name} disabled={false}  validate={validate} 
validationCallback={res =>
    this.setState({ hasNameError: res, validate: false })
                    } 
                  
      onChange={(name, e) => {
                      this.setState({ name });
                      console.log(e);
                    }} 
                    onBlur={e => {
                      console.log(e);
                    }} 
 validationOption={{ name: "Name", check: true, required: true }}
 
 />
                </div>
              </div>
            </div>
          </div>




          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
    <div style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}>
    <span className="icon icon-person"/>
                  &nbsp;
                  <span style={labelContentStyle}>Email</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>

<Textbox attributesInput={{ id: "Email",name: "Email",type:"text",placeholder: "Place your email here ^-^"}} 
value={Email} disabled={false}  validate={validate} 
                    validationCallback={res =>
                      this.setState({ hasNameError: res, validate: false })
                    } 
                   
                    onChange={(Email, e) => {
                      this.setState({ Email });
                      console.log(e);
                    }} 
                    onBlur={e => {
                      console.log(e);
                    }} 
 validationOption={{ name: "Email", check: true, required: true}}/>
                </div>
              </div>
            </div>
          </div>



          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
    <div style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}>
    <span className="icon icon-person" />
                  &nbsp;
                  <span style={labelContentStyle}>Password</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>

<Textbox  attributesInput={{ id: "password",name: "password",type:"password",placeholder: "Place your password here ^-^"}} 
value={password} disabled={false}  validate={validate} 
                    validationCallback={res =>
                      this.setState({ hasNameError: res, validate: false })
                    } 
                   
                    onChange={(password, e) => {
                      this.setState({ password });
                      console.log(e);
                    }} 
                    onBlur={e => {
                      console.log(e);
                    }} 
 validationOption={{ name: "password", check: true, required: true}}/>
                </div>
              </div>
            </div>
          </div>


          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }} >
                 <span className="icon icon-info"/>
                  &nbsp;
                  <span style={labelContentStyle}>job</span>
                </div>

    <div style={{ flex: "6 6 0px", display: "flex" }}>
<Radiobox attributesInputs={[
                      { id: "job-0", name: "job-0" },
                      { id: "job-1", name: "job-1" },
                      { id: "job-2", name: "job-2" }
                    ]}
                    disabled={false} 
                    value={job}
                    validate={validate}
                    validationCallback={res =>
                      this.setState({ hasJobError: res, validate: false })
                    } 
                    optionList={JOB_OPTIONS_LIST}
                   
 customStyleContainer={{ display: "flex",justifyContent: "flex-start"}} 

                    customStyleOptionListItem={{ marginRight: "20px" }}

                    onChange={(job, e) => {
                      this.setState({ job });
                      console.log(e);
                    }}
                    onBlur={e => {
                      console.log(e);
                    }}
                   
validationOption={{ name: "Name",check: true,required: true }}

                  />

                </div>
              </div>
            </div>
          </div>





          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}>
                  
                  <span className="icon icon-assignment-late" style={{ ...labelContentStyle, fontSize: "20px" }}/>
                  &nbsp;
                  <span style={labelContentStyle}>agreement</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Checkbox attributesWrapper={{}} attributesInput={{id: "agreement",name: "agreement"}}
                    value={agreement} 
                    checked={isAgreementChecked} 
                    disabled={false} 
                    validate={validate}
                    validationCallback={res => {
                      this.setState({
                        hasAgreementError: res,
                        validate: false
                      });
                    }}
                     
                    onBlur={() => {}} 
                   
                    onChange={(isAgreementChecked, e) => {
                      this.setState({ isAgreementChecked });
                      console.log(e);
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        agree?
                      </div>
                    } 
                    validationOption={{
                      name: "agreement", 
                      check: true,
                      required: true 
                        }}
                  />
                </div>
              </div>
            </div>
          </div>


          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}>
                  <span className="icon icon-bookmark"style={{ ...labelContentStyle, fontSize: "20px" }}/>
                  &nbsp;
                  <span style={labelContentStyle}>country</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
<Select  attributesInput={{id: "country",name: "country"}}
                    value={country}
                    disabled={false} 
                    showSearch={true}
                    validate={validate}
                    validationCallback={res =>
                      this.setState({ hasMovieError: res, validate: false })
                    } 
                    optionList={COUNTRY_OPTIONS_LIST} 
                  
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }} 
                    customStyleOptionListItem={{}} 
                    onChange={(res, e) => {
                      this.setState({ country: res.id });
                      console.log(e);
                    }}
                    onBlur={() => {}} 
                     validationOption={{
                      name: "Country or Region",
                      check: true, 
                      required: true 
                       }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-insert-drive-file"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>description</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "description",
                      name: "description",
                      placeholder: "Place your description here ^-^"
                     
                    }}
                    value={description}
                    disabled={false} 
                    
                    placeholder="Place your description here ^-^"
                    validate={validate} validationCallback={res =>
                      this.setState({
                        hasDescriptionError: res,
                        validate: false
                      })
                    } 
                   
                    onChange={(description, e) => {
                      this.setState({ description });
                      console.log(e);
                    }}
                    onBlur={e => {
                      console.log(e);
                    }} 
                    validationOption={{
                      name: "Description", 
                      check: true, 
                      required: true, 
                      type: "string" 
                      
                    }}
                  /                  
                  >
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ height: "10px" }} />
          <div
            className={`my-button my-button__red save-button`}
            onClick={this.validateForm}
          >
            validate!
          </div>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </div>
    );
  }
}


