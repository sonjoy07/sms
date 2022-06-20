import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import moment from "moment";

import profile from "../../../../images/profile/profile.png";
import TeacherHeader from "../../TeacherHeader/TeacherHeader";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const TeacherAttendance = (props) => {
  const navigate = useNavigate();

  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [teacher, setTeacher] = useState({});
  const [student, setStudent] = useState([]);

  const [routine, setRoutine] = useState([]);

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(moment().format("hh:mm:ss"));
  const [day, setDay] = useState(moment().format("dddd"));

  const [routine_id, setRoutine_id] = useState(null);
  const [attendance, setAttendance] = useState([]);

  const [summary, setSummary] = useState([]);

  const [latest_summary, setLatest_summary] = useState({});
  const [totalpresent, setTotalpresent] = useState(0);
  const [latest_attendance, setLatest_attendance] = useState([]);
  const [teacher_id, setTeacher_id] = useState(
    localStorage.getItem("user_code")
  );
  const [school_id, setSchool_id] = useState(localStorage.getItem("school_id"))
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  // const[class_id,setClass]=useState('')


  const checkLoggedIn = () => {
    if (user_type != 2) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  //get teacher 
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${teacher_id}`,
        {
          headers: { authorization: "bearer " + access_token },
        }
      )
      .then((response) => {
        setTeacher(response.data);
        console.log(response.data);
      });
  }, [teacher_id, access_token]);
  //Get Routine Data
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/routine/teacher/today?teacher_id=${user_code}&today=${day}&school_info_id=${school_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setRoutine(response.data);
      });
  }, [day]);


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/attendance/summary/all`,
        {
          headers: { authorization: "bearer " + access_token },
        })
      .then((response) => {
        setSummary(response.data);
      });
  }, []);

  // const getAttendanceSummary = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_NODE_API}/api/attendance/summary/all`)
  //     .then((response) => {
  //       setSummary(response.data);
  //     });
  // };
  const getAttendanceSummary = () => {
    var summary = {
      total: student.length,
      present: totalpresent,
      absent: student.length - totalpresent,
    };
    setLatest_summary(summary);
  };

  let handleDateChange = (e) => {
    setDate(e.target.value);
  };

  //Get Student Data
  const getStudentList = (sec_id, rt_id, class_id) => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/student?section_id=${sec_id}&school_info_id=${school_id}&class_id=${class_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setStudent(response.data);
        // setSection_id(sec_id);
        // setSubject_id(sub_id);
        setRoutine_id(rt_id);
        let at_list = [];
        response.data.map((stu) => {
          at_list.push({ student_id: stu.id, attendance_status: 0 });
        });
        console.log(at_list);
        setAttendance(at_list);
      });
  };

  const handleAttendance = (index) => {
    let att_list = attendance;
    if (att_list[index].attendance_status == 0) {
      att_list[index].attendance_status = 1;
      setTotalpresent(totalpresent + 1);
    } else {
      att_list[index].attendance_status = 0;
      setTotalpresent(totalpresent - 1);
    }
    console.log(att_list);
    setAttendance(att_list);
  };

  const handleSubmit = () => {
    if (date == null || routine_id == null) {
      return;
    }

    fetch(`${process.env.REACT_APP_NODE_API}/api/attendance/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        date: date,
        time: moment().format("HH:mm:ss"),
        routine_id: routine_id,
        attendance: attendance,
      }),
    })
      .then((res) => res.json())
      .then(() => setStudent([]))
      .then(() => {
        getAttendanceSummary();
        var st_list = [];
        student.map((studentJSON, index) => {
          var st = {
            name: studentJSON.full_name,
            roll: studentJSON.class_roll_no,
            attendance: attendance[index].attendance_status == 1 ? "P" : "A",
          };
          st_list.push(st);
        });
        setLatest_attendance(st_list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TeacherHeader />

      <section>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-dark">
                <div className="card-header">
                  <div className="d-flex justify-content-between px-4">
                    <div>
                      <h2
                        style={{ fontWeight: "bold" }}
                        class="card-title text-info "
                      >
                        Attendance
                      </h2>
                    </div>
                    <div className="card-tools">
                      {/* <button
                      type="button"
                      className="btn btn-tool"
                      data-toggle="collapse"
                      data-target="#routine"
                      aria-expanded="false"
                      aria-controls="routine"
                    >
                      <i className="fas fa-plus icons" />
                    </button> */}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className="row "
                    data-spy="scroll"
                    id="routine"
                    style={{
                      padding: "20px",
                      margin: "10px",
                      background: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {routine.map((routineJSON) => {
                      return (
                        <div className="col-12 p-4 border">
                          <div style={{ display: "flex" }}>
                            <h5
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              {routineJSON.day}
                            </h5>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            ></h5>
                            <h5
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            ></h5>
                          </div>

                          <div style={{ display: "flex" }}>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              {routineJSON.period_code} Period
                            </h6>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              ||{" "}
                            </h5>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              {routineJSON.start_time} - {routineJSON.end_time}
                            </h6>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Subject : {routineJSON.subject_name}
                            </h6>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              ||{" "}
                            </h5>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Class : {routineJSON.class_name}
                            </h6>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Section : {routineJSON.section_default_name}
                            </h6>
                            <h5
                              className="mx-2 text-warning"
                              style={{ textAlign: "left" }}
                            >
                              {" "}
                              ||{" "}
                            </h5>
                            <h6
                              className=""
                              style={{ textAlign: "left", color: "#00CC99" }}
                            >
                              Room : {routineJSON.room}
                            </h6>
                          </div>
                          <div>
                            <button
                              type="button"
                              class="btn btn-secondary"
                              onClick={() => {
                                getStudentList(
                                  routineJSON.section_id,
                                  routineJSON.id,
                                  routineJSON.class
                                );
                                // setClass(routineJSON.class);
                                setLatest_attendance([]);
                                setLatest_summary({});
                                setTotalpresent(0);
                              }}
                            >
                              Take Attendance
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            student.length > 0
              ? "card card-primary mt-5"
              : "card card-primary mt-5 d-none"
          }
        >
          <div
            className="card-body"
            style={{ background: "#EFEFEF", height: "", padding: "0" }}
          >
            <div className="row p-3">
              <div className="col-sm-6">
                <div
                  style={{
                    display: "flex",
                    color: "#008080",
                    paddingLeft: "25px",
                  }}
                >
                  <h3 style={{ fontWeight: "bold" }}>
                    Today: {moment().format("DD-MMM-YYYY")}
                  </h3>
                </div>
              </div>
            </div>

            <div className="row table-responsive">
              {student.map((studentJSON, index) => {
                return (
                  <div className="col-12 text-center">
                    <div
                      className="row"
                      style={{
                        padding: "20px",
                        margin: "10px",
                        background: "#fff",
                        borderRadius: "5px",
                      }}
                    >
                      <div className="col-2">
                        <img style={{ width: "50px" }} src={profile} alt="" />
                      </div>
                      <div className="col-8">
                        <h5 className="ml-3" style={{ textAlign: "left" }}>
                          {studentJSON.full_name}
                        </h5>
                        <p className="ml-3" style={{ textAlign: "left" }}>
                          Roll: {studentJSON.class_roll_no}
                        </p>
                        <p className="ml-3" style={{ textAlign: "left" }}>
                          ID: {studentJSON.student_code}
                        </p>
                        <p className="ml-3" style={{ textAlign: "left" }}>
                          Phone: {studentJSON.mobile_no}
                        </p>
                      </div>
                      <div className="col-2 form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => handleAttendance(index)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row float-right p-5">
              <a className="btn btn-primary text-white" onClick={handleSubmit}>
                Submit
              </a>
            </div>
          </div>
        </div>
        <div style={{ width: "700px" }} className="m-auto mt-5">
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th>Total Attendance Taken</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{latest_summary.total}</td>
                <td>{latest_summary.present}</td>
                <td>{latest_summary.absent}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {latest_attendance.map((studentJSON, index) => {
                return (
                  <tr>
                    <td>{studentJSON.name}</td>
                    <td>{studentJSON.roll}</td>
                    <td>{studentJSON.attendance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default TeacherAttendance;
