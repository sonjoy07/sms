import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import profile from "../../../../images/profile/profile.png";
import TeacherHeader from '../../TeacherHeader/TeacherHeader';
const ExamMarksEntry = () => {
    let navigate = useNavigate();
    let student_mark = [];
    let latest_mark = [];
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [school_id, setSchool_type] = useState(localStorage.getItem("school_id"));
    const [school_type, setSchool_type_id] = useState(localStorage.getItem("school_type"));
    const [sections, setSections] = useState([]);
    const [present_mark, setPresent_marks] = useState([])
    const [showData, setShowData] = useState([])
    const [students, setStudents] = useState([])
    const [section, setSection] = useState("");
    const [exam_info, SetExam] = useState([])
    const [subjects, setSubjects] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [class_id, setClass_id] = useState("");
    const [section_id, setSection_id] = useState("");

    const [subject_id, setSubject_id] = useState("");
    const [session_id, setSession_id] = useState("");
    const [session, setSession] = useState("");
    const [clses, setClses] = useState([]);

    const [class_input, setClass_Input] = useState('')
    const [exam_id, setExam_id] = useState("");

    const [exam, setExam] = useState([])
    const [markShow, setmarkShow] = useState([])
    const [show, setShow] = useState(false)
    const [inserted, setInserted] = useState(false)
    const [teacher, setTeacher] = useState({});
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [access_token, setAccess_token] = useState(
        localStorage.getItem("access_token")
    );
    const [class_local, setLocal] = useState(localStorage.getItem("class"))

    const checkLoggedIn = (props) => {
        if (user_type != 2) {
            navigate("/login");
        }
    };

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_NODE_API}/api/teacher/profile?teacher_id=${user_code}`,
                {
                    headers: { authorization: "bearer " + access_token },
                }
            )
            .then((response) => {
                setTeacher(response.data);
                console.log(response.data);
            });
    }, [user_code, access_token]);

    let handleClassChange = (e) => {
        setClass_id(e.target.value);
        console.log(e.target.value)
    };

    let handleSessionChange = (e) => {
        setSession_id(e.target.value);
        console.log(e.target.value)
    };

    let handleSearch = () => {
        setClass_Input(class_id)
        setSection(section_id)
        setSession(session_id)
        setShow(true)
        setInserted(false)
    }

    let handleSectionChange = (e) => {
        setSection_id(e.target.value);
        console.log(e.target.value)
    };

    let handleExamType = (e) => {
        setExam_id(e.target.value)
        console.log(e.target.value)
    }

    let handleSubjectChange = (e) => {
        setSubject_id(e.target.value);
        console.log(e.target.value)
    };

    const HandleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let id = e.target.parentNode.parentNode.querySelector('#code').textContent;
        present_mark.map((i) => {
            // console.log(i.student_id)
            if (id == i.student_code) {
                if (name == 'mark') {
                    i.mark_obtained = value
                    const exists = latest_mark.find(p => p.student_id === i.student_id);

                    if (value == '') {
                        return;
                    }
                    else if (exists) {
                        for (let k = 0; k < latest_mark.length; k++) {
                            if (latest_mark[k].student_id == i.student_id) {
                                latest_mark[k].mark_obtained = value;
                            }
                        }
                    }
                    else {
                        latest_mark.push({ student_id: i.student_id, mark_obtained: value })
                    }
                }

            }
        })

        console.log(present_mark)

        setShowData(present_mark)

        //console.log(latest_mark)

    }



    useEffect(() => {
        checkLoggedIn();
        axios.get(`${process.env.REACT_APP_NODE_API}/api/session`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setSessions(response.data);
            });
    }, []);

    //get student
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/student_mark?session_id=${session_id}&class_id=${class_input}&section_id=${section}&school_info_id=${school_id}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            })
            .then((response) => {
                setStudents(response.data);
                console.log(response.data)
                response.data.map((stu) => {
                    // console.log(stu)
                    student_mark.push({ student_id: stu.student_id, student_name: stu.name, student_code: stu.student_code, mark_obtained: '0' });
                });
                setPresent_marks(student_mark);
                console.log(student_mark)
            });
    }, [section, session, class_input, subject_id])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/subjects?class_id=${class_id}`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setSubjects(response.data);
            });
    }, [class_id]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_NODE_API}/api/section/all`,
                {
                    headers: {
                        authorization: "bearer " + localStorage.getItem("access_token"),
                    },
                }, {
                headers: {
                    authorization: localStorage.getItem
                }
            })
            .then((response) => {
                setSections(response.data);
            });
    }, [class_id]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_info`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                SetExam(response.data);
            });
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/exam_name`,
            {
                headers: {
                    authorization: "bearer " + localStorage.getItem("access_token"),
                },
            }).then((response) => {
                setExam(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${school_type}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setClses(response.data);
            console.log(clses)
        });
    }, []);

    const handleMarks = () => {

        const results = present_mark.filter(obj => {
            return obj.mark_obtained != 0 || null;
        });
        fetch(`${process.env.REACT_APP_NODE_API}/api/exam_mark`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                exam_info_id: exam_id,
                subject_id: subject_id,
                mark_update: results,
            })
        })
            .then((res) => {
                console.log(res)
                res.json()
            })
            .then((json) => {
                alert(`${results.length} students Mark entry successful!!`)
            })
            .then(() => setPresent_marks([]))
            .catch((error) => {
                console.log(error);
            });

        setClass_id('')
        setExam_id('')
        setPresent_marks('')
        setSection_id('')
        setSession_id('')
        setSubject_id('')
        setShow(false);
        setInserted(true);

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
                                        <h3 style={{ color: 'LightSeaGreen', fontSize: '25px', fontWeight: 'bold' }} class="card-title pt-2">Marks Entry</h3>
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
                                    <div className={"col-sm-4 mx-auto p-2"}>
                                        <div className="form-group">
                                            <label className='pb-2' for="exampleSelect">Select Session : </label>
                                            <select
                                                className="form-control"
                                                value={session_id}
                                                onChange={handleSessionChange}
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

                                    <div class={"col-sm-4 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Exam Type : </label>
                                            <select
                                                className="form-control"
                                                value={exam_id}
                                                onChange={handleExamType}
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

                                    <div class={"col-sm-4 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Class : </label>
                                            <select
                                                className="form-control"
                                                value={class_id}
                                                onChange={handleClassChange}
                                            >
                                                <option value="">Select</option>
                                                {clses.map((classJSON) => {
                                                    return (
                                                        <option value={classJSON.id}>
                                                            {classJSON.class_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>


                                    <div class={"col-sm-4 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Section : </label>
                                            <select
                                                className="form-control"
                                                value={section_id}
                                                onChange={handleSectionChange}
                                            >
                                                <option value="">Select</option>
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

                                    <div class={"col-sm-4 mx-auto p-2"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleSelect">Subject : </label>
                                            <select
                                                className="form-control"
                                                value={subject_id}
                                                onChange={handleSubjectChange}
                                            >
                                                <option value="">Select</option>
                                                {subjects.map((subjectJSON) => {
                                                    return (
                                                        <option value={subjectJSON.id}>
                                                            {subjectJSON.subject_name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div class={"col-sm-4 p-4 mx-auto"}>
                                        <div className='pt-2 mx-auto'>
                                            <button onClick={handleSearch} style={{ color: 'white', fontSize: '20px' }} type="button" class="btn bg-secondary bg-gradient px-5">Search Student</button>
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
                            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Marks Entry Sheet</h2>

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Student Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Marks Obtained</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((info) => {

                                        // new_list.push({ student_id: info.student_id, session_id: session, class_id: classInfo, class_roll_no: newRoll });
                                        // console.log(new_list)
                                        return (
                                            <tr>
                                                <td id='code'>{info.student_code}</td>
                                                <td id='name'>{info.name}</td>

                                                <td>
                                                    <input
                                                        type="text"
                                                        name="mark"

                                                        onChange={HandleInputChange}
                                                    />
                                                </td>

                                                <td>
                                                    <a href="" className="btn btn-success mr-3">
                                                        Edit
                                                    </a>
                                                    <a href="" className="btn btn-danger">
                                                        Delete
                                                    </a>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div style={{ display: 'flex', justifyContent: 'center' }} className='pt-2'>
                                <button onClick={handleMarks} style={{ color: 'white', fontSize: '20px', }} type="button" class="btn bg-secondary bg-gradient px-5">Submit</button>
                            </div>
                        </div>
                    ) : null
                }
                {
                    inserted ? (
                        <div className='py-5'>
                            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }} className='px-3 py-2 bg-info bg-gradient'>Inserted data</h2>

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Student Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Marks Obtained</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        showData?.map((info) => {

                                            // new_list.push({ student_id: info.student_id, session_id: session, class_id: classInfo, class_roll_no: newRoll });
                                            // console.log(new_list)
                                            return (
                                                <tr>
                                                    <td>{info.student_code}</td>
                                                    <td>{info.student_name}</td>
                                                    <td>
                                                        {info.mark_obtained}
                                                    </td>

                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    ) : null

                }

            </section>
        </div>
    )
}

export default ExamMarksEntry