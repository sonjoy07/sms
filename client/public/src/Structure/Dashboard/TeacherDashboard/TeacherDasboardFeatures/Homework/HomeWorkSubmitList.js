import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const HomeWorkSubmitList = (props) => {
  const navigate = useNavigate();

  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [homeworkid, setHomeworkid] = useState(
    localStorage.getItem("homeworkid")
  );
  const [homework, setHomework] = useState([]);
  const checkLoggedIn = () => {
    if (user_type != 2) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLoggedIn();
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
        console.log(response.data);
      });
  }, []);

  return (
    <section className="py-5 container">
      <h2 style={{ color: "white" }} className="px-2 py-2 bg-info bg-gradient">
        Home Work :{" "}
      </h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Submission Date</th>
            <th scope="col">Home Work File</th>
          </tr>
        </thead>
        <tbody>
          {homework.map((homeworkJSON) => {
            return (
              <tr>
                <td>{homeworkJSON.student_code}</td>
                <td>{homeworkJSON.first_name}</td>
                <td>Submit</td>
                <td>
                  {moment(homeworkJSON.submission_time).format("YYYY-MM-DD")}
                </td>
                <td style={{ color: "blue" }}>Open File</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default HomeWorkSubmitList;
