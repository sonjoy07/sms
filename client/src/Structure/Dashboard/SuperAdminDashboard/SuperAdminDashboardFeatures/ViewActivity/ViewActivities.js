import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SuperAdminHeader from '../../SuperAdminHeader';
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from 'react-toastify';

const ViewActivities = () => {
  const [homework, setHomework] = useState([]);
  const [reset, setReset] = useState(0);
  useEffect(() => {
    const home_work_id = localStorage.getItem("activityid")
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/teacher/submitlist?home_work_id=${home_work_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setHomework(response.data);
      });
  }, [reset]);

  homework.map(res => res.submission_time = moment(res.submission_time).format("DD-MM-YYYY h:mm a"))
  homework.map(res => res.status = "submit")

  const headers = [
    { label: "School Name", key: 'school_name' },
    { label: "Shift", key: 'shift_name' },
    { label: "Class", key: 'class_name' },
    { label: "Section", key: 'section_default_name' },
    { label: "Student ID", key: 'student_code' },
    { label: "Name", key: 'full_name' },
    { label: "Mobile Number", key: 'mobile_no' },
    { label: "Submission Date", key: 'submission_time' },
    { label: "Short Answer", key: 'answer' },
    // {label:"Beyond The School File",key:'attachment_link'},
    { label: "Status", key: 'status' }
  ]

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: homework
  }

  const deleteSubmission = async (id) => {
    const check = window.confirm('Are you sure to delete?');
    if (check) {
      axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
      const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/subMission/delete?id=${id}`)
      if (result) {
        setReset(reset+1)
        toast("Submission deleted successfully");
      }
    }
  }

  return (<><SuperAdminHeader />
    <section className='py-3 container'>
      <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Beyond The School : </h2>
      {/* <button className='btn btn-primary' style={{float: 'right'}} onClick={handleCSv}>Download CSV</button>     */}
      <CSVLink className="btn btn-primary" style={{ float: 'right' }} {...csvReport}>Download CSV</CSVLink>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">School Name</th>
            <th scope="col">Shift</th>
            <th scope="col">Class</th>
            <th scope="col">Section</th>
            <th scope="col">Student ID</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Submission Date</th>
            <th scope="col">Short Answer</th>
            <th scope="col">Beyond The School File</th>
            <th scope="col">Status</th>
            <th scope="col">Marks</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {homework.map(res => {
            return <tr>
              <td>{res.school_name}</td>
              <td>{res.shift_name}</td>
              <td>{res.class_name}</td>
              <td>{res.section_default_name}</td>
              <td>{res.student_code}</td>
              <td>{res.full_name}</td>
              <td>{res.mobile_no}</td>
              <td> {moment(res.submission_time).format("DD-MM-YYYY h:mm a")}</td>
              <td>{res.answer}</td>
              <td style={{ color: 'blue' }}><Link style={{ color: "blue" }} target="_blank" to={`${process.env.REACT_APP_NODE_API}/uploads/${res.attachment_link}`} download>{res.attachment_link}</Link></td>
              <td>Submit</td>
              <td>{res.marks_obtained}</td>
              <td>{res.answer}</td>
              <td><button onClick={() => deleteSubmission(res.sub_id)} style={{ color: 'white', border: 'none' }} className='bg-danger p-1'>Delete</button></td>
            </tr>
          })}




        </tbody>
      </table>
    </section>
  </>
  )
}

export default ViewActivities