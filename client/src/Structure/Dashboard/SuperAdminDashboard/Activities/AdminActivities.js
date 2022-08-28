import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./HomeWork.css";
import SuperAdminHeader from "../SuperAdminHeader";
import { DateTime } from 'react-datetime-bootstrap';


const AdminActivities = (props) => {
  let navigate = useNavigate();
  /*
  const [user_code, setUser_code] = useState(localStorage.getItem('user_code'))
  */
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));

  const [clses, setClses] = useState([]);
  const [searchClses, setSearchClses] = useState([]);
  const [cls, setCls] = useState("");
  const [id, setId] = useState("");

  const [sections, setSections] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [section, setSection] = useState("");
  const [status, setStatus] = useState("")

  const [schools, setSchools] = useState([]);
  const [searchSchools, setSearchSchools] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [search_subjects, setSearch_Subjects] = useState([]);
  const [subject, setSubject] = useState("");

  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState("");

  const [school_info_id, setSchool_info_id] = useState("");
  const [teacher_id, setTeacher_id] = useState(
    localStorage.getItem("user_code")
  );
  const [school_type, setSchoolType] = useState("")
  const [school_type_search, setSchoolTypeSearch] = useState("")

  const [class_id, setClass_id] = useState("");
  const [search_class_id, setSearchClass_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [search_section_id, setSearchSection_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [search_subject_id, setSearchSubject_id] = useState("");
  const [session_id, setSession_id] = useState("");
  const [search_session_id, setSearchSession_id] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [questions, setQuestions] = useState("");
  const [attachment, setAttachment] = useState("");
  const [issue_date, setIssue_date] = useState("");
  const [due_date, setDue_date] = useState("");
  const [sub_start_date, setSub_start_date] = useState("");
  const [sub_start_time, setSub_start_time] = useState("");
  const [search_issue_date, setSearch_Issue_date] = useState("");
  const [search_due_date, setSearch_Due_date] = useState("");
  const [timeSe, setTime] = useState("");
  const [search_school_id, setSearchShool_id] = useState("");
  const [access_token, setAccess_token] = useState(
    localStorage.getItem("access_token")
  );
  const [teacher, setTeacher] = useState({});

  const [homework, setHomework] = useState([]);
  const checkLoggedIn = () => {
    if (user_type != 5) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (school_type !== "" && school_type !== 'all') {
      axios
        .get(`${process.env.REACT_APP_NODE_API}/api/school_info_type_wise?type_id=${school_type}`, {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          setSchools(response.data);
        });
    } else {
      setSchools([]);
    }
  }, [school_type])
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
        // setSchool_info_id(response.data.school_info_id);
      });
  }, [teacher_id]);



  const handleSearch = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/teacher/filter?section_id=${search_section_id}&&class_id=${search_class_id}&&subject_id=${search_subject_id}&&issue_date=${search_issue_date}&&due_date=${search_due_date}&&session_id=${search_session_id}&&school_info_id=${search_school_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        if (status === 'Submitted') {
          setHomework(response.data.filter(res => res.submission > 0));

        } else if (status === 'Not Submitted') {
          setHomework(response.data.filter(res => res.submission === 0));
        } else {
          setHomework(response.data);
        }
      });
  }

  useEffect(() => {
    checkLoggedIn();

    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/school_type/all`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSchoolTypes(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type_search}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSearchClses(response.data);
      });
    if (school_type_search !== "") {
      axios
        .get(`${process.env.REACT_APP_NODE_API}/api/school_info_type_wise?type_id=${school_type_search}`, {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          setSearchSchools(response.data);
        });
    }
  }, [school_type_search]);
  useEffect(() => {
    if (school_type !== 'all') {
      axios
        .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`, {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          setClses(response.data);
        });
    } else {
      setClses([]);
    }
  }, [school_type]);
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
        `${process.env.REACT_APP_NODE_API}/api/subjects?class_id=${search_class_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSearch_Subjects(response.data);
        console.log(response.data)
      });
  }, [search_class_id]);

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
  let handleClassSearchChange = (e) => {
    setSearchClass_id(e.target.value);
  };
  let handleSectionChange = (e) => {
    setSection(e.target.value);
    setSection_id(e.target.value);
  };
  let handleSectionSearchChange = (e) => {
    setSearchSection_id(e.target.value);
  };

  let handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSubject_id(e.target.value);
  };
  let handleSubjectSearchChange = (e) => {
    setSearchSubject_id(e.target.value);
  };

  let handleSessionChange = (e) => {
    setSession(e.target.value);
    setSession_id(e.target.value);
  };
  let handleSessionSearchChange = (e) => {
    setSearchSession_id(e.target.value);
  };
  let handleTopicChange = (e) => {
    setTopic(e.target.value);
  };
  let handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };
  let handleQuestionsChange = (e) => {
    setQuestions(e.target.value);
  };
  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
  };
  let handleIssueDateChange = (e) => {
    setIssue_date(e.target.value);
  };
  let handleDueDateChange = (e) => {
    setDue_date(e.target.value);
  };
  let handleSubStartDateChange = (e) => {
    setSub_start_date(e.target.value);
  };
  let handleSubStartTimeChange = (e) => {
    setSub_start_time(e.target.value);
  };
  let handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    if (sub_start_date !== '' && sub_start_date !== undefined && sub_start_time !== '' && sub_start_time !== undefined) {
      const formData = new FormData();
      formData.append("file", attachment);
      formData.append("fileName", attachment.name);
      formData.append("school_info_id", school_info_id);
      formData.append("school_type", school_type);
      formData.append("class_id", class_id);
      formData.append("section_id", section_id);
      formData.append("subject_id", subject_id);
      formData.append("teacher_id", teacher_id);
      formData.append("questions", questions);
      formData.append("session_id", session_id);
      formData.append("topic", topic);
      formData.append("details", details);
      formData.append("issue_date", issue_date);
      formData.append("due_date", due_date);
      formData.append("sub_start_date", sub_start_date);
      formData.append("sub_start_time", sub_start_time);
      formData.append("id", id);
      formData.name =
        fetch(`${process.env.REACT_APP_NODE_API}/api/activities/teacher`, {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((json) => {
            if (id) {
              toast("Beyond The School updated successfully");
            } else {
              toast("Beyond The School submited successfully");
            }
            setId("");
            setClass_id("");
            setSchoolType("")
            setSchool_info_id("")
            setSection_id("");
            setSubject_id("");
            setSession_id("");
            setIssue_date("");
            setDue_date("");
            setTopic("");
            setDetails("");
            setQuestions("")
            setSub_start_date("")
            setSub_start_time("")
          })
          .then(() => getHWList());
    } else {
      toast('Please Enter Submission Start Date and Submission Start Time')
    }
  };

  const resetForm = () => {
    setId("");
    setClass_id("");
    setSection_id("");
    setSubject_id("");
    setSession_id("");
    setIssue_date("");
    setDue_date("");
    setTopic("");
    setDetails("");
    setQuestions("")
    setSub_start_date("")
    setSub_start_time("")
  }

  const editHomeWork = (data) => {
    setId(data.id);
    setSchoolType(data.type_id);
    setClass_id(data.all_class === 1 ? 'all' : data.class_id);
    setSection_id(data.all_section === 1 ? 'all' : data.section_id);
    setSubject_id(data.all_subject === 1 ? 'all' : data.subject_id);
    setSession_id(data.all_session === 1 ? 'all' : data.session_id);
    setIssue_date(moment(data.issue_date).format("YYYY-MM-DD"));
    setDue_date(moment(data.due_date).format("YYYY-MM-DD"));
    setTopic(data.topic);
    setDetails(data.details);
    setSchool_info_id(data.all_school === 1 ? 'all' : data.school_info_id);
    setQuestions(data.questions);
    setSub_start_date(data.sub_start_date)
    setSub_start_time(data.sub_start_time)
  }

  const deleteHomework = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/activities/student/delete?id=${id}`)
      if (result) {
        toast("Beyond The School deleted successfully");
        getHWList()
      }
    }

  }
  //get homework
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/teacher/individual?teacher_id=${teacher_id}`,
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
        `${process.env.REACT_APP_NODE_API}/api/activities/teacher/individual?teacher_id=${teacher_id}`,
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

  let handleDueDateSearchChange = (e) => {
    setSearch_Due_date(e.target.value);
  };
  let handleIssueDateSearchChange = (e) => {
    setSearch_Issue_date(e.target.value);
  };
  return (
    <>
      <SuperAdminHeader />
      <ToastContainer />

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
                      Create Beyond The School{" "}
                    </h3>
                  </div>
                  <div className="card-tools">
                    <button
                      id="w-change-close"
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      onClick={resetForm}
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
                  <div class={"col-sm-4 p-2 mx-auto"}>
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
                  <div class={"col-sm-6 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Questions :{" "}
                      </label>
                      <textarea
                        style={{ width: "100%", border: "1px solid blue" }}
                        class="form-control"
                        value={questions}
                        onChange={handleQuestionsChange}
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
                        onChange={handleAttachment}
                      />
                    </div>
                  </div>
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        School Type :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={school_type}
                        onChange={(e) => setSchoolType(e.target.value)}
                        id="class"
                        name="class"
                      >
                        <option value="">Select School Type</option>
                        <option value="all">All</option>
                        {schoolTypes.map((classJSON) => {
                          return (
                            <option value={classJSON.id}>
                              {classJSON.type_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class={"col-sm-2 mx-auto p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleSelect">
                        School :{" "}
                      </label>
                      <select
                        style={{ border: "1px solid blue" }}
                        class="form-control"
                        value={school_info_id}
                        onChange={(e) => setSchool_info_id(e.target.value)}
                        id="class"
                        name="class"
                      >
                        <option value="">Select School</option>
                        <option value="all">All</option>
                        {schools.map((classJSON) => {
                          return (
                            <option value={classJSON.id}>
                              {classJSON.school_name}
                            </option>
                          );
                        })}
                      </select>
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
                        <option value="all">All</option>
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
                        <option value="all">All</option>
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
                        <option value="all">All</option>
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
                        {/* {subjects.map((subjectJSON) => {
                          return (
                            <option value={subjectJSON.id}>
                              {subjectJSON.subject_name}
                            </option>
                          );
                        })} */}
                        <option value="99999">Beyond The School</option>
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
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Submission Start Date :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue" }}
                        type="date"
                        class="form-control"
                        value={sub_start_date}
                        onChange={handleSubStartDateChange}
                      />
                    </div>
                  </div>
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Submission Start Time :{" "}
                      </label>
                      <input
                        style={{ border: "1px solid blue" }}
                        type="time"
                        class="form-control"
                        value={sub_start_time}
                        onChange={handleSubStartTimeChange}
                      />
                    </div>
                  </div>
                  {/* <div class={"col-sm-2 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Time :{" "}
                      </label>
                      
                      <DateTime pickerOptions={{format:"DD-MM-YYYY h:mm a"}} value={timeSe} onChange={handleTimeChange}/>
                    </div>
                  </div> */}

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

          <div className='row'>
            <div className='col-md-12'>
              <div className="card card-dark collapsed-card">
                <div className='card-body' >
                  <div className='row'>

                    <div class={"col-sm-2 mx-auto p-2"}>
                      <div class="form-group">
                        <label className="pb-2" for="exampleSelect">
                          School Type :{" "}
                        </label>
                        <select
                          style={{ border: "1px solid blue" }}
                          class="form-control"
                          value={school_type_search}
                          onChange={(e) => setSchoolTypeSearch(e.target.value)}
                          id="class"
                          name="class"
                        >
                          <option value="">Select School Type</option>
                          <option value="all">All</option>
                          {schoolTypes.map((classJSON) => {
                            return (
                              <option value={classJSON.id}>
                                {classJSON.type_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div class={"col-sm-2 mx-auto p-2"}>
                      <div class="form-group">
                        <label className="pb-2" for="exampleSelect">
                          School :{" "}
                        </label>
                        <select
                          style={{ border: "1px solid blue" }}
                          class="form-control"
                          value={search_school_id}
                          onChange={(e) => setSearchShool_id(e.target.value)}
                          id="class"
                          name="class"
                        >
                          <option value="">Select School</option>
                          <option value="all">All</option>
                          {searchSchools.map((classJSON) => {
                            return (
                              <option value={classJSON.id}>
                                {classJSON.school_name}
                              </option>
                            );
                          })}
                        </select>
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
                          value={search_class_id}
                          onChange={handleClassSearchChange}
                          id="class"
                          name="class"
                        >
                          <option value="">Select Class</option>
                          <option value="all">All</option>
                          {searchClses.map((classJSON) => {
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
                          value={search_section_id}
                          onChange={handleSectionSearchChange}
                          id="class"
                          name="class"
                        >
                          <option value="">Select Section</option>
                          <option value="all">All</option>
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
                          value={search_session_id}
                          onChange={handleSessionSearchChange}
                          id="class"
                          name="class"
                        >
                          <option value="">Select Session</option>
                          <option value="all">All</option>
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
                          value={search_subject_id}
                          onChange={handleSubjectSearchChange}
                          id="class"
                          name="class"
                        >
                          <option value="">Select Subject</option>
                          {/* <option value="all">All</option>
                          {search_subjects.map((subjectJSON) => {
                            return (
                              <option value={subjectJSON.id}>
                                {subjectJSON.subject_name}
                              </option>
                            );
                          })} */}
                          <option value="99999">Beyond the school</option>
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
                          value={search_issue_date}
                          onChange={handleIssueDateSearchChange}
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
                          value={search_due_date}
                          onChange={handleDueDateSearchChange}
                        />
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

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">School Name</th>
                <th scope="col">Beyond The School Material</th>
                <th scope="col">Topic</th>
                <th scope="col">Question</th>
                <th scope="col">Assignment Details</th>
                <th scope="col">Class</th>
                <th scope="col">Section</th>
                <th scope="col">Academic Session</th>
                <th scope="col">Subject </th>
                <th scope="col">Start Date </th>
                <th scope="col">Due Date</th>
                <th scope="col">View Beyond The School</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {homework.map((homeworkJSON) => {
                return (
                  <tr>
                    <td>{homeworkJSON.all_school === 0 ? homeworkJSON.school_name : 'All'}</td>
                    <td>
                      <Link style={{ color: "blue" }} target="_blank" to={`${process.env.REACT_APP_NODE_API}/uploads/${homeworkJSON.attachment_link}`} download>{homeworkJSON.attachment_link}</Link>
                    </td>
                    <td>{homeworkJSON.topic}</td>
                    <td>{homeworkJSON.questions}</td>
                    <td>{homeworkJSON.details}</td>
                    <td>{homeworkJSON.all_class === 0 ? homeworkJSON.class_name : 'All'}</td>
                    <td>
                      {homeworkJSON.all_section === 0 ? homeworkJSON.section_default_name : 'All'}
                    </td>
                    <td>{homeworkJSON.all_session === 0 ? homeworkJSON.session_year : 'All'}</td>
                    <td>{homeworkJSON.all_subject === 0 ? homeworkJSON.subject_id === 99999 ? 'Beyond The School' : homeworkJSON.subject_name : 'All'}</td>
                    <td>
                      {moment(homeworkJSON.issue_date).format("DD-MM-YYYY")}
                    </td>
                    <td>
                      {moment(homeworkJSON.due_date).format("DD-MM-YYYY")}
                    </td>
                    <td>
                      {" "}
                      <a
                        onClick={() => {
                          localStorage.setItem("activityid", homeworkJSON.id);
                          navigate("/activityshow");
                        }}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        {" "}
                        View Beyond The School
                      </a>
                    </td>
                    <td>
                      <div className=".d-flex">
                        <div>
                          <button
                            style={{ color: "white" }}
                            className="bg-success"
                            onClick={() => editHomeWork(homeworkJSON)}
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                          <button
                            style={{ color: "white" }}
                            className="bg-danger"
                            onClick={() => deleteHomework(homeworkJSON.id)}
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

export default AdminActivities;
