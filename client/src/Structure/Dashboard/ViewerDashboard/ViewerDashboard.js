import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import calendar from "../../images/icons/calendar.png";
import attendance from "../../images/icons/attendance.png";
import homework from "../../images/icons/homework.png";
import evaluation from "../../images/icons/evaluation.png";
import activities from "../../images/icons/activities.png";
import profile from "../../images/profile/profile.png";
import routine from "../../images/icons/routine.png";
import notices from "../../images/icons/notices.png";
import eSchool from "../../images/icons/onlineclass.png";
import payment from "../../images/icons/payment.png";
import inventory from "../../images/icons/inventory.png";
import ViewerHeader from "./ViewerHeader";

const ViewerDashboard = () => {
  let navigate = useNavigate();

  const checkLoggedIn = () => {
    if (localStorage.getItem("user_type") != 6) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLoggedIn();
    console.log()
  }, []);


  return (
    <section class="">
      <ViewerHeader />
      <div class=" container row mx-auto my-4">
        <div className="mt-2 mx-auto">
          <h2 style={{ color: "green", fontSize: "24px", textAlign: 'center' }}>
            {localStorage.getItem("school_name")}
          </h2>
        </div>
        <h3
          style={{
            color: "Blue",
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
          className="mt-4"
        >
          Administrator Dashboard
        </h3>

        <a
          href="/viewer-calender"
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
          href="/viewerRoutine"
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
                  <p class="card-text">Create Routine</p>
                </div>
              </div>
            </div>
          </div>
        </a>

        <a
          style={{ textDecoration: "none" }}
          href="/viewershowattendanceview"
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
          href="/showhomework"
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
          href="/viewevaluation"
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
        <a href="/viewer-notice" style={{ textDecoration: "none" }} class="col-sm-6 my-4 col1">
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
        <a
          href=""
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
                    src={payment}
                    alt=""
                  />
                </div>
                <div className="px-3">
                  <h4 class="card-title">Payment</h4>
                  <p class="card-text">Create Payment Sector</p>
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
      </div>

      <div className="container my-2">
        <div style={{ display: "flex", justifyContent: "end" }}>
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
  );
};

export default ViewerDashboard;
