import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import profile from '../../../../images/profile/profile.png';
import TeacherHeader from '../../TeacherHeader/TeacherHeader';
const TeacherMarkCheck = () => {
    const [sessionInput, setSessionInput] = useState('')
    const [session_id, setSessionid] = useState('')
    const [exam_infoInput, setExamInfo] = useState('')
    const [exam_id, setExamId] = useState('')
    const [studentInput, setStudentInput] = useState('')
    const [student_id, setStudent_id] = useState('')
    const [student_info, setStudentInfo] = useState([])
    const [sessions, setSessions] = useState([])
    const [exam, setExam] = useState([])
    const [show, setShow] = useState(false)
    const [student, setStudent] = useState([]);
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const checkLoggedIn = () => {
        if (user_type != 2) {
            Navigate('/login')
        }
    }
    useEffect(() => {
        checkLoggedIn()
    }, [])
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/student/profile?student_id=${user_code}`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }
            )
            .then((response) => {
                console.log(response.data)
                setStudent(response.data);
            })
            .catch((e) => console.log(e));
    }, []);
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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_mark?session_id=${session_id}&exam_info_id=${exam_id}&student_code=${student_id}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setStudentInfo(response.data);
            });
    }, [session_id, exam_id, student_id]);
    const handleSession = e => {
        setSessionInput(e.target.value)
        console.log(e.target.value)
    }
    const handleCode = e => {
        console.log(e.target.value)
        setStudentInput(e.target.value)
    }
    const handleExam = e => {
        console.log(e.target.value)
        setExamInfo(e.target.value)
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_name`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setExam(response.data);
        });
    }, []);

    const handleSubmit = () => {
        setExamId(exam_infoInput)
        setSessionid(sessionInput)
        setStudent_id(studentInput)
        setShow(true)
    }
    return (
        <div>
            <TeacherHeader />

            <section className='container'>
                <div className='row mt-4'>
                    <div className=' col-md-12'>
                        <div className="card card-dark collapsed-card">
                            <div className="card-header">
                                <div className='d-flex justify-content-between px-4'>
                                    <div>
                                        <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Marks Sheet</h3>
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

                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Select Session : </label>
                                            <select
                                                className="form-control"
                                                value={sessionInput}
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
                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Exam Type : </label>
                                            <select
                                                className="form-control"
                                                value={exam_infoInput}
                                                onChange={handleExam}
                                            >
                                                <option value="">Select</option>
                                                {exam.map((classJSON) => {
                                                    return (
                                                        <option value={classJSON.id}>
                                                            {classJSON.exam_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class={"col-sm-3 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Student Id : </label>
                                            <input onChange={handleCode} style={{ border: '1px solid blue' }} class="form-control" id="class" name="class" placeholder='Student Id' />
                                        </div>
                                    </div>
                                    <div class={"col-sm-3 pt-2  mx-auto"}>
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
                            <h2 style={{ color: 'LightSeaGreen', fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }} className='px-3 py-2'>Marks Sheet</h2>
                            <div style={{ textAlign: 'center', color: 'LightSeaGreen' }}>
                                <h4>{student_info[0]?.school_name}</h4>
                            </div>
                            <div style={{ textAlign: 'center', color: 'LightSeaGreen' }}>
                                <h4>Address: {student_info[0]?.address_district}</h4>
                            </div>

                            <div className='row mt-4 mx-1'>
                                <div className='col-sm-3 p-2'>
                                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500' }}>ID : {student_info[0]?.student_code}</h5>
                                </div>
                                <div className='col-sm-3 p-2'>
                                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500' }}>Name : {student_info[0]?.name}</h5>
                                </div>
                                <div className='col-sm-3 p-2'>
                                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500' }}>Class : {student_info[0]?.class_name}</h5>
                                </div>
                                <div className='col-sm-3 p-2'>
                                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500' }}>Section : {student_info[0]?.section_default_name}</h5>
                                </div>
                                <div className='col-sm-3 p-2'>
                                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500' }}>Session : {student_info[0]?.session_year}</h5>
                                </div>
                                <div className='col-sm-3 p-2'>
                                    <h5 style={{ color: 'gray', fontSize: '25px', fontWeight: '500' }}>Exam Name : {student_info[0]?.exam_name}</h5>
                                </div>
                            </div>

                            <table class="table table-striped mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">Session</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Marks Obtained</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        student_info.map((student) => {

                                            if (student.marks_obtained != 0)
                                                return (
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>{student.session_year}</td>
                                                        <td style={{ textAlign: 'center' }}>{student.subject_name}</td>
                                                        <td style={{ textAlign: 'center' }}>{student.marks_obtained}</td>

                                                    </tr>
                                                )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : null
                }

            </section>
        </div>
    )
}

export default TeacherMarkCheck