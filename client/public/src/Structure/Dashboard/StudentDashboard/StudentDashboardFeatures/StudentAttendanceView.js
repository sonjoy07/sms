import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./StudentAttendanceView.css";
import { Navigate } from "react-router-dom";
import StudentHeader from "../StudentHeader";

const StudentAttendanceView = (props) => {
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [school_type, setSchoolType] = useState(localStorage.getItem("school_type"))
  const [classType, setClass] = useState(localStorage.getItem("class"))
  const [student, setStudent] = useState([]);
  const [cls, setCls] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");

  const [periods, setPeriods] = useState([]);
  const [period, setPeriod] = useState("");

  const [period_id, setPeriod_id] = useState(null);
  const [subject_id, setSubject_id] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);

  const [attendance, setAttendance] = useState([]);
  const checkLoggedIn = () => {
    if (user_type != 1) {
      Navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])
  const handleClass = (e) => {

  }
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
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/student/individual?student_id=${user_code}`
      )
      .then((response) => {
        setAttendance(response.data);
      });

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
        axios
          .get(`${process.env.REACT_APP_NODE_API}/api/period`, {
            headers: {
              authorization: "bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((response) => {
            setPeriods(response.data);
            console.log(response.data)
          });
        axios
          .get(
            `${process.env.REACT_APP_NODE_API}/api/subjects?class_id=${classType}`,
            {
              headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            setSubjects(response.data);
          });
      });
  }, []);

  let handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setPeriod_id(e.target.value);
  };
  let handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSubject_id(e.target.value);
    console.log(e.target.value)
  };

  const getReport = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/student/individual?student_id=${user_code}&period_id=${period_id}&subject_id=${subject_id}&start_date=${start_date}&end_date=${end_date}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setAttendance(response.data);
      });
  };

  const handlelist = () => {
    document.getElementById("list").classList.toggle("active");
  };
  return (
    <>
      <StudentHeader />
      <section>
        <div className="content ">
          <div className="row p-4">
            <div className="col-md-12">
              <div className="card card-dark collapsed-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between px-4">
                    <div>
                      <h2
                        style={{
                          color: "LightSeaGreen",
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                        class="card-title text-info pt-2"
                      >
                        {" "}
                        Student Attendance Summary
                      </h2>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="card-body py-5 "
                  id="list"
                >
                  <div style={{ width: "500px" }} className="row bg-light">
                    <div className="p-3">
                      <div style={{ display: "flex" }} className="">
                        <div style={{ width: "100%" }}>
                          <div class="form-group">
                            <label
                              style={{ fontSize: "20px", fontWeight: "bolder" }}
                              className="p-2"
                              for="exampleInputEmail1"
                            >
                              Start Date :{" "}
                            </label>
                            <br />
                            <input
                              type="date"
                              class="form-control"
                              value={start_date}
                              onChange={(e) => setStart_date(e.target.value)}
                            />
                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <div class="form-group">
                            <label
                              style={{ fontSize: "20px", fontWeight: "bolder" }}
                              className="p-2"
                              for="exampleInputEmail1"
                            >
                              End Date :{" "}
                            </label>
                            <br />
                            <input
                              type="date"
                              class="form-control"
                              value={end_date}
                              onChange={(e) => setEnd_date(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div class={" mx-auto"}>
                        <div class="form-group">
                          <label
                            style={{ fontSize: "20px", fontWeight: "bolder" }}
                            className="p-2"
                            for="exampleInputEmail1"
                          >
                            Date :{" "}
                          </label>
                          <br />
                          <input type="date" class="form-control" />
                        </div>
                      </div> */}

                      <div class={" mx-auto"}>
                        <div class="form-group">
                          <label
                            style={{ fontSize: "20px", fontWeight: "bolder" }}
                            className="p-2"
                            for="exampleSelect"
                          >
                            Period :{" "}
                          </label>
                          <select
                            class="form-control"
                            id="class"
                            name="class"
                            value={period_id}
                            onChange={handlePeriodChange}
                          >
                            <option value="null">Select Period</option>
                            {periods.map((periodJSON) => {
                              return (
                                <option value={periodJSON.id}>
                                  {periodJSON.period_code}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div class={"mx-auto"}>
                        <div class="form-group">
                          <label
                            style={{ fontSize: "20px", fontWeight: "bolder" }}
                            className="p-2"
                            for="exampleSelect"
                          >
                            Subject :{" "}
                          </label>
                          <select
                            class="form-control"
                            id="class"
                            name="class"
                            value={subject_id}
                            onChange={handleSubjectChange}
                          >
                            <option value="null">Select Subject</option>
                            {subjects.map((subjectJSON) => {
                              return (
                                <option value={subjectJSON.id}>
                                  {subjectJSON.subject_name}
                                </option>
                              );
                            })}
                            <option>
                              Information and Communication Technology
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class={" mx-auto"}>
                        <div class="form-group p-3">
                          <button
                            style={{ fontSize: "24px" }}
                            type="button"
                            class="btn btn-secondary form-control"
                            onClick={getReport}
                          >
                            View Attendance{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row mt-2">
          <div className="col-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Attendance History</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Period</th>
                      <th>Subject</th>
                      <th>Teacher</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((attendanceJSON) => {
                      return (
                        <tr>
                          <td>
                            {moment(attendanceJSON.date).format("YYYY-MM-DD")}
                          </td>
                          <td>{attendanceJSON.period_code}</td>
                          <td>{attendanceJSON.subject_name}</td>
                          <td>{attendanceJSON.teacher_name}</td>
                          <td>{attendanceJSON.present_status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-sm-6">
          <div
            style={{ marginTop: "80px", marginBottom: "60px" }}
            class="progress blue"
          >
            <span class="progress-left">
              <span class="progress-bar"></span>
            </span>
            <span class="progress-right">
              <span class="progress-bar"></span>
            </span>
            <div class="progress-value">90%</div>
          </div>
        </div>
        <div className="col-sm-6">
          <section className="p-4 ">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th className="" scope="col">
                    Date
                  </th>
                  <th scope="col">Bangla</th>
                  <th scope="col">English</th>
                  <th scope="col">Physics</th>
                  <th scope="col">Chemistry</th>
                  <th scope="col">Biology</th>
                  <th scope="col">Geography</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mx-auto">07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
                <tr>
                  <td>07-APR-22</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                  <td>Present</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <section>
        <div style={{ display: "flex" }}>
          <div className="px-4">
            <h3 className="text-primary">Total Days : 365</h3>
          </div>
          <div>
            <div className="px-4">
              <h3 className="text-warning">Present : 300 </h3>
            </div>
            <div className="px-4">
              <h3 className="text-danger">Absent : 65</h3>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default StudentAttendanceView;
