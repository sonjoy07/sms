import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import StudentHeader from '../../StudentHeader';

export default function EvalutionSchedule() {
    const [schedules,setSchedules] = useState([])
    const [exam, setExam] = useState([])
    const [school_id, setSchool_id] = useState(localStorage.getItem("school_id"));
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_info?school_info_id=${school_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setExam(response.data);
        });
    },[])
  return (<>
      <StudentHeader/>
    <div className='py-5'>
                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Evaluation Schedule</h2>

                <table class="table table-striped">
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th scope="col">Session</th>
                            <th scope="col">Exam Type</th>
                            <th scope="col">Class</th>
                            <th scope="col">Section</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Full Marks</th>
                            <th scope="col">Converted Marks</th>
                            <th scope="col">Exam Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            exam?.map((student) => {


                                return (
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{student.session_year}</td>
                                        <td style={{ textAlign: 'center' }}>{student.exam_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.class_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.section_default_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.subject_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.full_marks}</td>
                                        <td style={{ textAlign: 'center' }}>{student.converted_marks}</td>
                                        <td style={{ textAlign: 'center' }}>{student.exam_date}</td>
                                       






                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            </>
  )
}
