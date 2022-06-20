import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import profile from '../../../../images/profile/profile.png';
import ViewerHeader from '../../ViewerHeader';

const ViewEvaluation = () => {
   const [info, setInfo] = useState([])

   const [student_id, setStudent_code] = useState('')

   const [session_id, setSession_id] = useState('')
   const [student, setStudent] = useState('')
   const [session, setSession] = useState('')
   const [sessions, setSessions] = useState([])
   const [show, setShow] = useState(false)
   const [students, setStudents] = useState([]);
   const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
   const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));

   const checkLoggedIn = () => {
      if (user_type != 6) {
         Navigate('/login')
      }
   }
   useEffect(() => {
      checkLoggedIn()
   }, [])


   useEffect(() => {
      axios.get(`${process.env.REACT_APP_NODE_API}/api/mark?student_code=${student_id}&session_id=${session_id}`,
         {
            headers: {
               authorization: "bearer " + localStorage.getItem("access_token"),
            },
         })

         .then((response) => {
            setInfo(response.data)
            console.log(response.data)
         })
   }, [student_id, session_id])

   useEffect(() => {
      axios.get(`${process.env.REACT_APP_NODE_API}/api/session`,
         {
            headers: {
               authorization: "bearer " + localStorage.getItem("access_token"),
            },
         }).then((response) => {
            setSessions(response.data);
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
      setSession_id(session)
      setStudent_code(student)
      setShow(true)
      setSession('')
      setStudent('')

   }

   return (
      <div>
         <ViewerHeader />
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
                                 <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {
               show ? (
                  <div className='py-5'>
                     <div style={{ textAlign: 'center', color: 'LightSeaGreen' }}>
                        <h4>{info?.school_name}</h4>
                     </div>
                     <div style={{ textAlign: 'center', color: 'LightSeaGreen' }}>
                        <h4>Address: {info?.address_division}</h4>
                     </div>

                     <div className='row mt-4 mx-1'>
                        <div className='col-sm-3 p-2'>
                           <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>ID : {info[0]?.student_code}</h5>
                        </div>
                        <div className='col-sm-3 p-2'>
                           <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Name : {info[0]?.name}</h5>
                        </div>
                        <div className='col-sm-3 p-2'>
                           <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Session : {info[0]?.session_year}</h5>
                        </div>
                        <div className='col-sm-3 p-2'>
                           <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Class : {info[0]?.class_name}</h5>
                        </div>
                        <div className='col-sm-3 p-2'>
                           <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Section : {info[0]?.section_default_name}</h5>
                        </div>
                     </div>

                     <table class="table  mt-5">
                        <thead >
                           <tr>
                              <th style={{ textAlign: 'center' }} className='' scope="col-2">Subject</th>
                              <th style={{ textAlign: 'center' }} scope="col-2">Monthly Class Test (Average 20%)</th>
                              <th colspan="2" style={{ textAlign: 'center' }} scope="">Half Yearly Exam
                                 <td style={{ textAlign: 'center' }} className='px-2'>Sub</td>
                                 <td style={{ textAlign: 'center' }} className='px-2'>MCQ</td>
                              </th>
                              <th colspan="2" style={{ textAlign: 'center' }} scope="">Final Exam
                                 <td style={{ textAlign: 'center' }} className='px-2'>Sub</td>
                                 <td style={{ textAlign: 'center' }} className='px-2'>MCQ</td>
                              </th>

                              <th style={{ textAlign: 'center' }} scope="col-2">Converted Marks (half+final)/2 (70%)</th>
                              <th style={{ textAlign: 'center' }} scope="col-2">Attendance (5%)</th>
                              <th style={{ textAlign: 'center' }} scope="col-2">Extra Curriculum (5%)</th>
                              <th style={{ textAlign: 'center' }} scope="col-2">Total Marks (100%)</th>
                              <th style={{ textAlign: 'center' }} scope="col-2">Grade</th>
                              <th style={{ textAlign: 'center' }} scope="col-2">Grade Point</th>
                           </tr>
                        </thead>
                        <tbody>

                           {info.map((student) => {
                              return (
                                 <tr>
                                    <td style={{ textAlign: 'center' }}>{student.subject_name}</td>
                                    <td style={{ textAlign: 'center' }}>{student.monthly_class_test_average}</td>
                                    <td style={{ textAlign: 'center' }}>{student.half_yearly_exam_mcq}</td>
                                    <td style={{ textAlign: 'center' }}>{student.half_yearly_exam_sub}</td>
                                    <td style={{ textAlign: 'center' }}>{student.final_exam_sub}</td>
                                    <td style={{ textAlign: 'center' }}>{student.final_exam_mcq}</td>
                                    <td style={{ textAlign: 'center' }}>{student.converted}</td>
                                    <td style={{ textAlign: 'center' }}>{student.attendance_marks}</td>
                                    <td style={{ textAlign: 'center' }}>{student.extra_curriculum}</td>
                                    <td style={{ textAlign: 'center' }}>{student.total}</td>
                                    <td style={{ textAlign: 'center' }}>{student.grade}</td>
                                    <td style={{ textAlign: 'center' }}>{student.gradePoint}</td>
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
                              <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Total Grade Point : 5.00</h5>
                           </div>
                           <div className='col-sm-3 p-2'>
                              <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Grade Point Average : 100%</h5>
                           </div>
                           <div className='col-sm-3 p-2'>
                              <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500', textAlign: 'center' }}>Position in Section : 05</h5>
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
                  </div>
               ) : null
            }
            <div className="container my-2">
               <div style={{ display: "flex", justifyContent: "end", cursor: 'pointer' }}>
                  <i
                     style={{ fontSize: "30px", color: "blue" }}
                     class="fa-solid fa-angle-left"
                  ></i>
                  <h5 style={{ color: "blue" }} className="px-2">
                     <a
                        onClick={() => {
                           localStorage.setItem("user_code", "");
                           localStorage.setItem("user_type", "");
                           Navigate("/login");
                        }}
                     >
                        {" "}
                        LogOut
                     </a>
                  </h5>
               </div>
            </div>
         </section>
      </div>
   )
}

export default ViewEvaluation