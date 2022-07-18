import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherProfile.css";
import profile from "../../../images/profile/profile.png";
import TeacherHeader from "../TeacherHeader/TeacherHeader";
import { Link, useParams } from "react-router-dom";

const TeacherProfilebyId = () => {
  let { id } = useParams();
  // const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${id}`,
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
    <><TeacherHeader />
      <div class="container">
        <div class="main-body my-5">

          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body py-5">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src={
                      teacher.photo_id ? `/uploads/${teacher.photo_id}` : profile} alt="Admin" class="rounded-circle" width="150" />
                    <div class="my-4">
                      <h4>{teacher?.full_name}</h4>
                      {/* <p class="text-secondary mb-1">Full Stack Developer</p>
                      <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 ">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Teacher Code : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher.teacher_code}
                    </div>
                  </div>

                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher?.full_name}
                    </div>
                  </div>

                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Mobile No. : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher?.mobile}
                    </div>
                  </div>

                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">School Name : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher.school_name}
                    </div>
                  </div>

                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Designation : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher.designation}
                    </div>
                  </div>
                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Department : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher.department}
                    </div>
                  </div>
                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Blood Group : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher.blood_group}
                    </div>
                  </div>
                  <div class="row py-2">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Date of Birth : </h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {teacher.dob}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div></>
  );
};

export default TeacherProfilebyId;
