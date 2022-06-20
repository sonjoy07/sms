import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./HomeWork.css";
import profile from '../../../../images/profile/profile.png';

const TeacherHomework = (props) => {
  let navigate = useNavigate();
  /*
  const [user_code, setUser_code] = useState(localStorage.getItem('user_code'))
  */
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));

  const [clses, setClses] = useState([]);
  const [cls, setCls] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");

  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState("");

  const [school_info_id, setSchool_info_id] = useState("");
  const [teacher_id, setTeacher_id] = useState(
    localStorage.getItem("user_code")
  );
  const [school_type, setSchoolType] = useState(localStorage.getItem("school_type"))



  const [class_id, setClass_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [session_id, setSession_id] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [issue_date, setIssue_date] = useState("");
  const [due_date, setDue_date] = useState("");
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  const [teacher, setTeacher] = useState({});

  const [homework, setHomework] = useState([]);
  const checkLoggedIn = () => {
    if (user_type != 2) {
      navigate("/login");
    }
  };
  //get teacher info
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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${teacher_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSchool_info_id(response.data.school_info_id);
      });
  }, [teacher_id]);

  useEffect(() => {
    checkLoggedIn();
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
      .get(
        `${process.env.REACT_APP_NODE_API}/api/subjects?class_id=${class_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSubjects(response.data);
        console.log(response.data)
      });
  }, [class_id]);

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
    fetch(`${process.env.REACT_APP_NODE_API}/api/homework/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
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
        setClass_id("");
        setSection_id("");
        setSubject_id("");
        setSession_id("");
        setIssue_date("");
        setDue_date("");
        setTopic("");
        setDetails("");
      })
      .then(() => getHWList());
  };
  //get homework
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/homework/teacher/individual?teacher_id=${teacher_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setHomework(response.data);
      });
  }, []);

  const getHWList = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/homework/teacher/individual?teacher_id=${teacher_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setHomework(response.data);
      });
  };

  return (
    <>
      <div style={{ height: "80px" }} className="bg-info">
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
              Name: {teacher.full_name}
            </h3>
            <h4
              className=""
              style={{
                color: "white",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Id : {teacher.teacher_code}
            </h4>
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="row mt-4">
          <div className=" col-md-12">
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className="d-flex justify-content-between px-4">
                  <div>
                    <h3
                      style={{
                        color: "LightSeaGreen",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                      class="card-title pt-2"
                    >
                      Create Home Work{" "}
                    </h3>
                  </div>
                  <div className="card-tools">
                    <button
                      id="w-change-close"
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-plus icons" />
                    </button>
                    {/* onClick={handlelist} */}
                    {/* active */}
                  </div>
                </div>
              </div>

              <div className="card-body">
                {/* id='list' */}

                <div className="row">
                  <div class={"col-sm-3 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Topic :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue" }}
                        type="text"
                        class="form-control"
                        value={topic}
                        onChange={handleTopicChange}
                      />
                    </div>
                  </div>
                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Assignment Details :{" "}
                      </label>
                      <textarea
                        style={{ width: "100%", border: "1px solid blue" }}
                        class="form-control"
                        value={details}
                        onChange={handleDetailsChange}
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>
                  </div>
                  <div class={"col-sm-3 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Assignment Attachment :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue", padding: "3px" }}
                        type="file"
                        class="form-control"
                        id="avatar"
                        name="avatar"
                      />
                    </div>
                  </div>

                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Class :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={class_id}
                        onChange={handleClassChange}
                        id="class"
                        name="class"
                      >
                        <option value="">Select Class</option>
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
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Section :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={section_id}
                        onChange={handleSectionChange}
                        id="class"
                        name="class"
                      >
                        <option value="">Select Section</option>
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
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Academic Session :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={session_id}
                        onChange={handleSessionChange}
                        id="class"
                        name="class"
                      >
                        <option value="">Select Session</option>
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
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Subject :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={subject_id}
                        onChange={handleSubjectChange}
                        id="class"
                        name="class"
                      >
                        <option value="">Select Subject</option>
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
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Start Date :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue" }}
                        type="date"
                        class="form-control"
                        value={issue_date}
                        onChange={handleIssueDateChange}
                      />
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Due Date :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue" }}
                        type="date"
                        class="form-control"
                        value={due_date}
                        onChange={handleDueDateChange}
                      />
                    </div>
                  </div>

                  {/* <div style={{paddingTop: '20px'}} class={"col-sm-2 mx-auto"}>
                   <button  type="button" class="btn btn-primary">Primary</button>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="pt-2 mx-auto"
        >
          <button
            style={{ color: "white", fontSize: "25px" }}
            type="button"
            class="btn bg-secondary bg-gradient py-2 px-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <section className="py-5">
          <h2
            style={{ color: "white" }}
            className="px-5 py-2 bg-info bg-gradient"
          >
            School Information :{" "}
          </h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Home Work Meterial</th>
                <th scope="col">Assignment Details</th>
                <th scope="col">Class</th>
                <th scope="col">Section</th>
                <th scope="col">Academic Session</th>
                <th scope="col">Subject </th>
                <th scope="col">Start Date </th>
                <th scope="col">Due Date</th>
                <th scope="col">View HomeWork</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {homework.map((homeworkJSON) => {
                return (
                  <tr>
                    <td>
                      <a style={{ color: "blue" }}>Download Attachment</a>
                    </td>
                    <td style={{ color: "blue" }}>{homeworkJSON.details}</td>
                    <td style={{ color: "blue" }}>{homeworkJSON.class_name}</td>
                    <td style={{ color: "blue" }}>
                      {homeworkJSON.section_local_name}
                    </td>
                    <td style={{ color: "blue" }}>{homeworkJSON.session_year}</td>
                    <td style={{ color: "blue" }}>{homeworkJSON.subject_name}</td>
                    <td style={{ color: "blue" }}>
                      {moment(homeworkJSON.issue_date).format("YYYY-MM-DD")}
                    </td>
                    <td style={{ color: "blue" }}>
                      {moment(homeworkJSON.due_date).format("YYYY-MM-DD")}
                    </td>
                    <td>
                      {" "}
                      <a
                        onClick={() => {
                          localStorage.setItem("homeworkid", homeworkJSON.id);
                          navigate("/homeworksubmitlist");
                        }}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        {" "}
                        View Home Work
                      </a>
                    </td>
                    <td>
                      <div className=".d-flex">
                        <div>
                          <button
                            style={{ color: "white" }}
                            className="bg-success"
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                          <button
                            style={{ color: "white" }}
                            className="bg-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default TeacherHomework;
