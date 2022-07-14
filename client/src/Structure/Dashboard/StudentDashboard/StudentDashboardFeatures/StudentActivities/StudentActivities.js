import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import profile from '../../../../images/profile/profile.png';
import StudentHeader from "../../StudentHeader";

const StudentActivities = (props) => {
  let navigate = useNavigate();
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [student, setStudent] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [homework, setHomework] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [class_id, setClass_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [issue_date, setIssue_date] = useState("");
  const [due_date, setDue_date] = useState("");
  const [status, setStatus] = useState("")
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
        axios
          .get(
            `${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${response.data[0].school_info_id}`,
            {
              headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            setTeachers(response.data)
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

  }, []);



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
      .get(
        `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data[0].class_id);
        setClass_id(response.data[0].class_id)
        setSection_id(response.data[0].section_id)
        axios
          .get(
            `${process.env.REACT_APP_NODE_API}/api/activities/student?section_id=${response.data[0].section_id}&&school_info_id=${response.data[0].school_info_id}&&session_id=${response.data[0].session_id}&&class_id=${response.data[0].class_id}`,
            {
              headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            setHomework(response.data);
          });
      });
  }, []);
  const handleSearch = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/student/filter?section_id=${section_id}&&class_id=${class_id}&&subject_id=${subject_id}&&issue_date=${issue_date}&&due_date=${due_date}&&teacher_id=${teacher_id}&&status=${status}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        if (status === 'Submitted') {
          setHomework(response.data.filter(res => res.submission > 0));

        } else if(status === 'Not Submitted'){
          setHomework(response.data.filter(res => res.submission === 0));
        }else{
          setHomework(response.data);
        }
      });
  }
  let handleTeacherChange = (e) => {
    setTeacher_id(e.target.value);
  };

  let handleSubjectChange = (e) => {
    setSubject_id(e.target.value);
  };

  let handleDueDateChange = (e) => {
    setDue_date(e.target.value);
  };
  let handleIssueDateChange = (e) => {
    setIssue_date(e.target.value);
  };
  console.log(homework);
  return (
    <div>
      <StudentHeader/>
      <div className="container">


        <div className='row'>
          <div className='col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className='card-body' >
                <div className='row'>
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
                        End Date :{" "}
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
                  <div class={"col-sm-2 p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        Teacher :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={teacher_id}
                        onChange={handleTeacherChange}
                        id="class"
                        name="class"
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((sectionJSON) => {
                          return (
                            <option value={sectionJSON.id}>
                              {sectionJSON.full_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Status: </label>
                      <select style={{ border: '1px solid blue' }} value={status} onChange={(e) => setStatus(e.target.value)} class="form-control" id="class" name="class">

                        <option>Select Status</option>
                        <option>Submitted</option>
                        <option>Not Submitted</option>
                      </select>

                    </div>
                  </div>
                  <div class={"col-sm-2 p-2"}>
                    <div className='pt-2 mx-auto'>
                      <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSearch}>Search</button>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
        {homework.map((homeworkJSON) => {
          return (
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
                            fontWeight: "700",
                          }}
                          class="card-title pt-2"
                        >
                          {homeworkJSON.topic}
                        </h3>
                        <h5
                          style={{
                            color: "LightSeaGreen",
                            fontSize: "18px",
                            fontWeight: "400",
                          }}
                          class="card-title pt-2"
                        >
                          {homeworkJSON.subject_name}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="container">
                    <div className="mt-2">
                      <div
                        className=""
                        style={{
                          background: "#EFEFEF",
                          height: "",
                          padding: "0",
                        }}
                      >
                        <div className="row">
                          <div className="col-12 text-center">
                            <div className="row" style={{ background: "#fff" }}>
                              <a
                                onClick={() => {
                                  localStorage.setItem(
                                    "homeworkid",
                                    homeworkJSON.id
                                  );
                                  navigate("/studentActivitiesSubmit");
                                }}
                                style={{ textDecoration: "none" }}
                                className="col-12"
                              >
                                <div>
                                  <h5
                                    style={{ textAlign: "left", color: "black" }}
                                    className="py-3"
                                  >
                                    {homeworkJSON.details}
                                  </h5>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <i
                                    style={{ color: "black" }}
                                    class="fa-solid fa-clock  pt-1"
                                  ></i>
                                  <p
                                    className="mx-2"
                                    style={{ textAlign: "left", color: "red" }}
                                  >
                                    {" "}
                                    Last Date:{" "}
                                    {moment(homeworkJSON.due_date).format(
                                      "Do MMM  YYYY"
                                    )}{" "}
                                  </p>
                                  <p
                                    className=""
                                    style={{ textAlign: "left", color: "black" }}
                                  ></p>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentActivities;
