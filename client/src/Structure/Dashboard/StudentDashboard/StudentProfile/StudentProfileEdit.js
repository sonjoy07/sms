import axios from 'axios'
import React, { useEffect, useState } from 'react'
import profile from '../../../images/profile/profile.png'


const StudentProfileEdit = () => {
    const [name, setNAme] = useState('')
    const [email, setEmail] = useState('')
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
                console.log(response.data)
                setStudent(response.data);
            })
            .catch((e) => console.log(e));
    }, []);
    const nameChange = e => {
        setNAme(e.target.value)
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
                mobile: name,
                email: email
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                alert('password Changed successfully!!')
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
                                        <h4>John Doe</h4>
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
                                        <h6 class="mb-0">mobile</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input onChange={nameChange} type="text" class="form-control" value={name} />
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
                                        <h6 class="mb-0">Phone</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value="(239) 816-9029" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Mobile</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value="(320) 380-4539" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value="Bay Area, San Francisco, CA" />
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

export default StudentProfileEdit