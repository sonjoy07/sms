import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import profile from '../../../images/profile/profile.png'


const TeacherProfileEdit = () => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [sex, setSex] = useState('')
    const [presentAddress, setPresentAddress] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [fatherMobileNo, setFatherMobileNo] = useState('')
    const [motherMobileNo, setMotherMobileNo] = useState('')
    const [dob, setDob] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const [student, setStudent] = useState([]);

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
                let studentData= response.data[0]
                setFirstName(studentData.first_name)
                setLastName(studentData.last_name)
                setMiddleName(studentData.middle_name)
                setMobileNo(studentData.mobile_no)
                setEmail(studentData.email)
                setPresentAddress(studentData.present_address)
                setPermanentAddress(studentData.permanent_address)
                setSex(studentData.permanent_gender)
                setFatherMobileNo(studentData.father_mobile_no)
                setFatherName(studentData.father_name)
                setMotherName(studentData.mother_name)
                setMotherMobileNo(studentData.mother_mobile_no)
                setDob(studentData.dob)
                setBloodGroup(studentData.blood_group)
                setStudent(response.data);
            })
            .catch((e) => console.log(e));
    }, []);
    const nameChange = e => {
        setFirstName(e.target.value)
    }
    const emailChange = e => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = () => {
        fetch(`${process.env.REACT_APP_NODE_API}/api/student/profile_update?student_code=${student[0].student_code}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                mobileNo: mobileNo,
                email: email,
                presentAddress: presentAddress,
                permanentAddress: permanentAddress,
                sex: sex,
                fatherMobileNo: fatherMobileNo,
                fatherName: fatherName,
                motherMobileNo: motherMobileNo,
                motherName: motherName,
                dob: dob,
                bloodGroup: bloodGroup
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                toast('Profile Info is Changed successfully!!')
            });

    };

    return (
        <div class="container">
            <div class="main-body my-5">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body py-5">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={profile} alt="" class="rounded-circle p-1 bg-primary" width="150" />
                                    <div class="my-4">
                                        <h4>{student[0]?.full_name}</h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">First Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onChange={nameChange} type="text" class="form-control" value={firstName} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Middle Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onChange={(e)=>setMiddleName(e.target.value)} type="text" class="form-control" value={middleName} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Last Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onChange={(e)=>setLastName(e.target.value)} type="text" class="form-control" value={lastName} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Sex</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onChange={(e)=>setSex(e.target.value)} type="text" class="form-control" value={sex} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onChange={emailChange} type="text" class="form-control" value={email} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mobile  No</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setMobileNo(e.target.value)} class="form-control" value={mobileNo} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Present Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setPresentAddress(e.target.value)} class="form-control" value={presentAddress} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Permanent Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setPermanentAddress(e.target.value)} class="form-control" value={permanentAddress} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Father Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setFatherName(e.target.value)} class="form-control" value={fatherName} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Father Mobile No</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setFatherMobileNo(e.target.value)} class="form-control" value={fatherMobileNo} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mother Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setMotherName(e.target.value)} class="form-control" value={motherName} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mother Mobile No</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setMotherMobileNo(e.target.value)} class="form-control" value={motherMobileNo} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Date of Birth</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setDob(e.target.value)} class="form-control" value={dob} />
                                    </div>
                                </div>                                
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Blood Group</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" onChange={(e)=>setBloodGroup(e.target.value)} class="form-control" value={bloodGroup} />
                                    </div>
                                </div>                                
                                <div class="row">
                                    <div class="col-sm-3"></div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onClick={handleSubmit} type="button" class="btn btn-primary px-4" value="Save Changes" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfileEdit