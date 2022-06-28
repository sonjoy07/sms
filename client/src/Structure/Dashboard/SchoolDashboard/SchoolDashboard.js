import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calendar from "../../images/icons/calendar.png";
import organization from "../../images/icons/organization.png";
import ebook from "../../images/icons/ebook.png";
import section from "../../images/icons/section.png";
import notices from "../../images/icons/notices.png";
import subject from "../../images/icons/subject.png";
import routine from "../../images/icons/routine.png";
import student from "../../images/icons/student.png";
import teacher from "../../images/icons/teacher.png";
import accounts from "../../images/icons/accounts.png";
import profile from "../../images/profile/profile.png";
import evaluation from "../../images/icons/evaluation.png";
const SchoolDashboard = () => {
  let navigate = useNavigate();
  const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
  const [user_code, setUser_code] = useState(localStorage.getItem("admin_code"));
  const [first_name, setFirst_code] = useState(localStorage.getItem("first_name"));
  const [last_name, setLast_code] = useState(localStorage.getItem("last_name"));

  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  const checkLoggedIn = () => {
    // if (localStorage.getItem("user_type") != 4) {
    //   navigate("/login");
    // }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <>
      <div style={{ height: "80px" }} className="bg-primary">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="container"
        >
          <div className="dropdown">
            <button style={{ padding: '0px' }} class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img style={{ width: "50px", height: "50px" }} src={profile} alt="profile" />
            </button>
            <ul class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
              <li><a onClick={() => {
                localStorage.setItem("user_code", "");
                localStorage.setItem("user_type", "");
                navigate("/login");
              }} class="dropdown-item">Log out</a></li>
              <li><a class="dropdown-item" href="#">profile</a></li>

            </ul>
          </div>

          <div>
            <h3
              className=""
              style={{
                color: "white",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Name : {first_name} ({last_name})
            </h3>
            <h4
              className=""
              style={{
                color: "white",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Admin Id: {user_code}
            </h4>
          </div>
        </div>
      </div>
      <section class="container">
        <h2 style={{ textAlign: 'center', color: 'blue' }} className='mt-4'>{school_name}</h2>
        <h1 style={{ textAlign: "center", color: "blue" }} className="mt-4">
          School Admin Dashboard
        </h1>
        <div class="row mx-auto mt-5">
          <div
            onClick={() => {
              navigate("/academic-calender");
            }}
            class="col-sm-6 my-4 col1"
            style={{ textDecoration: "none" }}
          >
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={calendar}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Academic Calendar</h4>
                    <p class="card-text">Add Academic Calendar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            onClick={() => {
              navigate("/admin-notice-sms");
            }} style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={notices}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Notices</h4>
                    <p class="card-text">Add Notices/Events</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

         
          <a onClick={() => {
            navigate('/create-exam')
          }
          } style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={evaluation}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="text-dark card-title">Evaluation</h4>
                    <p class="card-text">Make Students Evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div
            class="col-sm-6 my-4 col1"
            onClick={() => {
              navigate("/schooladminroutine");
            }}
          >
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={routine}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Routine</h4>
                    <p class="card-text">Create Routine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => {
            navigate("/add-student")
          }} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={student}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Student</h4>
                    <p class="card-text">Add Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => {
            navigate("/add-teacher")
          }} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={teacher}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Teacher</h4>
                    <p class="card-text">Add Teacher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => {
            navigate('/payment')
          }
          } class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
              <div class="card-body py-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className=""
                >
                  <div className="px-3">
                    <img
                      style={{ width: "64px", height: "64px" }}
                      src={accounts}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Accounts</h4>
                    <p class="card-text">Create Accounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href='/subjectregistration' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
               <div class="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={student} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 class="card-title">Student Registration</h4>
                         <p class="card-text">Add Student Subject</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </a>
          <a href='/sms-report' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
               <div class="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={ebook} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 class="card-title">SMS Report</h4>
                         <p class="card-text">SMS details</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </a>
        </div>
      </section>
    </>
  );
};

export default SchoolDashboard;
