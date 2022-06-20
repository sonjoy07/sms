import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ClassBasedStudentAbsence = () => {
  let navigate = useNavigate();

  //const [today, setToday] = useState("Sunday");
  const [summary, setSummary] = useState([]);

  const [section_id, setSection_id] = useState(
    localStorage.getItem("section_id")
  );
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/summary/section/today?section_id=${section_id}&date=${date}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSummary(response.data);
      });
  }, [section_id, date]);

  return (
    <section className="container">
      <h2 style={{ color: "white" }} className="px-2 py-2 bg-info bg-gradient">
        Student Attendance Information :{" "}
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
          {summary.map((summaryJSON) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>
                  {summaryJSON.period_code}
                </td>
                <td style={{ textAlign: "center" }}>
                  {summaryJSON.subject_name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {summaryJSON.start_time}
                </td>
                <td style={{ textAlign: "center" }}>{summaryJSON.time}</td>
                <td style={{ textAlign: "center", color: "blue" }}>
                  <a
                    onClick={() => {
                      localStorage.setItem("user_code", summaryJSON.t_id);
                      navigate("/teacherprofile");
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    {summaryJSON.initial}
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>{summaryJSON.all}</td>
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
                    {summaryJSON.present}
                  </p>
                </td>
                <td>
                  <a
                    onClick={() => {
                      localStorage.setItem("section_id", section_id);
                      localStorage.setItem("routine_id", summaryJSON.r_id);
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
                      {summaryJSON.absent}
                    </p>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ClassBasedStudentAbsence;
