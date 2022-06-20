import React, { useState, useEffect } from "react";

import axios from "axios";

import moment from "moment";

const SubmitDetails = () => {
  const [homeworkid, setHomeworkid] = useState(
    localStorage.getItem("homeworkid")
  );
  const [date, setDate] = useState("");
  const [homework, setHomework] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/homework/teacher/submitlist?home_work_id=${homeworkid}`,
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

  return (
    <section className="container">
      <h2
        style={{ color: "white", backgroundColor: "gray" }}
        className="px-2 py-2"
      >
        Home Work Submitted Details:{" "}
      </h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} scope="col">
              Student ID
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Student Name
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {homework.map((homeworkJSON) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>
                  {homeworkJSON.student_code}
                </td>
                <td style={{ textAlign: "center" }}>
                  {homeworkJSON.full_name}
                </td>
                <td style={{ textAlign: "center" }}>Submitted</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SubmitDetails;
