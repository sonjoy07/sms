import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const StudentAbsence = () => {
  //const [today, setToday] = useState("Sunday");
  const [absent, setAbsent] = useState([]);

  const [section_id, setSection_id] = useState(
    localStorage.getItem("section_id")
  );
  const [routine_id, setRoutine] = useState(localStorage.getItem("routine_id"));
  const [date, setDate] = useState(localStorage.getItem("date"));

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/attendance/section/absent?section_id=${section_id}&routine_id=${routine_id}&date=${date}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setAbsent(response.data);
      });
  }, []);

  return (
    <section className="py-5 container">
      <h2 style={{ color: "white" }} className="px-2 py-2 bg-info bg-gradient">
        Absence Student Information :{" "}
      </h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Class</th>
            <th scope="col">Section</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {absent.map((absentJSON) => {
            return (
              <tr>
                <td>{absentJSON.full_name}</td>
                <td>{absentJSON.class_name}</td>
                <td>{absentJSON.section_default_name}</td>
                <td>{absentJSON.mobile_no}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default StudentAbsence;
