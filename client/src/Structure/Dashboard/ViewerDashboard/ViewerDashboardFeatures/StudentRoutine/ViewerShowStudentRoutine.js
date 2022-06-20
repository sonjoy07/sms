import React, { useState, useEffect } from "react";
import moment from "moment";

import axios from "axios";
import ViewerHeader from "../../ViewerHeader";

const ViewerShowStudentRoutine = () => {
  const [school_id, setSchool_info_id] = useState(
    localStorage.getItem("school_id")
  );
  const [school_type, setType] = useState(localStorage.getItem("school_type"))
  const [today, setToday] = useState(moment().format("dddd"));
  const [routine, setRoutine] = useState([]);
  const [day, setDay] = useState('')
  const [days, setDays] = useState([]);
  const [teacher_id, setTeacherId] = useState()
  const [teachers, setTeachers] = useState([])
  const [clses, setClses] = useState([]);
  const [sections, setSections] = useState([]);


  const [sessions, setSessions] = useState([]);
  const [session_id, setSession] = useState("");
  const [class_id, setClass_id] = useState("");
  const [show, setShow] = useState(true)
  const [section_id, setSection_id] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/routine/admin-search?school_info_id=${school_id}&teacher_id=${teacher_id}&class_id=${class_id}&section_id=${section_id}&day_id=${day}&session_id=${session_id}`,
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

  }, [class_id, school_id, session_id, section_id, day, teacher_id])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/session`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSessions(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/day`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setDays(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/section/all`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSections(response.data);
      });
  }, [class_id]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${school_id}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setTeachers(response.data);
        console.log(response.data)
      });
  }, [school_id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setClses(response.data);
      });
  }, []);
  let handleClassChange = (e) => {
    setClass_id(e.target.value);
    console.log(e.target.value)
  };
  let handleSectionChange = (e) => {
    setSection_id(e.target.value);
    console.log(e.target.value)
  };
  let handleTeacherChange = (e) => {
    setTeacherId(e.target.value);
    console.log(e.target.value)
  };
  let handleDayChange = (e) => {
    setDay(e.target.value);
    console.log(e.target.value)
  };
  let handleSessionChange = (e) => {
    setSession(e.target.value);
    console.log(e.target.value)
  };


  const handleSearch = () => {
    setClass_id('')
    setTeacherId('')
    setSession('')
    setDay('')
    setSection_id('')
    setShow(true)

  }
  return (
    <div>
      <ViewerHeader />

      <div className='container pt-4'>
        <div className='row'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-1'>
                  <div>
                    <h3 style={{ color: '#008B8B', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2">See Routine</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body' >
          <div className="row">
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
                        {sectionJSON.section_default_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Day</label>
                  <select
                    className="form-control"
                    value={day}
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
              <div className="col-sm-4 mx-auto px-5">
                <div class="form-group">
                  <button onClick={handleSearch} className="btn btn-primary">
                    Search Routine
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        show ? (
          <section className="container">

            <div className="mt-5">
              <div className="card card-primary mt-2">
                <div
                  className="card-body"
                  style={{ background: "#EFEFEF", height: "", padding: "0" }}
                >
                  <div className="row">
                    <div className="col-12 text-center">
                      {routine.map((routineJSON) => {
                        return (
                          <div
                            className="row"
                            style={{
                              padding: "20px",
                              margin: "10px",
                              background: "#fff",
                              borderRadius: "5px",
                            }}
                          >

                            <div className="col-12">
                              <div style={{ display: "flex" }}>
                                <h5
                                  className=""
                                  style={{ textAlign: "left", color: "#00CC99" }}
                                >
                                  {routineJSON.day}
                                </h5>
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
                              <h6
                                className=""
                                style={{ textAlign: "left", color: "#00CC99" }}
                              >
                                Teacher Initial : {routineJSON.initial}
                              </h6>
                            </div>
                          </div>    
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null
      }
    </div>
  );
};

export default ViewerShowStudentRoutine;
