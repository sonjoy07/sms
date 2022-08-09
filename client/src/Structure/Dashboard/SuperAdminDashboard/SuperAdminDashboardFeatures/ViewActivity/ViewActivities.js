import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SuperAdminHeader from '../../SuperAdminHeader';

const ViewActivities = () => {
  const [homework, setHomework] = useState([]);
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
  }, []);

  const downloadCSVFile = (csv, filename) => {
    var csv_file, download_link;

    csv_file = new Blob([csv], { type: "text/csv" });

    download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }
  const htmlToCSV = (html, filename) => {
    debugger;
    var data = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }
    downloadCSVFile(data.join("\n"), filename);
  }
  const handleCSv = () => {
    var html = document.querySelector("table").outerHTML;
    htmlToCSV(html, "students.csv");
  }
  return (<><SuperAdminHeader />
    <section className='py-3 container'>
      <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Extra Curriculum : </h2>
      <button className='btn btn-primary' style={{float: 'right'}} onClick={handleCSv}>Download CSV</button>
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
            <th scope="col">Extra Curriculum File</th>
            <th scope="col">Status</th>
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
            </tr>
          })}




        </tbody>
      </table>
    </section>
  </>
  )
}

export default ViewActivities