import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import profile from '../../images/profile/profile.png'
import SchoolHeader from './schoolHeader/SchoolHeader';

const Addteacher = () => {
    const [school_id, setschool] = useState(localStorage.getItem("school_id"))
    const [teachers, setTeachers] = useState([])

    const [teacher_id, setteacher_id] = useState('')
    const [searchClassID, setSearchClassID] = useState('')
    const [searchSectionID, setSearchSectionID] = useState('')
    const [title, settitle] = useState('')
    const [fname, setFname] = useState('')
    const [middle, setMiddle] = useState('')
    const [lname, setLLname] = useState('')
    const [initial, setInitial] = useState('')
    const [subject_code, setsubject] = useState('')
    const [designation, setDesignation] = useState('')
    const [email, setEmail] = useState('')
    const [department, setdepartment] = useState('')
    const [mpo, setMpo] = useState('')
    const [index, setIndex] = useState('')
    const [dob, setDob] = useState('')
    const [blood, setBlood] = useState('')
    const [mobile_no, setMobile] = useState('')
    const [reset, setReset] = useState(0)
    const [id, setId] = useState('')
    const [filter, setFilter] = useState('')
    const [classes, setClasses] = useState([])
    const [sections, setSections] = useState([])

    const searchTeacher = () => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${school_id}&&teacher_id=${filter}&&searchSectionID=${searchSectionID}&&searchClassID=${searchClassID}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setTeachers(response.data);
        });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/class?school_type_id=${localStorage.getItem('school_type')}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setClasses(response.data);
        });
        axios.get(`${process.env.REACT_APP_NODE_API}/api/section/all`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setSections(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/teacher/filter?school_info_id=${school_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setTeachers(response.data);
        });
    }, [teacher_id, reset]);
    const TeacherID = e => {
        setteacher_id(e.target.value)
    }
    const Fname = e => {
        setFname(e.target.value)
    }
    const Middle = e => {
        setMiddle(e.target.value)
    }

    const Last = e => {
        setLLname(e.target.value)
    }
    const Mobile = e => {

        setMobile(e.target.value)
    }

    const Initial = e => {
        setInitial(e.target.value)
    }
    const subjectCode = e => {

        setsubject(e.target.value)
    }
    const Email = e => {
        setEmail(e.target.value)
    }
    const Designation = e => {
        setDesignation(e.target.value)
    }
    const Department = e => {
        setdepartment(e.target.value)
    }
    const Mpo = e => {

        setMpo(e.target.value)
    }
    const Index = e => {

        setIndex(e.target.value)
    }
    const Dob = e => {
        setDob(e.target.value)
    }
    const Blood = e => {
        setBlood(e.target.value)
    }
    const Title = e => {
        settitle(e.target.value)
    }
    const handleSubmit = () => {
        if (teacher_id !== '' && subject_code !== '' && mpo !== "" && index !== "" && mobile_no !== "") {
            console.log('asdfas', index);
            fetch(`${process.env.REACT_APP_NODE_API}/api/add_teacher`, {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization: "bearer " + localStorage.getItem("access_token"), },
                body: JSON.stringify({
                    teacher_code: teacher_id,
                    title: title,
                    first_name: fname,
                    middle_name: middle,
                    last_name: lname,
                    mobile: mobile_no,
                    initial: initial,
                    designation: designation,
                    department: department,
                    mpo_status: mpo,
                    index_no: index,
                    blood_group: blood,
                    email: email,
                    dob: dob,
                    subject_code: subject_code,
                    school_info_id: school_id,
                    id: id
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    setReset(reset + 1)
                    if (id === '') {
                        toast('New Teacher saved successfully')
                    } else {
                        toast('Teacher updated successfully')
                    }
                });
            setteacher_id('')
            setFname('')
            setMiddle('')
            setLLname('')
            setMobile('')
            setDob('')
            setBlood('')
            setDesignation('')
            setsubject('')
            setInitial('')
            setMpo('')
            setIndex('')
            settitle('')
            setId('')
        } else {
            toast("Please fill up the required field!!")
        }
    }
    const addTeacher = () => {
        setteacher_id('')
        setFname('')
        setMiddle('')
        setLLname('')
        setMobile('')
        setDob('')
        setBlood('')
        setDesignation('')
        setsubject('')
        setInitial('')
        setMpo('')
        setIndex('')
        settitle('')
        setId('')
    }
    const editRoutine = (info) => {
        setteacher_id(info.teacher_code)
        setFname(info.first_name)
        setMiddle(info.middle_name)
        setLLname(info.last_name)
        setMobile(info.mobile)
        setDob(info.dob)
        setBlood(info.blood_group)
        setDesignation(info.designation)
        setsubject(info.subject_code)
        setInitial(info.initial)
        setMpo(info.mpo_status)
        setIndex(info.index_no)
        setId(info.id)
        settitle(info.title)
    }
    const deleteRoutine = async (id) => {
        const check = window.confirm('Are you sure to delete?');
        if (check) {
            axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
            const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/teacher/delete?id=${id}`)
            if (result) {
                setReset(reset + 1)
                toast("Teacher deleted successfully");
            }
        }
    }

    return (
        <>
            <SchoolHeader />
            <div className='container pt-4'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card card-dark collapsed-card">
                            <div className="card-header">
                                <div className='d-flex float-left justify-content-between px-1'>
                                    <div>
                                        <h3 style={{ color: '#008B8B', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2"> Add Teacher</h3>
                                    </div>
                                <div className='float-right' onClick={addTeacher}>
                                </div>
                                    <i className='fa fa-plus mt-2'></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='card-body' >

                    <div className='row'>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Teacher Id : </label>
                                <input onChange={TeacherID} style={{ border: '1px solid blue', color: '' }} type="text" placeholder='<<<...teacher Id...>>>' value={teacher_id} class="form-control" />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">First Name : </label>
                                <input onChange={Fname} style={{ border: '1px solid blue' }} type="text" class="form-control" value={fname} />
                            </div>
                        </div>
                        <div class={"col-sm-3 mx-auto p-2"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleSelect">Middle Name : </label>
                                <input onChange={Middle} style={{ border: '1px solid blue' }} type="text" class="form-control" value={middle} />
                            </div>
                        </div>
                        <div class={"col-sm-3 mx-auto p-2"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleSelect">Last Name : </label>
                                <input onChange={Last} style={{ border: '1px solid blue' }} type="text" class="form-control" value={lname} />

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class={"col-sm-3 mx-auto p-2"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleSelect">Initial : </label>

                                <input onChange={Initial} style={{ border: '1px solid blue' }} type="text" class="form-control" value={initial} />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Subject Code : </label>
                                <input onChange={subjectCode} style={{ border: '1px solid blue' }} type="text" class="form-control" value={subject_code} placeholder='required' />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Email : </label>
                                <input onChange={Email} style={{ border: '1px solid blue' }} type="text" class="form-control" value={email} />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Designation : </label>
                                <input onChange={Designation} style={{ border: '1px solid blue' }} type="text" class="form-control" value={designation} />
                            </div>
                        </div>

                    </div>
                    <div className='row'>
                        <div class={"col-sm-3 mx-auto p-2"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleSelect">Department : </label>
                                <input onChange={Department} style={{ border: '1px solid blue' }} type="text" class="form-control" value={department} />

                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Mpo Status : </label>
                                <input onChange={Mpo} style={{ border: '1px solid blue' }} type="text" class="form-control" value={mpo} placeholder='required' />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Index No : </label>
                                <input onChange={Index} style={{ border: '1px solid blue' }} type="text" class="form-control" value={index} placeholder='required' />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Title : </label>
                                <input onChange={Title} style={{ border: '1px solid blue' }} type="text" class="form-control" value={title} />
                            </div>
                        </div>


                    </div>
                    <div className='row'>

                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Mobile : </label>
                                <input onChange={Mobile} style={{ border: '1px solid blue' }} type="text" class="form-control" value={mobile_no} placeholder='required' />
                            </div>
                        </div>

                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Date of Birth : </label>
                                <input onChange={Dob} style={{ border: '1px solid blue' }} type="text" class="form-control" value={dob} />
                            </div>
                        </div>
                        <div class={"col-sm-3 p-2 mx-auto"}>
                            <div class="form-group">
                                <label className='pb-2' for="exampleInputEmail1">Blood Group : </label>
                                <input onChange={Blood} style={{ border: '1px solid blue' }} type="text" class="form-control" value={blood} />
                            </div>
                        </div>

                        <div class={"col-sm-3 "}>
                            <div className='pt-2 mx-auto'>
                                <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px', backgroundColor: '#008B8B' }} type="button" class="btn  bg-gradient px-5">Add teacher</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <section className='py-5'>
                <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-3 py-2  bg-gradient'>Teacher List</h2>
                <p style={{ float: 'right' }}>Teacher Count: {teachers.length}</p>
                <div className='row'>
                    <div class={"col-sm-3 mx-auto"}>
                        <div class="form-group">
                            <input
                                placeholder='Teacher ID'
                                onChange={(e) => setFilter(e.target.value)}
                                type="text"
                                value={filter}
                                class="form-control" />
                        </div>
                    </div>
                        <div className='col-sm-3'>
                            <select className='form-control' value={searchClassID} onChange={(e) => setSearchClassID(e.target.value)}>
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
                        <div className='col-sm-3'>
                            <select className='form-control' value={searchSectionID} onChange={(e) => setSearchSectionID(e.target.value)}>
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

                    <div class={"col-sm-3"}>
                        <div class="form-group">
                            <button className='btn btn-success mt-2' onClick={searchTeacher}>Search</button>
                        </div>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th scope="col">Teacher Id</th>
                            <th scope="col">Teacher Name</th>
                            <th scope="col">Mobile number</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.sort((a, b) => {
                                return b.id - a.id;
                            }).map((student) => {


                                return (
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{student.teacher_code}</td>
                                        <td style={{ textAlign: 'center' }}>{student.full_name}</td>
                                        <td style={{ textAlign: 'center' }}>{student.mobile}</td>
                                        <td style={{ textAlign: 'center' }}>{student.designation}</td>
                                        <td style={{ textAlign: 'center' }}>{student.email}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button type='button' className="btn btn-success mr-3" onClick={() => editRoutine(student)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => deleteRoutine(student.id)}>
                                                Delete
                                            </button>
                                        </td>







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

export default Addteacher