import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherProfile.css";
import profile from "../../../images/profile/profile.png";

const TeacherProfile = () => {
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setTeacher(response.data);
      });
  }, []);

  return (
    <div>
      <div class="container my-5 p-3 d-flex justify-content-center">
        <div class="card p-5">
          <div class=" image d-flex flex-column justify-content-center align-items-center">
            <img src={profile} height="100" width="100" />
            <span
              style={{ fontSize: "24px", fontWeight: "700" }}
              class="name mt-3"
            >
              {teacher.full_name} ({teacher.initial})
            </span>
            <span
              style={{ fontSize: "16px", fontWeight: "400" }}
              class="idd my-2"
            >
              Contact : {teacher.mobile}
            </span>
            <span class="idd">Email : {teacher.email}</span>
          </div>
        </div>

      </div>
      <div className='' style={{ display: 'flex', marginLeft: "600px" }}>
        <div class="row  p-2">
          <div class="col-sm-12">
            <a class="btn btn-info" href="#">Edit</a>
          </div>
        </div>
        <div class="row mx-1 p-2">
          <div class="col-sm-12">
            <a class="btn btn-info" href="/teacherpassword">Reset Password</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
