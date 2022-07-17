import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import calendar from "../../images/icons/calendar.png";
import organization from "../../images/icons/organization.png";
import ebook from "../../images/icons/ebook.png";
import school from "../../images/icons/school.png";
import notices from "../../images/icons/notices.png";
import routine from "../../images/icons/routine.png";
import student from "../../images/icons/student.png";
import teacher from "../../images/icons/teacher.png";
import accounts from "../../images/icons/accounts.png";
import csv from "../../images/icons/csv.png";
import evaluation from "../../images/icons/evaluation.png";
import SchoolHeader from "./schoolHeader/SchoolHeader";
import { toast } from 'react-toastify';
import axios from "axios";
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

  const generateRank =()=>{
    axios
    .get(`${process.env.REACT_APP_NODE_API}/api/student-rank/${localStorage.getItem('school_id')}`, {
        headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
        },
    })
    .then((response) => {
        toast('Student Position updated')
    });
  }
  return (
    <>
      <SchoolHeader/>
      <section className="container">
        <h2 style={{ textAlign: 'center', color: 'blue' }} className='mt-4'>{school_name}</h2>
        <h1 style={{ textAlign: "center", color: "blue" }} className="mt-4">
          School Admin Dashboard
        </h1>
        <div className="row mx-auto mt-5">
          <div
            onClick={() => {
              navigate("/academic-calender");
            }}
            className="col-sm-6 my-4 col1"
            style={{ textDecoration: "none" }}
          >
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Academic Calendar</h4>
                    <p className="card-text">Add Academic Calendar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            onClick={() => {
              navigate("/admin-notice-sms");
            }} style={{ textDecoration: "none" }} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Note's</h4>
                    <p className="card-text">Add Note's/Events</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

         
          <a onClick={() => {
            navigate('/create-exam')
          }
          } style={{ textDecoration: "none" }} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="text-dark card-title">Evaluation</h4>
                    <p className="card-text">Make Students Evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div
            className="col-sm-6 my-4 col1"
            onClick={() => {
              navigate("/schooladminroutine");
            }}
          >
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Routine</h4>
                    <p className="card-text">Create Routine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => {
            navigate("/add-student")
          }} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Student</h4>
                    <p className="card-text">Add Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => {
            navigate("/add-teacher")
          }} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Teacher</h4>
                    <p className="card-text">Add Teacher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div onClick={() => {
            navigate('/payment')
          }
          } className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Accounts</h4>
                    <p className="card-text">Create Accounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <a href='/subjectregistration' style={{textDecoration: 'none'}} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
               <div className="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={student} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 className="card-title">Student Registration</h4>
                         <p className="card-text">Add Student Subject</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </a>
          <Link to='/sms-report' style={{textDecoration: 'none'}} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
               <div className="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={ebook} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 className="card-title">SMS Report</h4>
                         <p className="card-text">SMS details</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </Link> 
        <Link to='/csv-upload' style={{textDecoration: 'none'}} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
               <div className="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={csv} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 className="card-title">CSV Upload</h4>
                         <p className="card-text">CSV upload for teacher student routine</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </Link>
        <div onClick={() => {
            navigate("/school-admin")
          }} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                    <h4 className="card-title">Mentoring Student</h4>
                    <p className="card-text">Add Mentoring Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to='/payment' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
               <div class="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={accounts} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 class="card-title">Payment</h4>
                         <p class="card-text">Create Payment Sector</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </Link>
        <div onClick={() => {
            generateRank()
          }} className="col-sm-6 my-4 col1">
            <div className="card bg-light shadow-sm">
              <div className="card-body py-4">
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
                      src={school}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 className="card-title">Generate Position</h4>
                    <p className="card-text">Student Position</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to='/sms-payment' style={{textDecoration: 'none'}} class="col-sm-6 my-4 col1">
            <div class="card bg-light shadow-sm">
               <div class="card-body py-4">
               <div style={{display: 'flex', justifyContent:'center',alignItems:'center'}} className=''> 
                       <div className='px-3'>
                          <img style={{width:'64px', height:'64px'}} src={accounts} alt=""/>
                       </div>
                       <div className='px-3'>
                         <h4 class="card-title">SMS Payment</h4>
                         <p class="card-text">Create SMS Payment</p>
                       </div>
                   </div>
                 
               </div>
            </div>
        </Link>

        </div>
      </section>
    </>
  );
};

export default SchoolDashboard;
