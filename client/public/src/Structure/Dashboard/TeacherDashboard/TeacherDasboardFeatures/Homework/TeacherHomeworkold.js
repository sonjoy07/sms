import React, { useState, useEffect } from "react";

import axios from "axios";

const TeacherHomework = () => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");

  const [clses, setClses] = useState([]);
  const [cls, setCls] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");

  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState("");

  const [school_info_id, setSchool_info_id] = useState("");
  const [class_id, setClass_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  const [session_id, setSession_id] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [issue_date, setIssue_date] = useState("");
  const [due_date, setDue_date] = useState("");
  const [school_type, setSchoolType] = useState(localStorage.getItem("school_type"))

  const [homework, setHomework] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/school_info`)
      .then((response) => {
        setSchools(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`)
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
      .get(`${process.env.REACT_APP_NODE_API}/api/subject`)
      .then((response) => {
        setSubjects(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/teacher`)
      .then((response) => {
        setTeachers(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/session`)
      .then((response) => {
        setSessions(response.data);
      });
  }, []);

  //Get Routine Data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/homework/all`)
      .then((response) => {
        setHomework(response.data);
        console.log(response.data);
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

  let handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSubject_id(e.target.value);
  };
  let handleTeacherChange = (e) => {
    setTeacher(e.target.value);
    setTeacher_id(e.target.value);
  };

  let handleSessionChange = (e) => {
    setSession(e.target.value);
    setSession_id(e.target.value);
  };
  let handleTopicChange = (e) => {
    setTopic(e.target.value);
  };
  let handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };
  let handleIssueDateChange = (e) => {
    setIssue_date(e.target.value);
  };
  let handleDueDateChange = (e) => {
    setDue_date(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_NODE_API}/api/homework/all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school_info_id: school_info_id,
        class_id: class_id,
        section_id: section_id,
        subject_id: subject_id,
        teacher_id: teacher_id,
        session_id: session_id,
        topic: topic,
        details: details,
        issue_date: issue_date,
        due_date: due_date,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("ok");
      });
  };

  return (
    <div>
      <div className="card card-primary collapsed-card">
        <div className="card-header">
          <h3 className="card-title">Add Home Work</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
        {/* /.card-header */}
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
                  <label>Topic</label>
                  <input
                    type="text"
                    className="form-control"
                    value={topic}
                    onChange={handleTopicChange}
                    placeholder="Enter ..."
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Details</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    value={details}
                    onChange={handleDetailsChange}
                    placeholder="Enter ..."
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Issue Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={issue_date}
                    onChange={handleIssueDateChange}
                    placeholder="Enter ..."
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={due_date}
                    onChange={handleDueDateChange}
                    placeholder="Enter ..."
                  />
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
        {/* /.card-body */}
      </div>

      <div className="row mt-2">
        <div className="col-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">All Home Works</h3>
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 150 }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Topic</th>
                    <th>Details</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {homework.map((homeworkJSON) => {
                    return (
                      <tr>
                        <td>{homeworkJSON.id}</td>
                        <td>{homeworkJSON.class_name}</td>
                        <td>{homeworkJSON.section_local_name}</td>
                        <td>{homeworkJSON.subject_name}</td>
                        <td>{homeworkJSON.first_name}</td>
                        <td>{homeworkJSON.topic}</td>
                        <td>{homeworkJSON.details}</td>
                        <td>{homeworkJSON.issue_date}</td>
                        <td>{homeworkJSON.due_date}</td>
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

export default TeacherHomework;
