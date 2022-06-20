import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import attendance from "../../images/icons/attendance.png";
import routine from "../../images/icons/routine.png";
import homework from "../../images/icons/homework.png";
import evaluation from "../../images/icons/evaluation.png";
import payment from "../../images/icons/payment.png";
import notices from "../../images/icons/notices.png";
import activities from "../../images/icons/activities.png";
import inventory from "../../images/icons/inventory.png";
import calendar from "../../images/icons/calendar.png";
import eSchool from "../../images/icons/onlineclass.png";
import profile from "../../images/profile/profile.png";
import StudentHeader from "./StudentHeader";

const StudentDashboard = (props) => {
  let navigate = useNavigate();

  const [student, setStudent] = useState([]);
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
  const checkLoggedIn = () => {
    if (user_type != 1) {
      navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setStudent(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <StudentHeader />

      <section class="container">
        <h2 style={{ textAlign: 'center', color: 'blue' }} className='mt-4'>{school_name}</h2>
        <h1 style={{ textAlign: "center", color: "blue" }} className="mt-4">
          Student Dashboard
        </h1>
        <div class="row mx-auto mt-5">
          <a
            onClick={() => {
              navigate("/student-academic-calender");
            }}
            style={{ textDecoration: "none" }}
            class="col-sm-6 my-4 col1"
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
          </a>

          <a
            onClick={() => {
              navigate("/studentroutine");
            }}
            style={{ textDecoration: "none" }}
            class="col-sm-6 my-4 col1"
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
                    <p class="card-text">Make All Students Class Routine</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <a
            onClick={() => {
              navigate("/studentviewattendance");
            }}
            style={{ textDecoration: "none" }}
            class="col-sm-6 my-4 col1"
          >
            <div class="card  bg-light shadow-sm">
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
                      src={attendance}
                      alt=""
                    />
                  </div>

                  <div className="px-3">
                    <h4 class="card-title">Attendance</h4>
                    <p class="card-text">Make All Students Attendance</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            onClick={() => {
              navigate("/studenthomework");
            }}
            style={{ textDecoration: "none" }}
            class="col-sm-6 my-4 col1 "
          >
            <div class="card  bg-light shadow-sm ">
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
                      src={homework}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Home Work</h4>
                    <p class="card-text">Give HomeWork To All Students</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a
            onClick={() => {
              navigate("/student-notice-list");
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
            navigate("/studentEvaluation");
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
                      src={evaluation}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Evaluation</h4>
                    <p class="card-text">Make Students Evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
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
                      src={inventory}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Resources</h4>
                    <p class="card-text">Add Resources</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
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
                      src={activities}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Activities</h4>
                    <p class="card-text">Student Activities</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
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
                      src={eSchool}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">eSchool</h4>
                    <p class="card-text">Start Online Class</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <a style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
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
                      src={payment}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Payment</h4>
                    <p class="card-text">Create Students Payment Data</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="container my-2">
          <div style={{ display: "flex", justifyContent: "end", cursor: 'pointer' }}>
            <i
              style={{ fontSize: "30px", color: "blue" }}
              class="fa-solid fa-angle-left"
            ></i>
            <h5 style={{ color: "blue" }} className="px-2">
              <a
                onClick={() => {
                  localStorage.setItem("user_code", "");
                  localStorage.setItem("user_type", "");
                  navigate("/login");
                }}
              >
                {" "}
                LogOut
              </a>
            </h5>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDashboard;
