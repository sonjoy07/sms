import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import profile from '../../../../images/profile/profile.png'
import { Link } from "react-router-dom";
import TeacherHeader from "../../TeacherHeader/TeacherHeader";
import { toast } from "react-toastify";

const HomeWorkShow = () => {
  const [homework, setHomework] = useState([]);
  const [updateData, setUpdateData] = useState("");
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
  
  const updateMarks = (event,index) => {
    if (event.key === 'Enter') {
      fetch(`${process.env.REACT_APP_NODE_API}/api/homework_mark/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          updateData: updateData,
          index: index,
        })
      })
        .then((res) => {
          console.log(res)
          res.json()
        })
        .then((json) => {
          toast(`student's Homework Mark updated successful!!`)
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
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
              <th scope="col">Marks</th>

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
                  <td>{student.marks === null?<input type={'number'} value={updateData}
                          onKeyDown={(e) => updateMarks(e,student.id)
                          }
                          onChange={(e) => setUpdateData(e.target.value)}/>:student.marks}</td>
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