import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SuperAdminHeader from '../../SuperAdminHeader';
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';

const ViewActivities = () => {
  const [homework, setHomework] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [schools, setSchools] = useState([]);
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState("");
  const [type_id, setType_id] = useState("");
  const [school_id, setSchool_id] = useState("");
  const [section_id, setSection_id] = useState("");
  const [updateData, setUpdateData] = useState([]);
  const [index, setIndex] = useState("");
  const [reset, setReset] = useState(0);
  const [home_work_id] = useState(localStorage.getItem("activityid"))

  const updateMarksData = (value, index) => {
    updateData[index] = value
    setUpdateData({ updateData })
  }
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/admin/submitlist?home_work_id=${home_work_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setHomework(response.data);
        response.data.map((res, index) => {
          updateData[index] = res.marks_obtained
        })
        setUpdateData(updateData)
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/school_type/all`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSchoolTypes(response.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/section/all`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setSections(response.data);
      });
  }, [reset]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${type_id}`, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setClasses(response.data);
      });
    if (type_id !== "") {
      axios
        .get(`${process.env.REACT_APP_NODE_API}/api/school_info_type_wise?type_id=${type_id}`, {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          setSchools(response.data);
        });
    }
  }, [type_id]);

  const updateMarks = (event, subject_id, student_id, key) => {
    if (event.key === 'Enter') {
      fetch(`${process.env.REACT_APP_NODE_API}/api/exam_curi_mark/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          updateData: updateData.updateData[key],
          subject_id: subject_id,
          student_id: student_id,
          teacher_id: localStorage.getItem('user_code'),
          index: index,
        })
      })
        .then((res) => {
          console.log(res)
          res.json()
        })
        .then((json) => {
          alert(`student's Mark Inserted successful!!`)
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  homework.map(res => res.submission_time = moment(Date(res.submission_time)).format("DD-MM-YYYY h:mm a"))
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
    { label: "Mark", key: 'marks_obtained' },
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
        setReset(reset + 1)
        toast("Submission deleted successfully");
      }
    }
  }

  const handleSearch = () => {
    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api/activities/admin/submitlist?home_work_id=${home_work_id}&&class_id=${class_id}&&section_id=${section_id}&&school_id=${school_id}`,
        {
          headers: {
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setHomework(response.data);
        response.data.map((res, index) => {
          updateData[index] = res.marks_obtained
        })
        setUpdateData(updateData)
      });
  }

  return (<><SuperAdminHeader />
    <section className='py-3 container'>
      <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-2 py-2 bg-gradient'>Student Beyond The School : </h2>
      <div className="card">
        <div className="card-body">
          <div className='row'>
            <div class={"col-sm-2 mx-auto p-2"}>
              <div class="form-group">
                <label className="pb-2" for="exampleSelect">
                  School Type :{" "}
                </label>
                <select
                  style={{ border: "1px solid blue" }}
                  class="form-control"
                  value={type_id}
                  onChange={(e) => setType_id(e.target.value)}
                  id="class"
                  name="class"
                >
                  <option value="">Select School Type</option>
                  {schoolTypes.map((classJSON) => {
                    return (
                      <option value={classJSON.id}>
                        {classJSON.type_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class={"col-sm-2 mx-auto p-2"}>
              <div class="form-group">
                <label className="pb-2" for="exampleSelect">
                  School :{" "}
                </label>
                <select
                  style={{ border: "1px solid blue" }}
                  class="form-control"
                  value={school_id}
                  onChange={(e) => setSchool_id(e.target.value)}
                  id="class"
                  name="class"
                >
                  <option value="">Select School</option>
                  {schools.map((classJSON) => {
                    return (
                      <option value={classJSON.id}>
                        {classJSON.school_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>


            <div class={"col-sm-2 mx-auto p-2"}>
              <div class="form-group">
                <label className="pb-2" for="exampleSelect">
                  Class :{" "}
                </label>
                <select
                  style={{ border: "1px solid blue" }}
                  class="form-control"
                  value={class_id}
                  onChange={(e) => setClass_id(e.target.value)}
                  id="class"
                  name="class"
                >
                  <option value="">Select Class</option>
                  {classes.map((classJSON) => {
                    return (
                      <option value={classJSON.id}>
                        {classJSON.class_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class={"col-sm-2 mx-auto p-2"}>
              <div class="form-group">
                <label className="pb-2" for="exampleSelect">
                  Section :{" "}
                </label>
                <select
                  style={{ border: "1px solid blue" }}
                  class="form-control"
                  value={section_id}
                  onChange={(e) => setSection_id(e.target.value)}
                  id="class"
                  name="class"
                >
                  <option value="">Select Section</option>
                  {sections.map((sectionJSON) => {
                    return (
                      <option value={sectionJSON.id}>
                        {sectionJSON.section_default_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class={"col-sm-2 p-2"}>
              <div className='pt-2 mx-auto'>
                <button style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button className='btn btn-primary' style={{float: 'right'}} onClick={handleCSv}>Download CSV</button>     */}
      <CSVLink className="btn btn-primary" style={{ float: 'right' }} {...csvReport}>Download CSV</CSVLink>
      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">School Name</th>
            <th scope="col">Topic</th>
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
          {homework.map((res, index) => {
            return <tr key={index}>
              <td>{res.school_name}</td>
              <td>{res.topic}</td>
              <td>{res.shift_name}</td>
              <td>{res.class_name}</td>
              <td>{res.section_default_name}</td>
              <td>{res.student_code}</td>
              <td>{res.full_name}</td>
              <td>{res.mobile_no}</td>
              <td>{moment(Date(res.submission_time)).format("DD-MM-YYYY h:mm a")}</td>
              <td>{res.answer}</td>
              <td style={{ color: 'blue' }}><Link style={{ color: "blue" }} target="_blank" to={`${process.env.REACT_APP_NODE_API}/uploads/${res.attachment_link}`} download>{res.attachment_link}</Link></td>
              <td>Submit</td>
              <td>{<input
                type="text"
                name="mark"
                value={updateData[index]}
                onClick={() => setIndex(res.activities_id)}
                onKeyDown={(e) => updateMarks(e, res.subject_id, res.student_id, index)
                }
                onChange={(e) => updateMarksData(e.target.value, index)}
              />}</td>
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