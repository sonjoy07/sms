import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeacherDashboard.css";
import attendance from "../../images/icons/attendance.png";
import routine from "../../images/icons/routine.png";
import homework from "../../images/icons/homework.png";
import evaluation from "../../images/icons/evaluation.png";
import notices from "../../images/icons/notices.png";
import activities from "../../images/icons/activities.png";
import inventory from "../../images/icons/inventory.png";
import calendar from "../../images/icons/calendar.png";
import eSchool from "../../images/icons/onlineclass.png";
import student from "../../images/icons/student.png";
import profile from "../../images/profile/profile.png";

const TeacherDashboard = (props) => {
  let navigate = useNavigate();
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [uid, setUid] = useState(localStorage.getItem("u_id"));
  const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );

  const [teacher, setTeacher] = useState({});
  const checkLoggedIn = () => {
    if (localStorage.getItem("user_type") != 2) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${user_code}`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setTeacher(response.data);
        console.log(response.data);
      });
  }, [user_code, access_token]);

  // console.log(teacher[0].full_name);
  // if(teacher.length == 0) return <></>
  return (
    <div>
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
              <li><a class="dropdown-item" href="/teacherprofile">profile</a></li>

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
              Name: {teacher.full_name}
            </h3>
            <h4
              className=""
              style={{
                color: "white",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Id : {teacher.teacher_code}
            </h4>
          </div>
        </div>
      </div>

      <section class="container">
        <h2 style={{ textAlign: 'center', color: 'blue' }} className='mt-4'>{school_name}</h2>
        <h1 style={{ textAlign: "center", color: "blue" }} className="mt-4">
          Teacher Dashboard
        </h1>
        <div class="row mx-auto mt-3">
          <a
            onClick={() => {
              navigate("/teacher-calender");
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
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigate("/routine");
            }}
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
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigate("/teacherattendance");
            }}
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
              navigate("/teacherhomework");
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
              navigate("/teachernotice");
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
            navigate('/markentry')
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
                      src={student}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Students</h4>
                    <p class="card-text">All Students Portal</p>
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
                      src={activities}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Activity</h4>
                    <p class="card-text">Student Activities</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>


      </section>
    </div>
  );
};

export default TeacherDashboard;
