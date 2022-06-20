import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ViewerShowAttendanceView = () => {
  let navigate = useNavigate();

  const [school_info_id, setSchool_info_id] = useState(
    localStorage.getItem("school_id")
  );
  const [school_type, setSchool_type] = useState(localStorage.getItem("school_type"))
  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [date, setDate] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  //const [today, setToday] = useState("Sunday");
  const [summary, setSummary] = useState([]);
  const [list, setList] = useState([]);
  const [per, setPer] = useState([]);

  const [clses, setClses] = useState([]);
  const [cls, setCls] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");

  const [class_id, setClass_id] = useState("");
  const [section_id, setSection_id] = useState("");

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

    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/routine/school/today/sections?school_info_id=${school_info_id}&today=${today}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSummary(response.data);
        console.log(response.data)
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/summary/school?school_info_id=${school_info_id}&date=${today}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setPer(response.data);
      });
  }, [class_id, school_info_id, today]);

  let handleClassChange = (e) => {
    setCls(e.target.value);
    setClass_id(e.target.value);
  };
  let handleSectionChange = (e) => {
    setSection(e.target.value);
    setSection_id(e.target.value);
  };

  let handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const getList = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/summary/section/today?section_id=${section_id}&date=${date}&class_id=${class_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setList(response.data);
        console.log(response.data)
      });
  };

  return (
    <>
      <div>
        <div className="container py-5 col-sm-12">
          <div
            style={{ display: "flex", color: "#008080", paddingLeft: "25px" }}
          >
            <h3 style={{ fontWeight: "bold" }}>
              Today Attendance : {moment().format("DD-MMM-YYYY")}
            </h3>
          </div>
          <div className="">
            <div className="col-sm-12">
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
                {per.map((perJSON) => {
                  return (
                    <div class="progress-value">P-{perJSON.present_rate}%</div>
                  );
                })}
              </div>
            </div>
          </div>
          <section className="p-4 ">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th style={{ color: "Coral" }} className="" scope="col">
                    Class
                  </th>
                  <th style={{ color: "BlueViolet" }} scope="col">
                    Section
                  </th>
                  <th style={{ color: "blue" }} scope="col">
                    Total Student
                  </th>
                  <th style={{ color: "Tomato" }} scope="col">
                    Present
                  </th>
                  <th style={{ color: "red" }} scope="col">
                    Absence
                  </th>
                </tr>
              </thead>
              <tbody>
                {per.map((summaryJSON) => {
                  return (
                    <tr>
                      <td>
                        <p
                          className="p-2"
                          style={{
                            backgroundColor: "Coral",
                            width: "60px",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {summaryJSON.class_name}
                        </p>
                      </td>
                      <td>
                        {" "}
                        <a
                          onClick={() => {
                            localStorage.setItem(
                              "section_id",
                              summaryJSON.section_id
                            );
                            navigate("/classbasedstudentabsence");
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <p
                            className="p-2"
                            style={{
                              backgroundColor: "BlueViolet",
                              width: "120px",
                              textAlign: "center",
                              color: "white",
                            }}
                          >
                            {summaryJSON.section_default_name}
                          </p>
                        </a>
                      </td>

                      <td>
                        <p
                          className="p-2"
                          style={{
                            backgroundColor: "blue",
                            width: "40px",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {summaryJSON.all}
                        </p>
                      </td>
                      <td>
                        <p
                          className="p-2"
                          style={{
                            backgroundColor: "Tomato",
                            width: "40px",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {summaryJSON.present}
                        </p>
                      </td>
                      <td>
                        <p
                          className="p-2"
                          style={{
                            backgroundColor: "red",
                            width: "40px",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {summaryJSON.absent}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      <div className="container pb-5">
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
                      Historical Attendance
                    </h3>
                  </div>
                  <div className="card-tools">
                    <button
                      id="w-change-close"
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    ></button>
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
                        Section :{" "}
                      </label>
                      <select
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
                  <div class={"col-sm-5 p-2"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        Select Date :{" "}
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        value={date}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  {/* <div class={"col-sm-5 p-2 mx-auto"}>
                    <div class="form-group">
                      <label className="pb-2" for="exampleInputEmail1">
                        End Date :{" "}
                      </label>
                      <input type="date" class="form-control" />
                    </div>
                  </div> */}
                  <div class={"col-sm-2 p-2 mx-auto"}>
                    <div className="pt-2 mx-auto">
                      <button
                        onClick={getList}
                        style={{ color: "white", fontSize: "16px" }}
                        type="button"
                        class="btn bg-secondary bg-gradient px-5"
                      >
                        View Attendance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <h2
          style={{ color: "white" }}
          className="px-2 py-2 bg-info bg-gradient"
        >
          {" "}
          {moment(date).format("DD-MMM-YYYY")} :{" "}
        </h2>

        <table class="table table-striped">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }} scope="col">
                Period
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Subject
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Class Time
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Attendance Time
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Teacher Initial
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Total Student
              </th>
              <th scope="col">Present</th>
              <th scope="col">Absent</th>
            </tr>
          </thead>
          <tbody>
            {list.map((listJSON) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {listJSON.period_code}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {listJSON.subject_name}
                  </td>
                  <td style={{ textAlign: "center" }}>{listJSON.start_time}</td>
                  <td style={{ textAlign: "center" }}>{listJSON.time}</td>
                  <td style={{ textAlign: "center", color: "blue" }}>
                    <a
                      onClick={() => {
                        localStorage.setItem("user_code", listJSON.t_id);
                        navigate("/teacherprofile");
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      {listJSON.initial}
                    </a>
                  </td>
                  <td style={{ textAlign: "center" }}>{listJSON.all}</td>
                  <td>
                    <p
                      className="p-2"
                      style={{
                        backgroundColor: "blue",
                        width: "40px",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      {listJSON.present}
                    </p>
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        localStorage.setItem("section_id", section_id);
                        localStorage.setItem("routine_id", listJSON.r_id);
                        localStorage.setItem("date", date);
                        navigate("/studentabsence");
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="p-2"
                        style={{
                          backgroundColor: "red",
                          width: "40px",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {listJSON.absent}
                      </p>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ViewerShowAttendanceView;
