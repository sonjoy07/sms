import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import calendar from "../../../../images/icons/calendar.png";
import attendance from "../../../../images/icons/attendance.png";
import homework from "../../../../images/icons/homework.png";
import evaluation from "../../../../images/icons/evaluation.png";
import activities from "../../../../images/icons/activities.png";
import routine from "../../../../images/icons/routine.png";
import notices from "../../../../images/icons/notices.png";
import eSchool from "../../../../images/icons/onlineclass.png";
import payment from "../../../../images/icons/payment.png";
import inventory from "../../../../images/icons/inventory.png";
import ViewerHeader from "./../../ViewerHeader";

const ListNotice = () => {
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

       
        <a
          onClick={() => {
            navigate("/show-notice?type=2");
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
                    src={evaluation}
                    alt=""
                  />
                </div>
                <div className="px-3">
                  <h4 class="card-title">School Notes</h4>
                  <p class="card-text">Show Notes</p>
                </div>
              </div>
            </div>
          </div>
        </a>
        <a 
          onClick={() => {
            navigate("/show-notice?type=1");
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
                  <h4 class="card-title">Teacher Notes</h4>
                  <p class="card-text">Show Notes</p>
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

export default ListNotice;
