import logo from './logo.svg';
import './App.css';
//==================================  Import all dependencies  ============================

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import config from './config/config'
import home from './Components/home'
import login from './Components/login'
import changepassword from './Components/changepassword';
import homepage from './Components/homepage'
import myplan from './Components/myplan';
import mycoach from './Components/mycoach'
import plandetails from './Components/plandetails';
import mycoachupdate from './Components/mycoachupdate'
import mycoart from './Components/mycoart'
import timeslot from './Components/coarttimeslot'
import coartimages  from './Components/coartimages'
import Facilities  from './Components/Facilities'
import termscondition  from './Components/termscondition'
import coachtimeslot  from './Components/coachtimeslot'
import mycoartupdate from './Components/mycoartupdate';
import enquiry from './Components/enquiry'
import contactus from './Components/contactus'
import certificateimages from './Components/certificateimages';
import websitecontent from './Components/websitecontent'
import updatewebsitecontent from './Components/updatewebsitecontent'
import overservices from './Components/overservices'
import updateoverservices from './Components/updateoverservices'
import homeslider from './Components/homeslider'
import updatehomeslider from './Components/updatehomeslider'
import Testimonials from './Components/Testimonials'
import updatetestimonials from './Components/updatetestimonials'
import homeadditionalservices from './Components/homeadditionalservices'
import updatehomeadditionalservices from './Components/updatehomeadditionalservices'
import faq from './Components/faq'
import updatefaq from './Components/updatefaq'
import terms_condition from './Components/terms_condition'
import privacy_policy from './Components/privacy_policy'
 import demo from './Components/demo'

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Menu /> */}
        <Switch>
          
          <Route path={`${config.baseUrl}home`} exact component={home} />
          <Route path={`${config.baseUrl}`} exact component={login} />
          <Route path={`${config.baseUrl}changepassword`} exact component={changepassword} />
          <Route path={`${config.baseUrl}homepage`} exact component={homepage} />
          <Route path={`${config.baseUrl}myplan`} exact component={myplan} />
          <Route path={`${config.baseUrl}plandetails/:package_plan_id`} exact component={plandetails} />
          <Route path={`${config.baseUrl}mycoach`} exact component={mycoach} />
          <Route path={`${config.baseUrl}coachtimeslot/:coachid`} exact component={coachtimeslot} />
          <Route path={`${config.baseUrl}mycoachupdate/:coachid`} exact component={mycoachupdate} />
          <Route path={`${config.baseUrl}mycoart`} exact component={mycoart} />
          <Route path={`${config.baseUrl}coarttimeslot/:coartid`} exact component={timeslot} />
          <Route path={`${config.baseUrl}coartimages/:coartid`} exact component={coartimages} />
          <Route path={`${config.baseUrl}Facilities/:coartid`} exact component={Facilities} />
          <Route path={`${config.baseUrl}termscondition/:coartid`} exact component={termscondition} />
          <Route path={`${config.baseUrl}mycoartpdate/:coartid`} exact component={mycoartupdate} />
          <Route path={`${config.baseUrl}enquiry`} exact component={enquiry} />
          <Route path={`${config.baseUrl}contactus`} exact component={contactus} />
          <Route path={`${config.baseUrl}certificateimages`} exact component={certificateimages} />
          <Route path={`${config.baseUrl}websitecontent`} exact component={websitecontent} />
          <Route path={`${config.baseUrl}updatewebsitecontent/:websitecontentid`} exact component={updatewebsitecontent} />
          <Route path={`${config.baseUrl}overservices`} exact component={overservices} />
          <Route path={`${config.baseUrl}updateoverservices/:overservicesid`} exact component={updateoverservices} />
          <Route path={`${config.baseUrl}homeslider`} exact component={homeslider} />
          <Route path={`${config.baseUrl}updatehomeslider/:homesliderid`} exact component={updatehomeslider} />
          <Route path={`${config.baseUrl}Testimonials`} exact component={Testimonials} />
          <Route path={`${config.baseUrl}updatetestimonials/:Testimonialsid`} exact component={updatetestimonials} />
          <Route path={`${config.baseUrl}homeadditionalservices`} exact component={homeadditionalservices} />
          <Route path={`${config.baseUrl}updatehomeadditionalservices/:homeadditionalservicesid`} exact component={updatehomeadditionalservices} />
          <Route path={`${config.baseUrl}faq`} exact component={faq} />
          <Route path={`${config.baseUrl}updatefaq/:faqid`} exact component={updatefaq }/>
          <Route path={`${config.baseUrl}terms_condition`} exact component={terms_condition} />
          <Route path={`${config.baseUrl}privacy_policy`} exact component={privacy_policy} />
           <Route path={`${config.baseUrl}demo`} exact component={demo} /> 
       </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
