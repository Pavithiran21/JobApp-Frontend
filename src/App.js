import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from './Components/Basics/Login';
import { AdminDashboard } from './Components/Admin/AdminDashboard';
import { AdminJobList } from './Components/Job/AdminJobList';
import { ViewJob } from './Components/Job/VIewJob';
import { CreateJob } from './Components/Job/CreateJob';
import { EditJob } from './Components/Job/EditJob';
import { AllJobs } from './Components/Applicant/Jobs/AllJobs';
import { ApplicantView } from './Components/Applicant/Jobs/ViewJob';
import { ApplicantProfileList } from './Components/Admin/ApplicantProfileList';
import { AllApplication } from './Components/Admin/AllApplication';
import { Register } from './Components/Basics/Register';
import { Activate } from './Components/Basics/Activate';
import { Forgot } from './Components/Basics/Forgot';
import { Reset } from './Components/Basics/Reset';
import { ApplicantDashboard } from './Components/Applicant/Dashboard/ApplicantDashboard';

import { ProfileView } from './Components/Admin/ProfileView';
import { CreateProfile } from './Components/Applicant/Profile/CreateProfile';
import { ViewProfile } from './Components/Applicant/Profile/ViewProfile';
import { EditProfile } from './Components/Applicant/Profile/EditProfile';
import { ViewApplication } from './Components/Applicant/Application/ViewApplication';
import { ApplicationList } from './Components/Applicant/Application/ApplicationList';
import { AdminApplicationView } from './Components/Admin/AdminApplicationView';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/activate/:activeToken' element={<Activate/>}/>
          <Route path='/reset' element={<Forgot/>}/>
          <Route path='/reset/:resetToken' element={<Reset/>}/>
          <Route path='/admin-dashboard/' element={<AdminDashboard/>}/>
          <Route path='/admin/create-job' element={<CreateJob/>}/>
          <Route path='/admin/edit-job/:id' element={<EditJob/>}/>
          <Route path='/admin-job-list/' element={<AdminJobList/>}/>
          <Route path='/admin/all-profile/' element={<ApplicantProfileList/>}/>
          <Route path='/admin/all-applications/' element={<AllApplication/>}/>
          <Route path='/view-profile/:id' element={<ProfileView/>}/>
          <Route path='/view-job/:id' element={<ViewJob/>}/>
          <Route path='/applicant-dashboard/' element={<ApplicantDashboard/>}/>
          <Route path='/all-jobs/' element={<AllJobs/>} />
          <Route path='/applicant/view-job/:id' element={<ApplicantView/>}/>
          <Route path='/add-profile' element={<CreateProfile/>}/>
          <Route path='/edit-profile/:id' element={<EditProfile/>}/>
          <Route path='/applicant/view-profile/:id' element={<ViewProfile/>}/>
          <Route path='/applicant/view-application/:id' element={<ViewApplication/>}/>
          <Route path='/my-applications/:userId' element={<ApplicationList/>}/>
          <Route path='/admin/view-application/:id' element={<AdminApplicationView/>}/>


          
         
          

        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
