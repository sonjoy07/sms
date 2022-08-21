import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import SchoolHeader from './schoolHeader/SchoolHeader';
const GradeSheetTeacher = () => {
  const [info, setInfo] = useState([])
  const [allExam, setAllExam] = useState([])
  const [schoolInfo, setSchoolInfo] = useState([])

  const [session_id, setSession_id] = useState('')
  const [student, setStudent] = useState('')
  const [session, setSession] = useState('')
  const [sessions, setSessions] = useState([])
  const [show, setShow] = useState(false)
  const [students, setStudents] = useState([]);
  const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
  const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));

  const checkLoggedIn = () => {
    if (user_type != 4) {
      Navigate('/login')
    }
  }
  useEffect(() => {
    checkLoggedIn()
  }, [])


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_NODE_API}/api/session`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setSessions(response.data);
      });
    axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_name`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      }).then((response) => {
        setAllExam(response.data);
      });
  }, []);

  const handleCode = e => {
    console.log(e.target.value)
    setStudent(e.target.value)
  }
  const handleSession = e => {
    setSession(e.target.value)
    console.log(e.target.value)
  }

  const handleSubmit = () => {
    // setSession_id(session)
    // setStudent_code(student)
    setShow(true)
    axios.get(`${process.env.REACT_APP_NODE_API}/api/getStudentId?student_code=${student}`,
      {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })

      .then((response) => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/mark?student_code=${response.data.id}&session_id=${session}&&school_id=${localStorage.getItem('school_id')}`,
          {
            headers: {
              authorization: "bearer " + localStorage.getItem("access_token"),
            },
          })

          .then((response) => {
            setInfo(response.data)
          })
        axios.get(`${process.env.REACT_APP_NODE_API}/api/school_info_by_student?student_code=${response.data.id}`,
          {
            headers: {
              authorization: "bearer " + localStorage.getItem("access_token"),
            },
          })

          .then((response) => {
            setSchoolInfo(response.data)
          })
      })


  }


  const resultCalculation = (result) => {
    if (result >= 80) {
      return { grade: 'A+', point: '5.00' }
    }
    if (result >= 70 && result <= 79) {
      return { grade: 'A', point: '4.00' }
    }
    if (result >= 60 && result <= 69) {
      return { grade: 'A-', point: '3.50' }
    }
    if (result >= 50 && result <= 59) {
      return { grade: 'B', point: '3.00' }
    }
    if (result >= 40 && result <= 49) {
      return { grade: 'C', point: '2.00' }
    }
    if (result >= 33 && result <= 39) {
      return { grade: 'D', point: '1.00' }
    }
    if (result < 33) {
      return { grade: 'F', point: '0.00' }
    }
  }
  let grandTotal = 0

  return (
    <div>
      <SchoolHeader />

      <section className='container'>
        <div className='row mt-4'>
          <div className=' col-md-12'>
            <div className="card card-dark collapsed-card">
              <div className="card-header">
                <div className='d-flex justify-content-between px-4'>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Grade Sheet</h3>
                  </div>
                  <div className="card-tools">
                    <button id="w-change-close" type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus icons" />
                    </button>
                    {/* onClick={handlelist} */}
                    {/* active */}
                  </div>
                </div>
              </div>

              <div className='card-body' >
                {/* id='list' */}

                <div className='row'>
                  <div class={"col-sm-5 mx-auto p-2"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Student Id : </label>
                      <input onChange={handleCode} style={{ border: '1px solid blue' }} class="form-control" value={student} id="class" name="class" placeholder={info.student_code} />
                    </div>
                  </div>

                  <div class={"col-sm-5 mx-auto p-2"}>
                    <div class="form-group">
                      <label className='pb-2' for="exampleSelect">Session : </label>
                      <select
                        className="form-control"
                        value={session}
                        onChange={handleSession}
                      >
                        <option value="">Select</option>
                        {sessions.map((sessionJSON) => {
                          return (
                            <option value={sessionJSON.id}>
                              {sessionJSON.session_year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class={"col-sm-2 p-4 mx-auto"}>
                    <div className='pt-2 mx-auto'>
                      <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5 mt-1">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          show ? (
            info.length > 0 && <>
              <div className='py-5'>
                <div style={{ textAlign: 'center', color: 'LightSeaGreen' }}>
                  <h4>{schoolInfo[0]?.school_name}</h4>
                </div>
                <div style={{ textAlign: 'center', color: 'LightSeaGreen' }}>
                  <h4>Address: {schoolInfo[0]?.address_division}</h4>
                </div>

                <div className='row mt-4 mx-1'>
                  <div className='col-sm-3 p-2'>
                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>ID : {schoolInfo[0]?.student_code}</h5>
                  </div>
                  <div className='col-sm-3 p-2'>
                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Name : {schoolInfo[0]?.name}</h5>
                  </div>
                  <div className='col-sm-3 p-2'>
                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Session : {schoolInfo[0]?.session_year}</h5>
                  </div>
                  <div className='col-sm-3 p-2'>
                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Class : {schoolInfo[0]?.class_name}</h5>
                  </div>
                  <div className='col-sm-3 p-2'>
                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Section : {schoolInfo[0]?.section_default_name}</h5>
                  </div>
                </div>

                <table class="table  mt-5">
                  <thead >
                    <tr>
                      <th style={{ textAlign: 'center' }} className='' scope="col-2">Student ID</th>
                      <th style={{ textAlign: 'center' }} className='' scope="col-2">Subject Name</th>
                      <th style={{ textAlign: 'center' }} className='' scope="col-2">Attendance Marks(5%)</th>
                      {allExam.filter(res => res.exam_code < 15).map(res => <th style={{ textAlign: 'center' }} className='' scope="col-2">{res.exam_name}</th>)}
                      <th style={{ textAlign: 'center' }} className='' scope="col-2">CT Marks (15)</th>
                      <th style={{ textAlign: 'center' }} scope="col-2">Half Yearly Marks</th>
                      <th style={{ textAlign: 'center' }} scope="col-2">Final Exam</th>
                      <th style={{ textAlign: 'center' }} scope="col-2">Beyond The School (5%)</th>
                      <th style={{ textAlign: 'center' }} scope="col-2">Total Marks (100%)</th>
                      <th style={{ textAlign: 'center' }} scope="col-2">Grade</th>
                      <th style={{ textAlign: 'center' }} scope="col-2">Grade Point</th>
                    </tr>
                  </thead>
                  <tbody>

                    {info.map((student, index) => {
                      let ctTotal = (student.ct1 + student.ct2 + student.ct3 + student.ct4) / 4

                      const attendance = student.total_school_day > 0 ?Math.ceil((student.total_present*100/ student.total_school_day)*5)/100 : 5
                      const activities = student.extra_mark > 0 ? student.extra_mark : 0

                      const total = attendance + ctTotal + (student.half / 2) + (student.full / 2) + activities
                      const grade = resultCalculation(total)
                      grandTotal += total
                      return (
                        <tr>
                          <td style={{ textAlign: 'center' }}>{student.student_code}</td>
                          <td style={{ textAlign: 'center' }}>{student.subject_name}</td>
                          <td style={{ textAlign: 'center' }}>{attendance}</td>
                          <td style={{ textAlign: 'center' }}>{student.ct1}</td>
                          <td style={{ textAlign: 'center' }}>{student.ct2}</td>
                          <td style={{ textAlign: 'center' }}>{student.ct3}</td>
                          <td style={{ textAlign: 'center' }}>{student.ct4}</td>
                          <td style={{ textAlign: 'center' }}>{ctTotal}</td>
                          <td style={{ textAlign: 'center' }}>{student.half / 2}</td>
                          <td style={{ textAlign: 'center' }}>{student.full / 2}</td>
                          <td style={{ textAlign: 'center' }}>{activities}</td>
                          <td style={{ textAlign: 'center' }}>{total}</td>
                          <td style={{ textAlign: 'center' }}>{grade?.grade}</td>
                          <td style={{ textAlign: 'center' }}>{grade?.point}</td>
                        </tr>
                      )
                    })
                    }
                  </tbody>

                </table>

                <div style={{ margin: '70px 0px', padding: '40px 0px', border: '1px solid black', borderRadius: '5px' }}>
                  <div>
                    <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>Yearly Calculation</h3>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-sm-3 p-2'>
                      <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Total Marks : 100</h5>
                    </div>
                    <div className='col-sm-3 p-2'>
                      <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Total Grade Point : {resultCalculation(grandTotal / info.length).point}</h5>
                    </div>
                    <div className='col-sm-3 p-2'>
                      <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Grade Point Average : {grandTotal / info.length}%</h5>
                    </div>
                    <div className='col-sm-3 p-2'>
                      <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Position in Section : {schoolInfo[0]?.position}</h5>
                    </div>
                  </div>
                </div>

                <table style={{ width: '75%' }} className="mx-auto">
                  <tr style={{ border: '1px solid blue', }}>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '10px 0px' }} colspan="2">Class Teacher</th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '10px 0px' }} colspan="2">School Head</th>

                  </tr>
                  <tr style={{ border: '1px solid blue', }}>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '10px 0px' }}>Comments</th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '10px 0px' }}>Signature</th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '10px 0px' }}>Comments</th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '10px 0px' }}>Signature</th>

                  </tr>
                  <tr style={{ border: '1px solid blue', }}>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '50px 0px' }}></th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '50px 0px' }}></th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '50px 0px' }}></th>
                    <th style={{ border: '1px solid blue', textAlign: 'center', padding: '50px 0px' }}></th>

                  </tr>


                </table>
              </div></>
          ) : null
        }
      </section>
    </div>
  )
}

export default GradeSheetTeacher