import React, { useState, useEffect } from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";
import SchoolHeader from "./schoolHeader/SchoolHeader";
import { toast } from "react-toastify";

const SchoolAdminRoutine = () => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");
  const [id, setId] = useState("");
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [school_id, setSchool_id] = useState(localStorage.getItem("school_id"));
  const [school_name, setSchool_name] = useState(localStorage.getItem("school_name"));
  const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"));

  const [clses, setClses] = useState([]);
  const [cls, setCls] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");

  const [periods, setPeriods] = useState([]);
  const [period, setPeriod] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [search_subjects, setSearch_Subjects] = useState([]);
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
  const [search_class_id, setSearch_Class_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [search_section_id, setSearch_Section_id] = useState("");
  const [day_id, setDay_id] = useState("");
  const [search_day_id, setSearch_Day_id] = useState("");
  const [period_id, setPeriod_id] = useState("");
  const [search_period_id, setSearch_Period_id] = useState("");
  const [subject_id, setSubject_id] = useState("");
  const [search_subject_id, setSearch_Subject_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  const [search_teacher_id, setSearch_Teacher_id] = useState("");
  const [room, setRoom] = useState("");
  const [session_id, setSession_id] = useState("");
  const [search_session_id, setSearch_Session_id] = useState("");
  const [shift_id, setShift_id] = useState("");
  const [search_shift_id, setSearch_Shift_id] = useState("");
  const [checkedStudentAll, setCheckedStudentAll] = useState(false);
  const [checkedStudent, setCheckedStudent] = useState([]);
  //search
  const [school_info, setSchool_info] = useState('')
  const [searchClass, setSearchClass] = useState('')
  const [searchSection, setSearchSection] = useState('')
  const [searchTeacher, setSearchTeacher] = useState('')
  const [searchDay, setSearchDay] = useState('')
  const [searchSubject, setSearchSubject] = useState('')
  const [searchSession, setSearchSession] = useState('')
  const [searchShift, setSearchshift] = useState('')
  const [start_time, setStart] = useState('0:00:00')
  const [start_time_value, setStartValue] = useState('')
  const [end_time, setend] = useState("0:00:00")
  const [end_time_value, setendValue] = useState("")
  const [reset, setReset] = useState(0)

  const handleStart = (event) => {
    const stime = tConvert(event.target.value)
    setStartValue(stime)
    setStart(event.target.value)
  };
  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  const toggleCheckStudent = (inputName) => {
    setCheckedStudent((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };
  const handleEnd = (event) => {
    const etime = tConvert(event.target.value)
    setendValue(etime)
    setend(event.target.value)
  };

  const [showSearch, setShowSearch] = useState([])
  const [routine, setRoutine] = useState([]);
  const checkLoggedIn = () => {
    if (user_type != 4) {
      Navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/day/all`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSchools(response.data);
      });
  }, [])
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/school_info/all`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setSchools(response.data);
      });
  }, []);
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
      .get(`${process.env.REACT_APP_NODE_API}/api/period`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setPeriods(response.data);
      });
  }, []);
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
        console.log(response.data)
        setSubjects(response.data);
      });
  }, [class_id, school_type]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/subject?class_id=${search_class_id}&school_type_id=${school_type}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setSearch_Subjects(response.data);
      });
  }, [search_class_id, school_type]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${school_id}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setTeachers(response.data);
      });
  }, [school_id, reset]);
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
      .get(`${process.env.REACT_APP_NODE_API}/api/shift`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setShifts(response.data);
      });
  }, []);

  //Get Routine Data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/routine/school/filter?school_info_id=${school_id}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        let list = []
        for (const inputName in response.data) {
          list[inputName] = false;
        }
        setCheckedStudent(list)
        setRoutine(response.data);
      });
  }, [school_id]);
  const selectStudentAll = (value) => {
    setCheckedStudentAll(value);
    setCheckedStudent((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };
  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/routine/school/filter?school_info_id=${school_id}&&day=${searchDay}&&class_id=${search_class_id}&&section_id=${search_section_id}&&teacher_id=${search_teacher_id}&&subject_id=${search_subject_id}&&shift_id=${search_shift_id}&&period_id=${search_period_id}&&session_id=${search_session_id}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setRoutine(response.data);
      });
  }

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
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        class_id: class_id,
        section_id: section_id,
        day_id: day_id,
        period_id: period_id,
        subject_id: subject_id,
        teacher_id: teacher_id,
        room: room,
        school_info_id: school_id,
        session_id: session_id,
        shift_id: shift_id,
        start: start_time_value,
        end: end_time_value,
        id: id
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        resetForm()
        setReset(reset + 1)
        if (id === '') {
          toast('Routine saved successfully')
        } else {
          toast('Routine updated successfully')
        }
      });
  };

  const editRoutine = (info) => {
    setClass_id(info.class_id)
    setSection_id(info.section_id)
    setShift(info.shift_name)
    setSession_id(info.session_id)
    setDay_id(info.day_id)
    setPeriod_id(info.period_id)
    setSubject_id(info.subject_id)
    setRoom(info.room)
    setShift_id(info.shift_id)
    setTeacher_id(info.teacher_id)
    setStart(info.start_time)
    setend(info.end_time)
    setId(info.id)
  }

  const resetForm = () => {
    setClass_id("")
    setSection_id("")
    setShift("")
    setSession_id("")
    setDay_id("")
    setPeriod_id("")
    setSubject_id("")
    setRoom("")
    setShift_id("")
    setTeacher_id("")
    setStart("")
    setend("")
    setId("")
  }
  const deleteRoutine = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/routine/delete?id=${id}`)
      if (result) {
        setReset(reset + 1)
        toast("Routine deleted successfully");
      }
    }
  }
  const deleteAllRoutine = async () => {
    console.log(checkedStudent);
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      // axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      // const result = await axios.get(`${process.env.REACT_APP_NODE_API}/api/routine/deleteAll?checkedStudent=${checkedStudent}`)
      // if (result) {
      //   setReset(reset + 1)
      //   toast("Routine deleted successfully");
      // }
      fetch(`${process.env.REACT_APP_NODE_API}/api/routine/deleteAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          checkedStudent: checkedStudent,
          routine:routine
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setReset(reset + 1)
          toast("Please wait a while to Delete Routine successfully");
        })
    }
  }

  return (
    <div>
      <SchoolHeader />
      <div className="card card-primary">
        <div className="card-header">
          <div className="d-flex justify-content-between px-4">
            <div>
              <h2 style={{ fontWeight: "bold" }} class="card-title text-info ">
                Add Class Routine
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
                onClick={resetForm}
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
                    <label>School name</label>
                    <h5>{school_name}</h5>
                  </div>
                </div>
              </div>
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

                <div class={"col-sm-4 "}>
                  <div class="form-group">
                    <label className='' for="exampleSelect">Start time : </label>
                    <input onChange={handleStart} style={{ border: '1px solid blue' }} class="form-control" id="class" value={start_time} name="class" placeholder='Start time' type={'time'} />
                  </div>
                </div>
                <div class={"col-sm-4 "}>
                  <div class="form-group">
                    <label className='' for="exampleSelect">End Time : </label>
                    <input onChange={handleEnd} style={{ border: '1px solid blue' }} class="form-control" id="class" value={end_time} name="class" placeholder='End time' type={'time'} />
                  </div>
                </div>

              </div>
              <div className="row float-right">
                <button type="button" onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </button>

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
              <h3 className="card-title">All Class Routines</h3>
              <div className="row mt-2">
                <div className="col-sm-2">
                  <select onChange={(e) => setSearchDay(e.target.value)} className="form-control">
                    <option value={""}>Select Days</option>
                    {days.map(res => {
                      return <option value={res.id}>{res.day}</option>
                    })}
                  </select>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_class_id}
                      onChange={(e) => setSearch_Class_id(e.target.value)}
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
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_section_id}
                      onChange={(e) => setSearch_Section_id(e.target.value)}
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
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_teacher_id}
                      onChange={(e) => setSearch_Teacher_id(e.target.value)}
                    >
                      <option value="">Select Teacher</option>
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
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_subject_id}
                      onChange={(e) => setSearch_Subject_id(e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {search_subjects.map((subjectJSON) => {
                        return (
                          <option value={subjectJSON.id}>
                            {subjectJSON.subject_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_session_id}
                      onChange={(e) => setSearch_Session_id(e.target.value)}
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
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_period_id}
                      onChange={(e) => setSearch_Period_id(e.target.value)}
                    >
                      <option value="">Select Period</option>
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
                <div className="col-sm-2">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={search_shift_id}
                      onChange={(e) => setSearch_Shift_id(e.target.value)}
                    >
                      <option value="">Select Shift</option>
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
                <div className="col-sm-2">
                  <button type="button" onClick={handleSearch} className="btn btn-primary mt-1">Search</button>
                </div>
              </div>

            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <a href="" className="btn btn-danger"
                style={{ float: 'right' }}
                onClick={() => deleteAllRoutine()}
              >
                Delete All
              </a>
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>
                      <label className="custom-control custom-switch mt-3">
                        <input type="checkbox" onChange={(event) => selectStudentAll(event.target.checked)}
                          checked={checkedStudentAll} />
                        <span className="px-2">Select All</span>
                      </label>
                    </th>
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
                  {routine.sort((a, b) => {
                    return b.id - a.id;
                  }).map((routineJSON, index) => {
                    return (
                      <tr><th>
                        <label className="custom-control custom-switch mt-3">
                          <input type="checkbox"
                            onChange={() => toggleCheckStudent(index)}
                            checked={checkedStudent[index]} />
                          <span className=""></span>
                        </label>
                      </th>
                        <td>{routineJSON.id}</td>
                        <td>{routineJSON.class_name}</td>
                        <td>{routineJSON.section_default_name}</td>
                        <td>{routineJSON.day}</td>
                        <td>{routineJSON.period_code}</td>
                        <td>{routineJSON.subject_name}</td>
                        <td>{routineJSON.initial}</td>
                        <td>{routineJSON.room}</td>
                        <td>{routineJSON.session_year}</td>
                        <td>{routineJSON.shift_name}</td>
                        <td>
                          <a href="" className="btn btn-success mr-3"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample" onClick={() => editRoutine(routineJSON)}>
                            Edit
                          </a>
                          <a href="" className="btn btn-danger" onClick={() => deleteRoutine(routineJSON.id)}>
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

export default SchoolAdminRoutine;
