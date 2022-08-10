import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import profile from '../../images/profile/profile.png'
import StudentHeader from '../StudentDashboard/StudentHeader'
import SchoolHeader from './schoolHeader/SchoolHeader'

const AddStudent = () => {
    const [school_id, setSchool_id] = useState(localStorage.getItem("school_id"))
    const [student_id, setStudent_id] = useState('')
    const [fname, setFname] = useState('')
    const [middle, setmiddle] = useState('')
    const [lname, setLLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [division, setDivision] = useState('')
    const [email, setEmail] = useState('')
    const [present, setPresent] = useState('')
    const [Permanant, setPermanent] = useState('')
    const [father, setFather] = useState('')
    const [father_no, setFatherno] = useState('')
    const [mother, setMother] = useState('')
    const [mother_no, setMotherNo] = useState('')
    const [searchStudentID, setSearchStudentID] = useState('')
    const [searchClassID, setSearchClassID] = useState('')
    const [searchSectionID, setSearchSectionID] = useState('')
    const [dob, setDob] = useState('')
    const [blood, setBlood] = useState('')
    const [photo, setphoto] = useState('')
    const [id, setId] = useState('')
    const [students, setStudents] = useState([])
    const [genders, setGenders] = useState([])
    const [divisions, setDivisions] = useState([])
    const [classes, setClasses] = useState([])
    const [sections, setSections] = useState([])
    const [reset, setReset] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/student/all?school_info_id=${school_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setStudents(response.data);
        });
    }, [student_id, reset]);

    const handleSearch = () => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/student/all?school_info_id=${school_id}&&student_id=${searchStudentID}&&searchSectionID=${searchSectionID}&&searchClassID=${searchClassID}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setStudents(response.data);
        });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/gender`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setGenders(response.data);
        });
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
        axios.get(`${process.env.REACT_APP_NODE_API}/api/division`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setDivisions(response.data);
        });
    }, []);
    const studentID = e => {
        setStudent_id(e.target.value)
    }
    const Fname = e => {
        setFname(e.target.value)
    }
    const Middle = e => {
        setmiddle(e.target.value)
    }

    const Last = e => {
        setLLname(e.target.value)
    }
    const Mobile = e => {
        setMobile(e.target.value)
    }

    const Gender = e => {
        setGender(e.target.value)
    }
    const Division = e => {
        setDivision(e.target.value)
    }
    const Email = e => {
        setEmail(e.target.value)
    }
    const Present = e => {
        setPresent(e.target.value)
    }
    const Parmanent = e => {
        setPermanent(e.target.value)
    }
    const Father = e => {
        setFather(e.target.value)
    }
    const FatherNo = e => {
        setFatherno(e.target.value)
    }
    const Mother = e => {
        setMother(e.target.value)
    }
    const MotherNo = e => {
        setMotherNo(e.target.value)
    }
    const Dob = e => {
        setDob(e.target.value)
    }
    const Blood = e => {
        setBlood(e.target.value)
    }
    const Photo = e => {
        setphoto(e.target.value)
    }
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/add_student`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: "bearer " + localStorage.getItem("access_token"), },
            body: JSON.stringify({

                student_code: student_id,
                first_name: fname,
                middle_name: middle,
                last_name: lname,
                mobile_no: mobile,
                gender_id: gender,
                division_id: division,
                email: email,
                present_address: present,
                permanent_address: Permanant,
                father_name: father,
                father_phone_number: father_no,
                mother_name: mother,
                mother_phone_number: mother_no,
                dob: dob,
                blood_group: blood,
                photo_id: photo,
                school_info_id: school_id,
                id: id

            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setReset(reset + 1)
                if (id === '') {
                    toast('New Student saved successfully')
                } else {
                    toast('New Student updated successfully')
                }
            });
        setStudent_id('')
        setFname('')
        setmiddle('')
        setLLname('')
        setMobile('')
        setGender('')
        setDivision('')
        setFather('')
        setMother('')
        setMotherNo('')
        setFatherno('')
        setPermanent('')
        setPresent('')
        setDob('')
        setBlood('')
        setphoto('')
        setEmail('')
        setId('')

    }

    const editRoutine = (info) => {
        setStudent_id(info.student_code)
        setFname(info.first_name)
        setmiddle(info.middle_name)
        setLLname(info.last_name)
        setMobile(info.mobile_no)
        setGender(info.gender_id)
        setDivision(info.division)
        setEmail(info.email)
        setPresent(info.present_address)
        setPermanent(info.Permanant_address)
        setFatherno(info.father_phone_number)
        setMother(info.mother_name)
        setFather(info.father_name)
        setMotherNo(info.mother_phone_number)
        setDob(info.dob)
        setBlood(info.blood_group)
        setphoto(info.photo_id)
        setId(info.id)
    }
    const deleteRoutine = async (id) => {
        const check = window.confirm('Are you sure to delete?');
        if (check) {
            axios.defaults.headers.common['authorization'] = "bearer " + localStorage.getItem("access_token")
            const result = await axios.delete(`${process.env.REACT_APP_NODE_API}/api/student/delete?id=${id}`)
            if (result) {
                setReset(reset + 1)
                toast("Student deleted successfully");
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
                                <div className='d-flex justify-content-between px-1'>
                                    <div>
                                        <h3 style={{ color: '#008B8B', fontSize: '25px', fontWeight: 'bold' }} className="card-title py-2"> Add Student</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body' >

                                <div className='row'>
                                    <div className={"col-sm-3 p-2 mx-auto"}>
                                        <div className="form-group">
                                            <label className='pb-2' for="exampleInputEmail1">Student Id : </label>
                                            <input onChange={studentID} style={{ border: '1px solid blue', color: '' }} type="text" placeholder='<<<...Student Id...>>>' value={student_id} className="form-control" />
                                        </div>
                                    </div>
                                    <div className={"col-sm-3 p-2 mx-auto"}>
                                        <div className="form-group">
                                            <label className='pb-2' for="exampleInputEmail1">First Name : </label>
                                            <input onChange={Fname} style={{ border: '1px solid blue' }} type="text" className="form-control" value={fname} />
                                        </div>
                                    </div>
                                    <div className={"col-sm-3 mx-auto p-2"}>
                                        <div className="form-group">
                                            <label className='pb-2' for="exampleSelect">Middle Name : </label>
                                            <input onChange={Middle} style={{ border: '1px solid blue' }} type="text" className="form-control" value={middle} />
                                        </div>
                                    </div>
                                    <div className={"col-sm-3 mx-auto p-2"}>
                                        <div className="form-group">
                                            <label className='pb-2' for="exampleSelect">Last Name : </label>
                                            <input onChange={Last} style={{ border: '1px solid blue' }} type="text" className="form-control" value={lname} />

                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={"col-sm-3 mx-auto p-2"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleSelect">Gender Id : </label>
                                                <select
                                                    className="form-control"
                                                    value={gender}
                                                    onChange={Gender}
                                                >
                                                    <option value="">Select</option>
                                                    {genders.map((schoolJSON) => {
                                                        return (
                                                            <option value={schoolJSON.id}>
                                                                {schoolJSON.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>

                                            </div>
                                        </div>
                                        {/* <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Division Id : </label>
                                                <select
                                                    className="form-control"
                                                    value={division}
                                                    onChange={Division}
                                                >
                                                    <option value="">Select</option>
                                                    {divisions.map((schoolJSON) => {
                                                        return (
                                                            <option value={schoolJSON.id}>
                                                                {schoolJSON.division_name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div> */}
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Email : </label>
                                                <input onChange={Email} style={{ border: '1px solid blue' }} type="text" className="form-control" value={email} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Present Address : </label>
                                                <input onChange={Present} style={{ border: '1px solid blue' }} type="text" className="form-control" value={present} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 mx-auto p-2"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleSelect">Permanent Address : </label>
                                                <input onChange={Parmanent} style={{ border: '1px solid blue' }} type="text" className="form-control" value={Permanant} />

                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>

                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Father Name : </label>
                                                <input onChange={Father} style={{ border: '1px solid blue' }} type="text" className="form-control" value={father} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Father phone number : </label>
                                                <input onChange={FatherNo} style={{ border: '1px solid blue' }} type="text" className="form-control" value={father_no} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Mother name : </label>
                                                <input onChange={Mother} style={{ border: '1px solid blue' }} type="text" className="form-control" value={mother} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 mx-auto p-2"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleSelect">Mother Phone Number : </label>
                                                <input onChange={MotherNo} style={{ border: '1px solid blue' }} type="text" className="form-control" value={mother_no} />

                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Mobile No : </label>
                                                <input onChange={Mobile} style={{ border: '1px solid blue' }} type="text" className="form-control" value={mobile} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Date of Birth : </label>
                                                <input onChange={Dob} style={{ border: '1px solid blue' }} type="text" className="form-control" value={dob} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Blood Group : </label>
                                                <input onChange={Blood} style={{ border: '1px solid blue' }} type="text" className="form-control" value={blood} />
                                            </div>
                                        </div>
                                        <div className={"col-sm-3 p-2 mx-auto"}>
                                            <div className="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Photo Id : </label>
                                                <input onChange={Photo} style={{ border: '1px solid blue' }} type="text" className="form-control" value={photo} />
                                            </div>
                                        </div>

                                    </div>



                                    <div className={"col-sm-6 "}>
                                        <div className='pt-2 mx-auto'>
                                            <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px', backgroundColor: '#008B8B' }} type="button" className="btn  bg-gradient px-5">Add Student</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <section className='py-5'>
                    <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-3 py-2  bg-gradient'>Student List</h2>
                    <p style={{ float: 'right' }}>Student Count: {students.length}</p>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <input onChange={(e) => setSearchStudentID(e.target.value)} className='form-control' placeholder='Student ID' />
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
                        <div className='col-sm-3 '>
                            <button onClick={handleSearch} className='btn btn-success mt-1'>Search</button>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col">Student Id</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Mobile number</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.sort((a, b) => {
                                    return b.id - a.id;
                                }).map((student) => {


                                    return (
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>{student.student_code}</td>
                                            <td style={{ textAlign: 'center' }}>{student.full_name}</td>
                                            <td style={{ textAlign: 'center' }}>{student.mobile_no}</td>
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
            </div>
        </>
    )
}

export default AddStudent