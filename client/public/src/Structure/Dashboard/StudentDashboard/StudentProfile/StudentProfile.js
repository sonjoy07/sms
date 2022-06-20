import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../../images/profile/profile.png'

const StudentProfile = () => {
    let navigate = useNavigate();
    const [student, setStudent] = useState([]);
    const [user_code, setUser_code] = useState(localStorage.getItem("user_code"));
    const [user_type, setUser_type] = useState(localStorage.getItem("user_type"));
    const checkLoggedIn = () => {
        if (user_type != 1) {
            navigate('/login')
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

                setStudent(response.data[0]);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div class="container">
            <div class="main-body my-5">

                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body py-5">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={profile} alt="Admin" class="rounded-circle" width="150" />
                                    <div class="my-4">
                                        <h4>{student?.full_name}</h4>
                                        {/* <p class="text-secondary mb-1">Full Stack Developer</p>
                      <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 ">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Student Code : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Kenneth Valdez
                                    </div>
                                </div>

                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Full Name : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        fip@jukmuh.al
                                    </div>
                                </div>

                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mobile No. : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        (239) 816-9029
                                    </div>
                                </div>

                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Sex : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        (320) 380-4539
                                    </div>
                                </div>

                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Present Address : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Permarent Address : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Father Name : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Father Phone No. : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mother Name : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mother Phone No. : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Date Of Birth : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <div class="row py-2">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Blood Group : </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>

                                <div className='' style={{ display: 'flex' }}>
                                    <div class="row  p-2">
                                        <div class="col-sm-12">
                                            <a class="btn btn-info" href="/studentprofileedit">Edit</a>
                                        </div>
                                    </div>
                                    <div class="row mx-1 p-2">
                                        <div class="col-sm-12">
                                            <a class="btn btn-info" href="/studentpassword">Reset Password</a>
                                        </div>
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

export default StudentProfile