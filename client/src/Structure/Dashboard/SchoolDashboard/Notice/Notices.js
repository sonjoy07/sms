import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calendar from "../../../images/icons/calendar.png";
import organization from "../../../images/icons/organization.png";
import class1 from "../../../images/icons/class.png";
import section from "../../../images/icons/section.png";
import notices from "../../../images/icons/notices.png";
import subject from "../../../images/icons/subject.png";
import routine from "../../../images/icons/routine.png";
import student from "../../../images/icons/student.png";
import teacher from "../../../images/icons/teacher.png";
import accounts from "../../../images/icons/accounts.png";
import profile from "../../../images/profile/profile.png";
import evaluation from "../../../images/icons/evaluation.png";
const Notices = () => {
  let navigate = useNavigate();
  const [school_name, setSchoolName] = useState(localStorage.getItem("school_name"));
  const [user_code, setUser_code] = useState(localStorage.getItem("admin_code"));
  const [first_name, setFirst_code] = useState(localStorage.getItem("first_name"));
  const [last_name, setLast_code] = useState(localStorage.getItem("last_name"));

  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  const checkLoggedIn = () => {
    if (localStorage.getItem("user_type") != 4) {
      navigate("/login");
    }
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
          
          <a
            onClick={() => {
              navigate("/admin-notices");
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

          <div class="col-sm-6 my-4 col1">
            <div onClick={() => {
              navigate("/admin-sms-sent");
            }} class="card bg-light shadow-sm">
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
                      src={subject}
                      alt=""
                    />
                  </div>
                  <div className="px-3">
                    <h4 class="card-title">Sent SMS</h4>
                    <p class="card-text">Sending SMS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </section>
    </>
  );
};

export default Notices;
