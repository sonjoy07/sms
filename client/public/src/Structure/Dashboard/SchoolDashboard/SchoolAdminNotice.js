import React, { useState, useEffect } from "react";

import axios from "axios";

const SchoolAdminNotice = () => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");

  const [clses, setClses] = useState([]);
  const [cls, setCls] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");

  const [periods, setPeriods] = useState([]);
  const [period, setPeriod] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");

  const [days, setDays] = useState([]);
  const [day, setDay] = useState("");

  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState("");

  const [shifts, setShifts] = useState([]);
  const [shift, setShift] = useState("");

  const [school_info_id, setSchool_info_id] = useState("");
  const [class_id, setClass_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [day_id, setDay_id] = useState("");
  const [period_id, setPeriod_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  const [room, setRoom] = useState("");
  const [session_id, setSession_id] = useState("");
  const [shift_id, setShift_id] = useState("");

  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/school_info`)
      .then((response) => {
        setSchools(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/class`)
      .then((response) => {
        setClses(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/section?class_id=${class_id}`)
      .then((response) => {
        setSections(response.data);
      });
  }, [class_id]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/period`)
      .then((response) => {
        setPeriods(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/subject?class_id=${class_id}`)
      .then((response) => {
        setSubjects(response.data);
      });
  }, [class_id]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/teacher`)
      .then((response) => {
        setTeachers(response.data);
      });
  }, []);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_API}/api/day`).then((response) => {
      setDays(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/session`)
      .then((response) => {
        setSessions(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/shift`)
      .then((response) => {
        setShifts(response.data);
      });
  }, []);

  //Get Routine Data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/routine/all`)
      .then((response) => {
        setRoutine(response.data);
      });
  }, []);

  let handleSchoolChange = (e) => {
    setSchool(e.target.value);
    setSchool_info_id(e.target.value);
  };
  let handleClassChange = (e) => {
    setCls(e.target.value);
    setClass_id(e.target.value);
  };
  let handleSectionChange = (e) => {
    setSection(e.target.value);
    setSection_id(e.target.value);
  };
  let handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setPeriod_id(e.target.value);
  };
  let handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSubject_id(e.target.value);
  };
  let handleTeacherChange = (e) => {
    setTeacher(e.target.value);
    setTeacher_id(e.target.value);
  };
  let handleDayChange = (e) => {
    setDay(e.target.value);
    setDay_id(e.target.value);
  };
  let handleRoomChange = (e) => {
    setRoom(e.target.value);
  };
  let handleSessionChange = (e) => {
    setSession(e.target.value);
    setSession_id(e.target.value);
  };
  let handleShiftChange = (e) => {
    setShift(e.target.value);
    setShift_id(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/routine/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        class_id: class_id,
        section_id: section_id,
        day_id: day_id,
        period_id: period_id,
        subject_id: subject_id,
        teacher_id: teacher_id,
        room: room,
        school_info_id: school_info_id,
        session_id: session_id,
        shift_id: shift_id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("ok");
      });
  };

  return (
    <div>
      <div className="card card-primary">
        <div className="card-header">
          <div className="d-flex justify-content-between px-4">
            <div>
              <h2 style={{ fontWeight: "bold" }} class="card-title text-info ">
                Add Notice
              </h2>
            </div>
            <div className="card-tools">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fas fa-plus icons" />
              </button>
            </div>
          </div>
        </div>
        {/* /.card-header */}
        <div class="collapse" id="collapseExample">
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>School</label>
                    <select
                      className="form-control"
                      value={school_info_id}
                      onChange={handleSchoolChange}
                    >
                      <option value="">Select</option>
                      {schools.map((schoolJSON) => {
                        return (
                          <option value={schoolJSON.id}>
                            {schoolJSON.school_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Class</label>
                    <select
                      className="form-control"
                      value={class_id}
                      onChange={handleClassChange}
                    >
                      <option value="">Select</option>
                      {clses.map((classJSON) => {
                        return (
                          <option value={classJSON.id}>
                            {classJSON.class_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Section</label>
                    <select
                      className="form-control"
                      value={section_id}
                      onChange={handleSectionChange}
                    >
                      <option value="">Select</option>
                      {sections.map((sectionJSON) => {
                        return (
                          <option value={sectionJSON.id}>
                            {sectionJSON.section_local_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Day</label>
                    <select
                      className="form-control"
                      value={day_id}
                      onChange={handleDayChange}
                    >
                      <option value="">Select</option>
                      {days.map((dayJSON) => {
                        return (
                          <option value={dayJSON.id}>{dayJSON.day}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Period</label>
                    <select
                      className="form-control"
                      value={period_id}
                      onChange={handlePeriodChange}
                    >
                      <option value="">Select</option>
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
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      className="form-control"
                      value={subject_id}
                      onChange={handleSubjectChange}
                    >
                      <option value="">Select</option>
                      {subjects.map((subjectJSON) => {
                        return (
                          <option value={subjectJSON.id}>
                            {subjectJSON.subject_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Teacher</label>
                    <select
                      className="form-control"
                      value={teacher_id}
                      onChange={handleTeacherChange}
                    >
                      <option value="">Select</option>
                      {teachers.map((teacherJSON) => {
                        return (
                          <option value={teacherJSON.id}>
                            {teacherJSON.full_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Room</label>
                    <input
                      type="text"
                      className="form-control"
                      value={room}
                      onChange={handleRoomChange}
                      placeholder="Enter ..."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Session</label>
                    <select
                      className="form-control"
                      value={session_id}
                      onChange={handleSessionChange}
                    >
                      <option value="">Select</option>
                      {sessions.map((sessionJSON) => {
                        return (
                          <option value={sessionJSON.id}>
                            {sessionJSON.session_year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Shift</label>
                    <select
                      className="form-control"
                      value={shift_id}
                      onChange={handleShiftChange}
                    >
                      <option value="">Select</option>
                      {shifts.map((shiftJSON) => {
                        return (
                          <option value={shiftJSON.id}>
                            {shiftJSON.shift_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row float-right">
                <a
                  href=""
                  className="btn btn-primary "
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </a>
              </div>
              {/* input states */}
            </form>
          </div>
        </div>
        {/* /.card-body */}
      </div>

      <div className="row mt-2">
        <div className="col-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">All Notices</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Day</th>
                    <th>Period</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Room</th>
                    <th>Session</th>
                    <th>Shift</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {routine.map((routineJSON) => {
                    return (
                      <tr>
                        <td>{routineJSON.id}</td>
                        <td>{routineJSON.class_name}</td>
                        <td>{routineJSON.section_local_name}</td>
                        <td>{routineJSON.day}</td>
                        <td>{routineJSON.period_code}</td>
                        <td>{routineJSON.subject_name}</td>
                        <td>{routineJSON.first_name}</td>
                        <td>{routineJSON.room}</td>
                        <td>{routineJSON.session_year}</td>
                        <td>{routineJSON.shift_name}</td>
                        <td>
                          <a href="" className="btn btn-success mr-3">
                            Edit
                          </a>
                          <a href="" className="btn btn-danger">
                            Delete
                          </a>
                        </td>
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
  );
};

export default SchoolAdminNotice;
