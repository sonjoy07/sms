import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profile from '../../images/profile/profile.png'
import StudentHeader from '../StudentDashboard/StudentHeader'

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
    const [dob, setDob] = useState('')
    const [blood, setBlood] = useState('')
    const [photo, setphoto] = useState('')
    const [students, setStudents] = useState([])
    const [genders, setGenders] = useState([])
    const [divisions, setDivisions] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/student/all?school_info_id=${school_id}`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setStudents(response.data);
        });
    }, [student_id]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NODE_API}/api/gender`, {
            headers: {
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            setGenders(response.data);
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
                school_info_id: school_id

            }),
        })
            .then((res) => res.json())
            .then((json) => {
                alert('New Student Added Successfully!!')
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

    }

    return (
        <>
            <StudentHeader />

            <div className='container pt-4'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card card-dark collapsed-card">
                            <div className="card-header">
                                <div className='d-flex justify-content-between px-1'>
                                    <div>
                                        <h3 style={{ color: '#008B8B', fontSize: '25px', fontWeight: 'bold' }} class="card-title py-2"> Add Student</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body' >

                                <div className='row'>
                                    <div class={"col-sm-3 p-2 mx-auto"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleInputEmail1">Student Id : </label>
                                            <input onChange={studentID} style={{ border: '1px solid blue', color: '' }} type="text" placeholder='<<<...Student Id...>>>' value={student_id} class="form-control" />
                                        </div>
                                    </div>
                                    <div class={"col-sm-3 p-2 mx-auto"}>
                                        <div class="form-group">
                                            <label className='pb-2' for="exampleInputEmail1">first Name : </label>
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
                                    <div className='row'>
                                        <div class={"col-sm-3 mx-auto p-2"}>
                                            <div class="form-group">
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
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
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
                                        </div>
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Email : </label>
                                                <input onChange={Email} style={{ border: '1px solid blue' }} type="text" class="form-control" value={email} />
                                            </div>
                                        </div>
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Present Address : </label>
                                                <input onChange={Present} style={{ border: '1px solid blue' }} type="text" class="form-control" value={present} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div class={"col-sm-3 mx-auto p-2"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleSelect">permanent Address : </label>
                                                <input onChange={Parmanent} style={{ border: '1px solid blue' }} type="text" class="form-control" value={Permanant} />

                                            </div>
                                        </div>
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Father Name : </label>
                                                <input onChange={Father} style={{ border: '1px solid blue' }} type="text" class="form-control" value={father} />
                                            </div>
                                        </div>
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Father phone number : </label>
                                                <input onChange={FatherNo} style={{ border: '1px solid blue' }} type="text" class="form-control" value={father_no} />
                                            </div>
                                        </div>
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Mother name : </label>
                                                <input onChange={Mother} style={{ border: '1px solid blue' }} type="text" class="form-control" value={mother} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div class={"col-sm-3 mx-auto p-2"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleSelect">Mother Phone Number : </label>
                                                <input onChange={MotherNo} style={{ border: '1px solid blue' }} type="text" class="form-control" value={mother_no} />

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
                                        <div class={"col-sm-3 p-2 mx-auto"}>
                                            <div class="form-group">
                                                <label className='pb-2' for="exampleInputEmail1">Photo Id : </label>
                                                <input onChange={Photo} style={{ border: '1px solid blue' }} type="text" class="form-control" value={photo} />
                                            </div>
                                        </div>

                                    </div>



                                    <div class={"col-sm-6 "}>
                                        <div className='pt-2 mx-auto'>
                                            <button onClick={handleSubmit} style={{ color: 'white', fontSize: '20px', backgroundColor: '#008B8B' }} type="button" class="btn  bg-gradient px-5">Add Student</button>
                                        </div>
                                    </div>






                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <section className='py-5'>
                    <h2 style={{ color: 'white', backgroundColor: '#008B8B' }} className='px-3 py-2  bg-gradient'>Student List</h2>

                    <table class="table table-striped">
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th scope="col">Student Id</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">mobile number</th>
                                <th scope="col">Email</th>

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
                                            <td style={{ textAlign: 'center' }}>{student.first_name}</td>
                                            <td style={{ textAlign: 'center' }}>{student.mobile_no}</td>
                                            <td style={{ textAlign: 'center' }}>{student.email}</td>







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