import React, { useState, useEffect } from "react";

import axios from "axios";

import moment from "moment";
import ViewerHeader from "../ViewerHeader";
import { Link } from "react-router-dom";

const ViewerSubmissionDetails = () => {
  const [homeworkid, setHomeworkid] = useState(
    localStorage.getItem("homeworkid")
  );
  const [date, setDate] = useState("");
  const [homework, setHomework] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/admin/submitlist?home_work_id=${homeworkid}`,
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
    <>
      <ViewerHeader />
      <section className="container">
        <h2
          style={{ color: "white", backgroundColor: "#3498db" }}
          className="px-2 py-2"
        >
          Beyond The School Submitted Details:{" "}
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
                Class
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Section
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Answer
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Submission File
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
                  <td style={{ textAlign: "center" }}>
                    {homeworkJSON.class_name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {homeworkJSON.section_default_name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {homeworkJSON.answer}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <a style={{ color: "blue" }} target="_blank" href={`/uploads/${homeworkJSON.attachment_link}`} download>{homeworkJSON.attachment_link}</a>
                  </td>
                  <td style={{ textAlign: "center" }}>Submitted</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section></>
  );
};

export default ViewerSubmissionDetails;
