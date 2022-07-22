import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import profile from '../../../../images/profile/profile.png'
import { Link } from "react-router-dom";
import TeacherHeader from "../../TeacherHeader/TeacherHeader";

const HomeWorkShow = () => {
  const [homework, setHomework] = useState([]);
  useEffect(() => {
    const home_work_id = localStorage.getItem("homeworkid")
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/homework/teacher/submitlist?home_work_id=${home_work_id}`,
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
  console.log(homework);
  return (
    <>
    <TeacherHeader/>
      <section className='py-3 container'>
        <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Home Work : </h2>

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

            {homework.map(student => {
              return (
                <tr>
                  <td>{student.student_code}</td>
                  <td>{student.full_name}</td>
                  <td>Submit</td>
                  <td> {moment(student.submission_time).format("DD-MM-YYYY")}</td>
                  <td style={{ color: 'blue' }}><Link style={{ color: "blue" }} target="_blank" to={`${process.env.REACT_APP_NODE_API}/uploads/${student.attachment_link}`} download>{student.attachment_link}</Link></td>
                </tr>
              )
            })
            }



          </tbody>
        </table>
      </section>
    </>
  )
}

export default HomeWorkShow