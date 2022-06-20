import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import axios from "axios";

const ShowHomeWork = () => {
  let navigate = useNavigate();

  const [school_info_id, setSchool_info_id] = useState(
    localStorage.getItem("school_id")
  );
  const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"))
  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [date, setDate] = useState("");
  const [homework, setHomework] = useState([]);

  const [class_id, setClass_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  const [subject_id, setSubject_id] = useState("");

  const [clses, setClses] = useState([]);
  const [cls, setCls] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");


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
  let handleDateChange = (e) => {
    setDate(e.target.value);
  };

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
        `${process.env.REACT_APP_NODE_API}/api/subject?class_id=${class_id}&school_type_id=${school_type}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSubjects(response.data);
      });
  }, [class_id, school_info_id]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${school_info_id}`,
        {
          headers: { authorization: "bearer " + localStorage.getItem("access_token") },
        }
      )
      .then((response) => {
        setTeachers(response.data);

      });
  }, [school_info_id]);


  const getHomework = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/homework/all/filter?school_info_id=${school_info_id}&class_id=${class_id}&section_id=${section_id}&subject_id=${subject_id}&date=${date}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setHomework(response.data);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className="d-flex justify-content-between px-2">
                  <div>
                    <h3
                      style={{
                        color: "LightSeaGreen",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                      class="card-title py-2"
                    >
                      Student Home Work
                    </h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div class={"col-sm-6 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Class :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        className="form-control"
                        value={class_id}
                        onChange={handleClassChange}
                        id="class"
                        name="class"
                      >
                        <option>Select Class</option>
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
                  <div class={"col-sm-6 mx-auto p-2"}>
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
                        <option>Select Subject</option>
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
                  <div class={"col-sm-6 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Section :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        className="form-control"
                        value={section_id}
                        onChange={handleSectionChange}
                        id="class"
                        name="class"
                      >
                        <option>Select Section</option>
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
                  <div class={"col-sm-6 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Teacher Initial:{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        className="form-control"
                        value={teacher_id}
                        onChange={handleTeacherChange}
                        id="class"
                        name="class"
                      >
                        <option>Select Initial</option>
                        {teachers.map((teacherJSON) => {
                          return (
                            <option value={teacherJSON.id}>
                              {teacherJSON.initial}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Date :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue" }}
                        type="date"
                        class="form-control"
                        value={date}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>

                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div className="pt-2 mx-auto">
                      <button
                        style={{ color: "white", fontSize: "20px" }}
                        type="button"
                        class="btn bg-secondary bg-gradient px-5"
                        onClick={getHomework}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container mt-5">
        <h2
          style={{ color: "white", backgroundColor: "gray" }}
          className="px-2 py-2"
        >
          Student Home Sheet
        </h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }} scope="col">
                class
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Subject
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Section
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Teacher Initial
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Topic
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Home Work
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Submission Details
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                {" "}
                Start Date
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {homework.length > 0 ? (
              homework.map((homeworkJSON) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      {homeworkJSON.class_name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {homeworkJSON.subject_name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {homeworkJSON.section_local_name}
                    </td>
                    <td style={{ textAlign: "center", color: "blue" }}>
                      <a
                        onClick={() => {
                          localStorage.setItem(
                            "user_code",
                            homeworkJSON.teacher_id
                          );
                          navigate("/teacherprofile");
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        {homeworkJSON.initial}
                      </a>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {homeworkJSON.topic}
                    </td>
                    <td style={{ textAlign: "center", color: "blue" }}>
                      Show Home Work
                    </td>
                    <td style={{ textAlign: "center", color: "blue" }}>
                      <a
                        onClick={() => {
                          localStorage.setItem("homeworkid", homeworkJSON.id);
                          navigate("/submitdetails");
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        Submission Details
                      </a>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(homeworkJSON.issue_date).format("YYYY-MM-DD")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(homeworkJSON.due_date).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>No Data To Show</div>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ShowHomeWork;
