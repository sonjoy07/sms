import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import profile from '../../../../images/profile/profile.png'
import { Link } from "react-router-dom";
import SuperAdminHeader from "../SuperAdminHeader";

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
    <SuperAdminHeader/>
      <div style={{ height: '80px', backgroundColor: '' }} className='bg-info'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container'>
          {/* <div>
             <img style={{ width: "50px" }} className='pt-3' src={profile} alt=""/>
           </div> */}
          <div class="dropdown">
            <button style={{ padding: '0px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img style={{ width: "50px" }} className='' src={profile} alt="profile" />
            </button>
            <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton">
              <a style={{ color: 'tomato' }} class="dropdown-item " href="/teacherprofile">Profile</a>
              <a style={{ color: 'tomato' }} class="dropdown-item" href="#">LogOut</a>
            </div>
          </div>
          <div>
            <h3 className='pt-1' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>Name: Teacher Name</h3>
            <h4 className='' style={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}>Id : Teacher Id</h4>
          </div>
        </div>
      </div>
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
                  <td> {moment(student.submission_time).format("DD-MM-YYYY h:mm a")}</td>
                  <td style={{ color: 'blue' }}><a style={{ color: "blue" }} target="_blank" href={`${process.env.REACT_APP_NODE_API}/uploads/${student.attachment_link}`} download>{student.attachment_link}</a></td>
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